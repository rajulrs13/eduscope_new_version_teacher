import firebase from "../../firebase/firebase";
import db from "../../firebase/db";
export default {
  state: {
    quizzes: [],
    currentquizarray: []
  },
  getters: {
    getQuizzes(state) {
      return state.quizzes;
    },
    getcurrentquizarray(state) {
      return state.currentquizarray;
    }
  },
  mutations: {
    //appends quizzes in the global quiz array if not there
    setQuizzes(state, payload) {
      var flag = false;
      state.quizzes.forEach(element => {
        if (element.reference === payload.reference) {
          flag = true;
        }
      })
      if (flag == false) {
        state.quizzes.push(payload);
      }
    },
    setStatusofGlobalQuizArray(state, payload) {
      var arr = state.quizzes;
      var flag = true;
      for (var i = 0; i < arr.length && flag != false; i++) {
        if (arr[i].reference == payload) {
          state.quizzes[i].status = !state.quizzes[i].status;
          flag = false;
        }
      }
    },
    //when students in class ae added or edited or deleted
    setQuizzesSpecialMutation(state, payload) {
      state.quizzes = payload
    },
    // deletes single topic from global topics array
    updateQuizzes(state, payload) {
      var temp = state.quizzes;
      var newarr = temp.filter(hello => hello.reference != payload.reference);
      state.quizzes = newarr;
      state.currentquizarray = [];
    },
    setTeacherTopics(state, payload) {
      state.topics.push(payload);
    },
    updateQuizSingleDelete(state, payload) {
      var temp = state.quizzes;
      var newarr = temp.filter(hello => hello.reference != payload.reference);
      state.quizzes = newarr;
      var temp = state.currentquizarray;
      var newarr = temp.filter(hello => hello.reference != payload.reference);
      state.currentquizarray = newarr;
    },
    currentquizarray(state, payload) {
      state.currentquizarray = payload;
    },
    clearQuizzes(state) {
      state.quizzes = [];
      state.currentquizarray = [];
    }
  },
  actions: {
    //naya quiz add krta h
    addNewQuiz({ commit, getters, dispatch }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      db.collection("quizzes")
        .add({
          name: payload.name,
          password: payload.password,
          duration: payload.duration,
          link: payload.link,
          totalmarks: payload.totalmarks,
          passpercent: payload.passpercent,
          students: payload.students,
          topics: payload.topics,
          status: payload.status,
          classref: payload.classref,
          courseref: payload.courseRef,
          showanswers:payload.showanswers
        })
        .then(data => {
          db.collection("quizzes")
            .doc(data.id)
            .set({ reference: data.id }, { merge: true })
            .then(function () {
              db.collection("courses")
                .doc(payload.courseRef)
                .set(
                  {
                    quizzes: firebase.firestore.FieldValue.arrayUnion({
                      reference: data.id
                    })
                  },
                  { merge: true }
                )
                .then(function () {
                  commit("setQuizzes", {
                    name: payload.name,
                    password: payload.password,
                    duration: payload.duration,
                    link: payload.link,
                    totalmarks: payload.totalmarks,
                    passpercent: payload.passpercent,
                    students: payload.students,
                    topics: payload.topics,
                    reference: data.id,
                    status: payload.status,
                    classref: payload.classref,
                    courseref: payload.courseRef
                  });
                  db.collection("teachers")
                    .doc(getters.getUserId)
                    .set(
                      {
                        quizzes: firebase.firestore.FieldValue.arrayUnion({
                          reference: data.id
                        })
                      },
                      { merge: true }
                    )
                    .then()
                    .catch(error => {
                      commit("setLoading", false);
                      commit("setError", error);
                    });

                  payload.topics.forEach(element => {
                    db.collection("topics")
                      .doc(element.reference)
                      .set(
                        {
                          quizzes: firebase.firestore.FieldValue.arrayUnion({
                            reference: data.id
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

                  db.collection("classes")
                    .doc(payload.classref)
                    .set(
                      {
                        quizzes: firebase.firestore.FieldValue.arrayUnion({
                          reference: data.id
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
                  var arr1 = getters.getClasses;
                  var arr3 = getters.getTopics;
                  function search(namekey, myarray) {
                    for (var i = 0; i < myarray.length; i++) {
                      if (myarray[i].reference === namekey) {
                        return i;
                      }
                    }
                  }
                  var next = search(payload.courseRef, arr);
                  commit("pushQuizInCourseArray", {
                    index: next,
                    reference: data.id
                  });
                  var next1 = search(payload.classref, arr1);
                  commit("pushQuizInClassArray", {
                    index: next1,
                    reference: data.id
                  });
                  for (var i = 0; i < arr3.length; i++) {
                    payload.topics.forEach(element => {
                      if (element.reference == arr3[i].reference) {
                        commit("pushQuizInTopicsArray", {
                          index: i,
                          reference: data.id
                        });
                      }
                    });
                  }
                  dispatch("setcurrentquizarray", payload.courseRef);
                  commit("setLoading", false);
                  commit("setSuccess", {
                    message: "Quiz created Successfully",
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
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    fetchTeacherQuizzes({ commit, getters }) {
      var x = getters.getQuizzes;
      if (typeof x === "undefined" || x.length <= 0 || x === null || x === "") {
        commit("setLoading", true);
        commit("clearError");
        commit("clearSuccess");
        db.collection("teachers")
          .doc(getters.getUserId)
          .get()
          .then(data => {
            if (
              data.data().quizzes !== undefined &&
              data.data().quizzes !== null
            ) {
              data.data().quizzes.forEach(element => {
                db.collection("quizzes")
                  .doc(element.reference)
                  .get()
                  .then(quizdata => {
                    var result
                    var abcd
                    if(quizdata.data().results=== undefined || quizdata.data().results=== null ){
                        result=[]
                    }else{
                      result=quizdata.data().results
                    }
                    if(quizdata.data().showanswers == undefined || quizdata.data().showanswers == null ){
                      abcd='No'
                    }else{
                      abcd=quizdata.data().showanswers
                    }
                    var newelement = {
                      name: quizdata.data().name,
                      password: quizdata.data().password,
                      duration: quizdata.data().duration,
                      link: quizdata.data().link,
                      totalmarks: quizdata.data().totalmarks,
                      passpercent: quizdata.data().passpercent,
                      students: quizdata.data().students,
                      topics: quizdata.data().topics,
                      reference: quizdata.data().reference,
                      status: quizdata.data().status,
                      classref: quizdata.data().classref,
                      courseref: quizdata.data().courseref,
                      results:result,
                      showanswers:abcd
                    };
                    commit("setQuizzes", newelement)
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
        // console.log("Quiz already there");
      }
    },
    setcurrentquizarray({ commit, getters }, payload) {
      var quizzespop = getters.getQuizzes;
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
              "Please use the side panel and click on the Quizzes button."
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
        var v = newarr[0].quizzes;
        v.forEach(element => {
          search(element.reference, quizzespop);
        });
        commit("currentquizarray", t);
      }
    },
    changeQuizStatus({ commit, dispatch }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      db.collection("quizzes")
        .doc(payload.reference)
        .set(
          {
            status: !payload.status
          },
          { merge: true }
        )
        .then(function () {
          commit("setStatusofGlobalQuizArray", payload.reference);
          commit("setLoading", false);
          if (payload.status == true)
            commit("setSuccess", {
              message: "This quiz has now started accepting responses.",
              status: true
            });
          else
            commit("setSuccess", {
              message: "This quiz will no longer accept responses.",
              status: true
            });
          dispatch("setcurrentquizarray", payload.courseref);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    // deletetopicwhencoursedeleted({ commit, getters }, payload) {
    //     payload.topics.forEach(el => {
    //         getters.getTopics.forEach(element => {
    //             if (element.reference == el.reference) {
    //                 commit('updateTopics', element)
    //             }
    //         });
    //     });
    // },
    // deleteAllTopics({ commit, getters }, payload) {
    //     commit('setLoading', true)
    //     commit('clearError')
    //     commit('clearSuccess')
    //     var courseref = db.collection('courses').doc(payload)
    //     var teacherref = db.collection('teachers').doc(getters.getUserId)

    //     db.runTransaction(function (transaction) {
    //         return transaction.get(courseref).then(function (cr) {
    //             cr.data().topics.forEach(element => {
    //                 var topicref = db.collection('topics').doc(element.reference)
    //                 transaction.delete(topicref)
    //                 transaction.update(teacherref, {
    //                     topics: firebase.firestore.FieldValue.arrayRemove({ name: element.name, reference: element.reference })
    //                 })
    //             })
    //             transaction.update(courseref, {
    //                 topics: firebase.firestore.FieldValue.delete()
    //             })
    //             return
    //         })
    //     }).then(function () {

    //         var x = getters.getTeacherCourses
    //         //var z=getters.getTopics

    //         function mysearch(x, load) {
    //             for (var i = 0; i < x.length; i++) {
    //                 if (x[i].reference === load) {
    //                     return i
    //                 }
    //             }
    //         }

    //         var y = mysearch(x, payload)
    //         var topicstobedeleted = x[y].topics
    //         topicstobedeleted.forEach(element => {
    //             commit('updateTopics', element)
    //         })
    //         commit('deleteTopicFromCourseArray', payload)
    //         commit('setLoading', false)
    //         commit('setSuccess', { message: 'Topics are Deleted Successfully', status: true })
    //     }
    //     ).catch(error => {
    //         commit('setLoading', false)
    //         commit('setError', error)
    //     })
    // },
    deleteQuiz({ commit, getters }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      var courseref = db.collection("courses").doc(payload.courseref);
      var classref = db.collection("classes").doc(payload.classref);
      var teacherref = db.collection("teachers").doc(getters.getUserId);
      var topiclist = [];
      payload.topics.forEach(element => {
        topiclist.push(element.reference);
      });
      var quizref = db.collection("quizzes").doc(payload.reference);
      db.runTransaction(function (transaction) {
        return transaction.get(quizref).then(function (cr) {
          transaction.update(teacherref, {
            quizzes: firebase.firestore.FieldValue.arrayRemove({
              reference: payload.reference
            })
          });
          transaction.update(courseref, {
            quizzes: firebase.firestore.FieldValue.arrayRemove({
              reference: payload.reference
            })
          });
          transaction.update(classref, {
            quizzes: firebase.firestore.FieldValue.arrayRemove({
              reference: payload.reference
            })
          });
          topiclist.forEach(element => {
            var topicref = db.collection("topics").doc(element);
            transaction.update(topicref, {
              quizzes: firebase.firestore.FieldValue.arrayRemove({
                reference: payload.reference
              })
            });
          });
          transaction.delete(quizref);
          return;
        });
      })
        .then(function () {
          var x = getters.getTeacherCourses;
          var z = getters.getTeacherClasses;
          //var z=getters.getTopics

          function mysearch(x, load) {
            for (var i = 0; i < x.length; i++) {
              if (x[i].reference === load) {
                return i;
              }
            }
          }

          var y = mysearch(x, payload.courseref);
          var coursewhichhasquiztobedeleted = x[y].quizzes;
          coursewhichhasquiztobedeleted.forEach(element => {
            if (element.reference == payload.reference) {
              commit("updateQuizSingleDelete", element);
            }
          });
          commit("deleteSingleQuizFromCourseArray", payload);
          commit("deleteSingleQuizFromClassArray", payload);
          topiclist.forEach(element => {
            commit("deleteSingleQuizFromTopicArray", {
              topicref: element,
              quizref: payload.reference
            });
          });

          commit("setLoading", false);
          commit("setSuccess", {
            message: "Quiz Deleted Successfully",
            status: true
          });
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    deletequizwhencoursedeleted({ commit, getters }, payload) {
      payload.quizzes.forEach(el => {
        getters.getQuizzes.forEach(element => {
          if (element.reference == el.reference) {
            commit("updateQuizzes", element);
          }
        });
      });
    },
    fetchTeacherQuizzesSpecial({ commit,getters }) {
      var array=[]
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      db.collection("teachers")
        .doc(getters.getUserId)
        .get()
        .then(data => {
          if (
            data.data().quizzes !== undefined &&
            data.data().quizzes !== null &&
            data.data().quizzes.length !=0
          ) {
            data.data().quizzes.forEach(element => {
              db.collection("quizzes")
                .doc(element.reference)
                .get()
                .then(quizdata => {
                  var result
                  var abcd
                    if(quizdata.data().results=== undefined || quizdata.data().results=== null ){
                        result=[]
                    }else{
                      result=quizdata.data().results
                    }
                    if(quizdata.data().showanswers == undefined || quizdata.data().showanswers == null ){
                      abcd='No'
                    }else{
                      abcd=quizdata.data().showanswers
                    }
                  var newelement = {
                    name: quizdata.data().name,
                    password: quizdata.data().password,
                    duration: quizdata.data().duration,
                    link: quizdata.data().link,
                    totalmarks: quizdata.data().totalmarks,
                    passpercent: quizdata.data().passpercent,
                    students: quizdata.data().students,
                    topics: quizdata.data().topics,
                    reference: quizdata.data().reference,
                    status: quizdata.data().status,
                    classref: quizdata.data().classref,
                    courseref: quizdata.data().courseref,
                    results:result,
                    showanswers:abcd
                  };
                  array.push(newelement)
                })
                .catch(error => {
                  commit("setLoading", false);
                  commit("setError", error);
                });
            });
          }          
          commit('setQuizzesSpecialMutation',array)
          commit("setLoading", false);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    resultArrayRefresh({ commit, getters }, payload) {
      var classpop = getters.getQuizzes;
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
              "Please use the side panel and click on the Quizzes button."
          });
        }, 6000);
      } else {
      }
    },
  }
};
