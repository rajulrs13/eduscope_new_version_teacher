import firebase from '../../firebase/firebase'
import db from '../../firebase/db'
export default {
    state: {
        name: '',
        contact: '',
        email: '',
        allcourses: [],
        allclasslist: []
    },
    getters: {
        getName(state) {
            return state.name
        },
        getEmail(state) {
            return state.email
        },
        getContact(state) {
            return state.contact
        },
        getAllCourseList(state) {
            return state.allcourses
        },
        getAllClassList(state){
            return state.allclasslist
        }
    },
    mutations: {
        setName(state, payload) {
            state.name = payload
        },
        setEmail(state, payload) {
            state.email = payload
        },
        setContact(state, payload) {
            state.contact = payload
        },
        setAllCourseList(state, payload) {
            state.allcourses = payload
        },
        setAllClassList(state, payload) {
            state.allclasslist = payload
        }
    },
    actions: {
        getProfileData({ commit, getters }) {
            commit('setLoading', true)
            commit('clearError')
            var getOptions = {
                source: 'cache'
            }
            db.collection('teachers').doc(getters.getUserId).get(getOptions).then(
                function (doc) {
                    if (doc.exists) {
                        commit('setName', doc.data().name)
                        commit('setEmail', doc.data().email)
                        commit('setContact', doc.data().contact)

                    }
                    else {
                        // console.log('Doc not found')
                    }
                    commit('setLoading', false)
                }
            ).catch(
                function (error) {
                    db.collection('teachers').doc(getters.getUserId).get().then(
                        function (doc) {
                            if (doc.exists) {
                                commit('setName', doc.data().name)
                                commit('setEmail', doc.data().email)
                                commit('setContact', doc.data().contact)

                            }
                            else {
                                // console.log('Doc not found')
                            }
                            commit('setLoading', false)
                        }
                    ).catch(
                        function (error) {
                            commit('setLoading', false)
                            commit('setError', error)
                        }
                    )
                    commit('setLoading', false)

                }
            )
        },
        getAllCourseList({ commit }) {
            commit('setLoading', true)
            commit('clearError')
            var getOptions = {
                source: 'cache'
            }
            db.collection('allcourses').doc('1vy5FuqLLiPtfjTrt3bo').get(getOptions).then(
                function (doc) {
                    if (doc.exists) {
                        commit('setAllCourseList', doc.data().allcourselist)
                        commit('setAllClassList', doc.data().classes)
                        commit('setLoading', false)
                    }
                    else {
                        commit('setLoading', false)
                        // console.log('Doc not found')
                    }
                }
            ).catch(
                function (error) {
                    db.collection('allcourses').doc('1vy5FuqLLiPtfjTrt3bo').get().then(
                        function (doc) {
                            if (doc.exists) {
                                commit('setAllCourseList', doc.data().allcourselist)
                                commit('setAllClassList', doc.data().classes)
                                commit('setLoading', false)
                            }
                            else {
                                commit('setLoading', false)
                                // console.log('Doc not found')
                            }
                        }
                    ).catch(
                        function (error) {

                            commit('setLoading', false)
                            commit('setError', error)
                        }
                    )
                    commit('setLoading', false)
                }
            )
        },
        updatenameandcontact({ commit, getters }, payload) {
            commit('setLoading', true)
            commit('clearError')
            commit('clearSuccess')
            db.collection('teachers').doc(getters.getUserId).set({
                name: payload.newname,
                contact: payload.newcontact
            }, { merge: true }).then(function () {
                commit('setName', payload.newname)
                commit('setContact', payload.newcontact)
                commit('setLoading', false)
                commit('setSuccess', { message: 'Profile detail updated successfully', status: true })

            }).catch(function (error) {
                commit('setLoading', false)
                commit('setError', error)
            })
        },
        updatepassword({ commit, getters, dispatch }, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(getters.getEmail, payload.oldpassword).then(
                function (user) {
                    firebase.auth().currentUser.updatePassword(payload.newpassword).then(
                        function () {
                            commit('setLoading', false)
                            commit('setSuccess', { message: 'Password Updated Successfully', status: true })
                            dispatch('logout')
                        }
                    ).catch(
                        error => {
                            commit('setLoading', false)
                            commit('setError', error)
                        }
                    )
                }
            ).catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error)
                }
            )
        }
    }
}