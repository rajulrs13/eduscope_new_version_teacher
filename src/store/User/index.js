import * as firebase from "firebase";
import router from "../../router/index";

export default {
  state: {
    userid: null
  },
  getters: {
    getUserId(state) {
      return state.userid;
    }
  },
  mutations: {
    setUserId(state, payload) {
      state.userid = payload;
    }
  },
  actions: {
    signUserIn({ commit, dispatch }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          // commit('setUserId', data.user.uid)
          // dispatch('getProfileData')
          // dispatch("fetchTeacherCourses")
          commit("setLoading", false);
          router.replace("/dashboard");
          // commit('setSuccess', { message: 'Signed In Successfully', status: true })
          setTimeout(() => dispatch("clearSuccess"), 2000);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    autoSignIn({ commit, dispatch }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      commit("setUserId", payload.uid);
      dispatch("getProfileData");
      dispatch("fetchTeacherCourses");
      dispatch("fetchTeacherTopics");
      dispatch("fetchTeacherClasses");
      dispatch("fetchTeacherQuizzes");
      dispatch("getAllCourseList");
      commit("setLoading", false);
      commit("setSuccess", { message: "Signed In Successfully", status: true });
      setTimeout(() => commit("clearSuccess"), 2000);
    },
    logout({ commit, dispatch }) {
      firebase.auth().signOut();
      commit("setUserId", null);
      commit("setName", "");
      commit("setEmail", "");
      commit("setContact", "");
      commit("setAllCourseList", "");
      commit("clearCourses");
      commit("clearTopics");
      commit("clearClasses");
      commit("clearQuizzes");
      commit("setSuccess", {
        message: "Logged Out Successfully",
        status: true
      });
      router.replace("/signin");
      setTimeout(() => dispatch("clearSuccess"), 2000);
    },
    resetPassword: ({commit}, payload) => {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");            
      firebase
        .auth()
        .sendPasswordResetEmail(payload.email)
        .then(function() {                            
          commit('setSuccess', { message: 'Password Reset link has been sent to your account linked with Eduscope', status: true })
          commit("setLoading", false);
        })
        .catch(function(error) {               
          commit("setLoading", false);
          commit("setError", error);
        });
    }
  }
};
