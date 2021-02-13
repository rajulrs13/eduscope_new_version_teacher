import firebase from "../../firebase/firebase";
import db from "../../firebase/db";
import { stat } from "fs";
export default {
  state: {
    classes: [],
    currentclassarray: []
  },
  getters: {
    getClasses(state) {
      return state.classes;
    },
    getcurrentclassarray(state) {
      return state.currentclassarray;
    }
  },
  mutations: {
    setClasses(state, payload) {
      var flag = false;
      state.classes.forEach(element => {
        if (
          element.acronym === payload.acronym &&
          element.reference === payload.reference
        ) {
          flag = true;
        }
      });
      if (flag == false) {
        state.classes.push(payload);
      }
    },
    updateClasses(state, payload) {
      var temp = state.classes;
      var newarr = temp.filter(hello => hello.reference != payload.reference);
      state.classes = newarr;
      state.currentclassarray = [];
    },
    setTeacherClasses(state, payload) {
      state.classes.push(payload);
    },
    updateClassSingleDelete(state, payload) {
      var temp = state.classes;
      var newarr = temp.filter(hello => hello.reference != payload.reference);
      state.classes = newarr;
      var temp = state.currentclassarray;
      var newarr = temp.filter(hello => hello.reference != payload.reference);
      state.currentclassarray = newarr;
    },
    pushQuizInClassArray(state, payload) {
      if (payload !== null && payload !== undefined) {
        state.classes[payload.index].quizzes.push({
          reference: payload.reference
        });
      }
    },
    currentclassarray(state, payload) {
      state.currentclassarray = payload;
    },
    clearClasses(state) {
      state.classes = [];
      state.currentclassarray = [];
    },
    deleteSingleQuizFromClassArray(state, payload) {
      for (var i = 0; i < state.classes.length; i++) {
        if (state.classes[i].reference === payload.classref) {
          var temp = state.classes[i].quizzes;
          var newarr = temp.filter(
            hello => hello.reference != payload.reference
          );
          state.classes[i].quizzes = newarr;
        }
      }
    },
    setClassArrayWhenStudentIsAdded(state, payload) {
      var arr = state.classes;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].reference == payload.classref) {
          state.classes[i].students.push(payload.studentdetails);
        }
      }
    },
    setClassArrayWhenEdited(state, payload) {
      var arr = state.classes;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].reference == payload.classref) {
          state.classes[i].students = payload.students;
        }
      }
    }
  },
  actions: {
    addNewClass({ commit, getters, dispatch }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      db.collection("classes")
        .add({
          name: payload.name,
          acronym: payload.acronym
        })
        .then(data => {
          db.collection("courses")
            .doc(payload.courseref)
            .set(
              {
                classes: firebase.firestore.FieldValue.arrayUnion({
                  reference: data.id,
                  name: payload.name,
                  acronym: payload.acronym
                })
              },
              { merge: true }
            )
            .then(function() {
              commit("setClasses", {
                reference: data.id,
                name: payload.name,
                acronym: payload.acronym,
                students: [],
                quizzes: []
              });

              db.collection("teachers")
                .doc(getters.getUserId)
                .set(
                  {
                    classes: firebase.firestore.FieldValue.arrayUnion({
                      reference: data.id,
                      name: payload.name,
                      acronym: payload.acronym
                    })
                  },
                  { merge: true }
                )
                .then()
                .catch(error => {
                  commit("setLoading", false);
                  commit("setError", error);
                });

              var arr = getters.getTeacherCourses;
              function search(namekey, myarray) {
                for (var i = 0; i < myarray.length; i++) {
                  if (myarray[i].reference === namekey) {
                    return i;
                  }
                }
              }
              var next = search(payload.courseref, arr);

              commit("pushClassInCourseArray", {
                index: next,
                classobj: {
                  reference: data.id,
                  name: payload.name,
                  acronym: payload.acronym,
                  students: []
                }
              });
              dispatch("setcurrentclassarray", payload.courseref);
              commit("setLoading", false);
              commit("setSuccess", {
                message: "Class Added Successfully",
                status: true
              });
            })
            .catch(error => {
              commit("setLoading", false);
              commit("setError", error);
            });
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    deleteSingleClass({ commit, getters }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      var courseref = db.collection("courses").doc(payload.courseref);
      var teacherref = db.collection("teachers").doc(getters.getUserId);
      var classref = db.collection("classes").doc(payload.classobj.reference);
      db.runTransaction(function(transaction) {
        return transaction.get(classref).then(function(cr) {
          transaction.delete(classref);
          transaction.update(teacherref, {
            classes: firebase.firestore.FieldValue.arrayRemove({
              name: payload.classobj.name,
              reference: payload.classobj.reference,
              acronym: payload.classobj.acronym
            })
          });
          transaction.update(courseref, {
            classes: firebase.firestore.FieldValue.arrayRemove({
              name: payload.classobj.name,
              reference: payload.classobj.reference,
              acronym: payload.classobj.acronym
            })
          });
          return;
        });
      })
        .then(function() {
          var x = getters.getTeacherCourses;
          //var z=getters.getclasses

          function mysearch(x, load) {
            for (var i = 0; i < x.length; i++) {
              if (x[i].reference === load) {
                return i;
              }
            }
          }

          var y = mysearch(x, payload.courseref);
          var coursewhichhasclasstobedeleted = x[y].classes;
          coursewhichhasclasstobedeleted.forEach(element => {
            if (element.reference == payload.classobj.reference) {
              commit("updateClassSingleDelete", element);
            }
          });
          commit("deleteSingleClassFromCourseArray", payload);
          commit("setLoading", false);
          commit("setSuccess", {
            message: "Class Deleted Successfully",
            status: true
          });
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    fetchTeacherClasses({ commit, getters }) {
      var x = getters.getClasses;
      if (typeof x === "undefined" || x.length <= 0 || x === null || x === "") {
        commit("setLoading", true);
        commit("clearError");
        commit("clearSuccess");
        db.collection("teachers")
          .doc(getters.getUserId)
          .get()
          .then(data => {
            if (
              data.data().classes !== undefined &&
              data.data().classes !== null
            ) {
              data.data().classes.forEach(element => {
                db.collection("classes")
                  .doc(element.reference)
                  .get()
                  .then(classdata => {
                    var k = [];
                    if (
                      classdata.data().students !== undefined &&
                      classdata.data().students !== null
                    ) {
                      k = classdata.data().students;
                    }
                    var f = [];
                    if (
                      classdata.data().quizzes !== undefined &&
                      classdata.data().quizzes !== null
                    ) {
                      f = classdata.data().quizzes;
                    }
                    var newelement = {
                      name: classdata.data().name,
                      acronym: classdata.data().acronym,
                      students: k,
                      reference: element.reference,
                      quizzes: f
                    };
                    commit("setClasses", newelement);
                  })
                  .catch(error => {
                    commit("setLoading", false);
                    commit("setError", error);
                  });
              });
            }
            commit("setLoading", false);
          })
          .catch(error => {
            commit("setLoading", false);
            commit("setError", error);
          });
      } else {
        // console.log("Classes already there");
      }
    },
    setcurrentclassarray({ commit, getters }, payload) {
      var classpop = getters.getClasses;
      var coursespop = getters.getTeacherCourses;
      var t = [];
      var newarr = coursespop.filter(hello => hello.reference == payload);
      if (newarr.length <= 0 || newarr === null || newarr === undefined) {
        setTimeout(() => {
          commit("setError", {
            message:
              "Please do not refresh the app. It might corrupt your data."
          });
        }, 2000);
        setTimeout(() => {
          commit("setError", {
            message:
              "Please use the side panel and click on the Classes button ."
          });
        }, 6000);
      } else {
        function search(namekey, myarray) {
          for (var i = 0; i < myarray.length; i++) {
            if (myarray[i].reference === namekey) {
              t.push(myarray[i]);
            }
          }
        }
        var v = newarr[0].classes;
        v.forEach(element => {
          search(element.reference, classpop);
        });
        commit("currentclassarray", t);
      }
    },
    deleteclasswhencoursedeleted({ commit, getters }, payload) {
      payload.classes.forEach(el => {
        getters.getClasses.forEach(element => {
          if (element.reference == el.reference) {
            commit("updateClasses", element);
          }
        });
      });
    },
    addsinglestudent({ commit, getters, dispatch }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      db.collection("classes")
        .doc(payload.classref)
        .set(
          {
            students: firebase.firestore.FieldValue.arrayUnion(
              payload.studentdetails
            )
          },
          { merge: true }
        )
        .then(function() {
          commit("setClassArrayWhenStudentIsAdded", payload);
          var c = getters.getClasses;
          var q = null;
          c.forEach(element => {
            if (element.reference == payload.classref) {
              q = element.quizzes;
            }
          });
          if (q != null && q != undefined && q.length > 0) {
            q.forEach(element => {
              db.collection("quizzes")
                .doc(element.reference)
                .set(
                  {
                    students: firebase.firestore.FieldValue.arrayUnion(
                      payload.studentdetails
                    )
                  },
                  { merge: true }
                )
                .then()
                .catch(error => {
                  commit("setLoading", false);
                  commit("setError", error);
                });
            });
          }
          dispatch("fetchTeacherClasses");
          dispatch("fetchTeacherQuizzesSpecial");
          commit("setSuccess", {
            message: "New Student Added Successfully",
            status: true
          });
          commit("setLoading", false);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    editsinglestudent({ commit, getters, dispatch }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      var temp = getters.getClasses;
      var arr = temp.filter(hello => hello.reference == payload.classref);
      var x = arr[0].students;
      for (var j = 0; j < x.length; j++) {
        if (x[j].regno == payload.studentdetails.regno) {
          x[j].name = payload.studentdetails.name;
        }
      }

      db.collection("classes")
        .doc(payload.classref)
        .set(
          {
            students: x
          },
          { merge: true }
        )
        .then(function() {
          var c = getters.getClasses;
          var q = null;
          c.forEach(element => {
            if (element.reference == payload.classref) {
              q = element.quizzes;
            }
          });
          if (q != null && q != undefined && q.length > 0) {
            q.forEach(element => {
              db.collection("quizzes")
                .doc(element.reference)
                .set(
                  {
                    students: x
                  },
                  { merge: true }
                )
                .then()
                .catch(error => {
                  commit("setLoading", false);
                  commit("setError", error);
                });
            });
          }
          dispatch("fetchTeacherClasses");
          dispatch("fetchTeacherQuizzesSpecial");
          commit("setSuccess", {
            message: "Student's detail updated successfully",
            status: true
          });
          commit("setLoading", false);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    deletesinglestudent({ commit, getters, dispatch }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      var temp = getters.getClasses;
      var arr = temp.filter(hello => hello.reference == payload.classref);
      var newarr = [];
      var x = arr[0].students;
      for (var j = 0; j < x.length; j++) {
        if (x[j].regno != payload.studentdetails.regno) {
          newarr.push(x[j]);
        }
      }
      db.collection("classes")
        .doc(payload.classref)
        .set(
          {
            students: firebase.firestore.FieldValue.arrayRemove({
              name: payload.studentdetails.name,
              regno: payload.studentdetails.regno
            })
          },
          { merge: true }
        )
        .then(function() {
          commit("setClassArrayWhenEdited", {
            classref: payload.classref,
            students: newarr
          });
          var c = getters.getClasses;
          var q = null;
          c.forEach(element => {
            if (element.reference == payload.classref) {
              q = element.quizzes;
            }
          });
          if (q != null && q != undefined && q.length > 0) {
            q.forEach(element => {
              db.collection("quizzes")
                .doc(element.reference)
                .set(
                  {
                    students: firebase.firestore.FieldValue.arrayRemove({
                      name: payload.studentdetails.name,
                      regno: payload.studentdetails.regno
                    })
                  },
                  { merge: true }
                )
                .then()
                .catch(error => {
                  commit("setLoading", false);
                  commit("setError", error);
                });
            });
          }
          dispatch("fetchTeacherClasses");
          dispatch("fetchTeacherQuizzesSpecial");
          commit("setSuccess", {
            message: "Student record deleted successfully",
            status: true
          });
          commit("setLoading", false);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    setcurrentclassarrayRefresh({ commit, getters }, payload) {
      var classpop = getters.getClasses;
      var t = [];
      var newarr = classpop.filter(hello => hello.reference == payload);
      if (newarr.length <= 0 || newarr === null || newarr === undefined) {
        setTimeout(() => {
          commit("setError", {
            message:
              "Please do not refresh the app. It might corrupt your data."
          });
        }, 2000);
        setTimeout(() => {
          commit("setError", {
            message:
              "Please use the side panel and click on the Classes button."
          });
        }, 6000);
      } else {
      }
    },
    sameregnoerror({ commit }) {
      commit("setError", {
        message: "Student with same registration number already there."
      });
    }
  }
};
