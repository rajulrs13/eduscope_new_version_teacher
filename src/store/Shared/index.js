export default{
  state: {
    loading: false,
    error: null,
    success: null
  },
  getters: {
    error(state) {
      return state.error
    },
    loading(state) {
      return state.loading
    },
    success(state){
      return state.success
    }
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
    setSuccess(state,payload){
      state.success=payload
    },
    clearSuccess(state) {
      state.success = null
    }
  },
  actions: {
    clearError({ commit }) {
      commit('clearError')
    },
    clearSuccess({ commit }) {
      commit('clearSuccess')
    }
  }

}
