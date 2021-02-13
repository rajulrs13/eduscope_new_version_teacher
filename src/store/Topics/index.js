import firebase from "../../firebase/firebase";
import db from "../../firebase/db";
import { type } from "os";
export default {
  state: {
    topics: [],
    currenttopicarray: []
  },
  getters: {
    getTopics(state) {
      return state.topics;
    },
    getcurrenttopicarray(state) {
      return state.currenttopicarray;
    }
  },
  mutations: {
    //appends topic in the global topic array if not there
    setTopicArrayWhenQuestionIsAdded(state, payload) {
      var t = state.topics;
      for (var index = 0; index < t.length; index++) {
        if (t[index].reference == payload.topicref) {
          state.topics[index].questions.push(payload.quesobj);
        }
      }
    },
    setTopicArrayWhenQuestionIsDeleted(state, payload) {
      var q = state.topics;
      for (var index = 0; index < q.length; index++) {
        if (q[index].reference == payload.topicref)
          state.topics[index].questions = payload.questions;
      }
    },
    setTopics(state, payload) {
      var flag = false;
      state.topics.forEach(element => {
        if (
          element.name === payload.name &&
          element.reference === payload.reference
        ) {
          flag = true;
        }
      });
      if (flag == false) {
        state.topics.push(payload);
      }
    },
    //deletes single topic from gloclassesbal topics array
    updateTopics(state, payload) {
      var temp = state.topics;
      var newarr = temp.filter(hello => hello.reference != payload.reference);
      state.topics = newarr;
      state.currenttopicarray = [];
    },
    setTeacherTopics(state, payload) {
      state.topics.push(payload);
    },
    updateTopicsSingleDelete(state, payload) {
      var temp = state.topics;
      var newarr = temp.filter(hello => hello.reference != payload.reference);
      state.topics = newarr;
      var temp = state.currenttopicarray;
      var newarr = temp.filter(hello => hello.reference != payload.reference);
      state.currenttopicarray = newarr;
    },
    currenttopicarray(state, payload) {
      state.currenttopicarray = payload;
    },
    clearTopics(state) {
      state.topics = [];
      state.currenttopicarray = [];
    },
    pushQuizInTopicsArray(state, payload) {
      if (payload !== null && payload !== undefined) {
        state.topics[payload.index].quizzes.push({
          reference: payload.reference
        });
      }
    },
    deleteSingleQuizFromTopicArray(state, payload) {
      for (var i = 0; i < state.topics.length; i++) {
        if (state.topics[i].reference === payload.topicref) {
          var temp = state.topics[i].quizzes;
          var newarr = temp.filter(hello => hello.reference != payload.quizref);
          state.topics[i].quizzes = newarr;
        }
      }
    }
  },
  actions: {
    addquestion({ commit, dispatch }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      db.collection("topics")
        .doc(payload.topicref)
        .set(
          {
            questions: firebase.firestore.FieldValue.arrayUnion(payload.quesobj)
          },
          { merge: true }
        )
        .then(function() {
          commit("setTopicArrayWhenQuestionIsAdded", payload);
          dispatch("fetchTeacherTopics");
          commit("setLoading", false);
          commit("setSuccess", {
            message: "Question added in this successfully",
            status: true
          });
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    addeditedques({ commit, getters }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");

      var temp = getters.getTopics;
      var arr = temp.filter(hello => hello.reference == payload.topicref);
      var x = arr[0].questions;
      for (var j = 0; j < x.length; j++) {
        if (x[j].quesid == payload.editedquesobj.quesid) {
          x[j] = payload.editedquesobj;
        }
      }

      db.collection("topics")
        .doc(payload.topicref)
        .set(
          {
            questions: x
          },
          { merge: true }
        )
        .then(function() {
          var m = payload.topicref;
          db.collection("topics")
            .doc(m)
            .get()
            .then(data => {
              var payload = {
                questions: data.data().questions,
                topicref: m
              };
              commit("setTopicArrayWhenQuestionIsDeleted", payload);
              //commit('setLoading', false)
            })
            .catch(error => {
              commit("setLoading", false);
              commit("setError", error);
            });
          commit("setLoading", false);
          commit("setSuccess", {
            message: "Question edited successfully",
            status: true
          });
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    deletequestion({ commit, dispatch }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      db.collection("topics")
        .doc(payload.topicobj.reference)
        .update({
          questions: firebase.firestore.FieldValue.arrayRemove({
            answer: payload.quesobj.answer,
            hashanswer: payload.quesobj.hashanswer,
            magicnum: payload.quesobj.magicnum,
            opt1: payload.quesobj.opt1,
            opt2: payload.quesobj.opt2,
            opt3: payload.quesobj.opt3,
            opt4: payload.quesobj.opt4,
            qname: payload.quesobj.qname,
            quesid: payload.quesobj.quesid,
            type: payload.quesobj.type,
            imgurls: payload.quesobj.imgurls
          })
        })
        .then(function() {
          var m = payload.topicobj.reference;
          db.collection("topics")
            .doc(m)
            .get()
            .then(data => {
              var payload = {
                questions: data.data().questions,
                topicref: m
              };
              commit("setTopicArrayWhenQuestionIsDeleted", payload);
              commit("setLoading", false);
            })
            .catch(error => {
              commit("setLoading", false);
              commit("setError", error);
            });
          //dispatch('fetchTeacherTopics')
          commit("setLoading", false);
          commit("setSuccess", {
            message: "Question deleted from question bank successfully",
            status: true
          });
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    //naya topic add krta h
    addNewTopic({ commit, getters, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            commit("setLoading", true);
            commit("clearError");
            commit("clearSuccess");
            db.collection("topics")
            .add({
                name: payload.topicname
                //questions: []
            })
            .then(data => {
                db.collection("courses")
                .doc(payload.courseRef)
                .set(
                    {
                    topics: firebase.firestore.FieldValue.arrayUnion({
                        reference: data.id,
                        name: payload.topicname
                    })
                    },
                    { merge: true }
                )
                .then(function() {
                    commit("setTopics", {
                    name: payload.topicname,
                    questions: [],
                    reference: data.id,
                    quizzes: []
                    });
                    resolve(data.id)
                    db.collection("teachers")
                    .doc(getters.getUserId)
                    .set(
                        {
                        topics: firebase.firestore.FieldValue.arrayUnion({
                            reference: data.id,
                            name: payload.topicname
                        })
                        },
                        { merge: true }
                    )
                    .then
                    // commit('setTeacherTopics', { reference: data.id, name: payload.topicname })
                    ()
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
                    var next = search(payload.courseRef, arr);
                    commit("pushTopicInCourseArray", {
                    index: next,
                    topicobj: { name: payload.topicname, reference: data.id }
                    });
                    dispatch("setcurrenttopicarray", payload.courseRef);
                    commit("setLoading", false);
                    commit("setSuccess", {
                    message: "Topic Added Successfully",
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
    },
    fetchTeacherTopics({ commit, getters }) {
      var x = getters.getTopics;
      if (typeof x === "undefined" || x.length <= 0 || x === null || x === "") {
        commit("setLoading", true);
        commit("clearError");
        commit("clearSuccess");
        db.collection("teachers")
          .doc(getters.getUserId)
          .get()
          .then(data => {
            if (
              data.data().topics !== undefined &&
              data.data().topics !== null
            ) {
              data.data().topics.forEach(element => {
                db.collection("topics")
                  .doc(element.reference)
                  .get()
                  .then(topicdata => {
                    var k = [];
                    if (
                      topicdata.data().questions !== undefined &&
                      topicdata.data().questions !== null
                    ) {
                      k = topicdata.data().questions;
                    }
                    var g = [];
                    if (
                      topicdata.data().quizzes !== undefined &&
                      topicdata.data().quizzes !== null
                    ) {
                      g = topicdata.data().quizzes;
                    }
                    var newelement = {
                      name: topicdata.data().name,
                      questions: k,
                      reference: element.reference,
                      quizzes: g
                    };
                    commit("setTopics", newelement);
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
        // console.log("Topics already there");
      }
    },
    setcurrenttopicarray({ commit, getters }, payload) {
      var topicspop = getters.getTopics;
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
              "Please use the side panel and click on the Question Bank button ."
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
        var v = newarr[0].topics;
        v.forEach(element => {
          search(element.reference, topicspop);
        });
        commit("currenttopicarray", t);
      }
    },
    deletetopicwhencoursedeleted({ commit, getters }, payload) {
      payload.topics.forEach(el => {
        getters.getTopics.forEach(element => {
          if (element.reference == el.reference) {
            commit("updateTopics", element);
          }
        });
      });
    },
    deleteAllTopics({ commit, getters }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      var courseref = db.collection("courses").doc(payload);
      var teacherref = db.collection("teachers").doc(getters.getUserId);

      db.runTransaction(function(transaction) {
        return transaction.get(courseref).then(function(cr) {
          cr.data().topics.forEach(element => {
            var topicref = db.collection("topics").doc(element.reference);
            transaction.delete(topicref);
            transaction.update(teacherref, {
              topics: firebase.firestore.FieldValue.arrayRemove({
                name: element.name,
                reference: element.reference
              })
            });
          });
          transaction.update(courseref, {
            topics: firebase.firestore.FieldValue.delete()
          });
          return;
        });
      })
        .then(function() {
          var x = getters.getTeacherCourses;
          function mysearch(x, load) {
            for (var i = 0; i < x.length; i++) {
              if (x[i].reference === load) {
                return i;
              }
            }
          }

          var y = mysearch(x, payload);
          var topicstobedeleted = x[y].topics;
          topicstobedeleted.forEach(element => {
            commit("updateTopics", element);
          });
          commit("deleteTopicFromCourseArray", payload);
          commit("setLoading", false);
          commit("setSuccess", {
            message: "Topics are Deleted Successfully",
            status: true
          });
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    deleteSingleTopic({ commit, getters }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      var courseref = db.collection("courses").doc(payload.courseref);
      var teacherref = db.collection("teachers").doc(getters.getUserId);
      var topicref = db.collection("topics").doc(payload.topicobj.reference);
      db.runTransaction(function(transaction) {
        return transaction.get(topicref).then(function(cr) {
          transaction.delete(topicref);
          transaction.update(teacherref, {
            topics: firebase.firestore.FieldValue.arrayRemove({
              name: payload.topicobj.name,
              reference: payload.topicobj.reference
            })
          });
          transaction.update(courseref, {
            topics: firebase.firestore.FieldValue.arrayRemove({
              name: payload.topicobj.name,
              reference: payload.topicobj.reference
            })
          });
          return;
        });
      })
        .then(function() {
          var x = getters.getTeacherCourses;
          //var z=getters.getTopics

          function mysearch(x, load) {
            for (var i = 0; i < x.length; i++) {
              if (x[i].reference === load) {
                return i;
              }
            }
          }

          var y = mysearch(x, payload.courseref);
          var coursewhichhastopictobedeleted = x[y].topics;
          coursewhichhastopictobedeleted.forEach(element => {
            if (element.reference == payload.topicobj.reference) {
              commit("updateTopicsSingleDelete", element);
            }
          });
          commit("deleteSingleTopicFromCourseArray", payload);
          commit("setLoading", false);
          commit("setSuccess", {
            message: "Topic Deleted Successfully",
            status: true
          });
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    }
  }
};
