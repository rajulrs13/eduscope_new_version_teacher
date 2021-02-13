import firebase from '../../firebase/firebase'
import db from '../../firebase/db'
export default {
    state: {
        courses: []
    },
    getters: {
        getTeacherCourses(state) {
            return state.courses
        }
    },
    mutations: {
        setTeacherCourse(state, payload) {
            state.courses.push(payload)
        },
        updateCourses(state, payload) {
            var temp = state.courses
            var newarr = temp.filter(hello => hello.reference != payload.reference)
            state.courses = newarr
        },
        //course array k index p jo topic array h us p append krta h
        pushTopicInCourseArray(state, payload) {
            if (payload !== null && payload !== undefined) {
                state.courses[payload.index].topics.push(payload.topicobj)
            }
        },
        pushClassInCourseArray(state, payload) {
            if (payload !== null && payload !== undefined) {
                state.courses[payload.index].classes.push(payload.classobj)
            }
        },
        pushQuizInCourseArray(state, payload) {
            if (payload !== null && payload !== undefined) {
                state.courses[payload.index].quizzes.push({reference: payload.reference})
            }
        },
        clearCourses(state) {
            state.courses = []
        },
        // Deletes all topics of the course
        deleteTopicFromCourseArray(state, payload) {
            for (var i = 0; i< state.courses.length; i++){
                if (state.courses[i].reference === payload) {
                    state.courses[i].topics = []
                }
            }
        },
        deleteSingleTopicFromCourseArray(state, payload) {
            for (var i = 0; i< state.courses.length; i++){
                if (state.courses[i].reference === payload.courseref) {

                    var temp = state.courses[i].topics
                    var newarr = temp.filter(hello => hello.reference != payload.topicobj.reference)
                    state.courses[i].topics = newarr

                    // for (var j = 0; j < state.courses[i].topics.length; j++)
                    // state.courses[j].topics = []
                }
            }
        },        
        deleteSingleClassFromCourseArray(state, payload) {
            for (var i = 0; i < state.courses.length; i++) {
                if (state.courses[i].reference === payload.courseref) {
                    var temp = state.courses[i].classes
                    var newarr = temp.filter(hello => hello.reference != payload.classobj.reference)
                    state.courses[i].classes = newarr                    
                }
            }
        },
        deleteSingleQuizFromCourseArray(state, payload){
            for (var i = 0; i < state.courses.length; i++) {
                if (state.courses[i].reference === payload.courseref) {
                    var temp = state.courses[i].quizzes
                    var newarr = temp.filter(hello => hello.reference != payload.reference)
                    state.courses[i].quizzes = newarr                    
                }
            }
        }
    },
    actions: {
        addNewCourse({ commit, getters }, payload) {
            commit('setLoading', true)
            commit('clearError')
            commit('clearSuccess')
            db.collection('courses').add(
                {
                    name: payload.name,
                    code: payload.code,
                    acronym: payload.acronym,
                    //topics: []
                }).then(
                    data => {
                        db.collection('teachers').doc(getters.getUserId).set({
                            courses: firebase.firestore.FieldValue.arrayUnion({ reference: data.id, code: payload.code, name: payload.name, acronym: payload.acronym })
                        },
                            { merge: true })
                        commit('setTeacherCourse', { reference: data.id, code: payload.code, name: payload.name, acronym: payload.acronym, topics: [], classes: [], quizzes: [] })
                        commit('setLoading', false)
                        commit('setSuccess', { message: 'Course Added Successfully', status: true })
                    }
                ).catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                    }
                )
        },
        fetchTeacherCourses({ commit, getters }) {
            var x = getters.getTeacherCourses
            if (typeof x === 'undefined' || x.length <= 0 || x === null || x === '') {                
                commit('setLoading', true)
                commit('clearError')
                commit('clearSuccess')
                db.collection('teachers').doc(getters.getUserId).get().then(
                    data => {
                        if (data.data().courses !== undefined && data.data().courses !== null) {
                            data.data().courses.forEach(element => {
                                db.collection('courses').doc(element.reference).get().then(
                                    coursedata => {
                                        var k = coursedata.data().topics
                                        if (k === undefined || k === null) {
                                            k = []
                                        }
                                        var f = coursedata.data().classes
                                        if (f === undefined || f === null) {
                                            f = []
                                        }
                                        var g = coursedata.data().quizzes
                                        if (g === undefined || g === null) {
                                            g = []
                                        }
                                        var newelement = {
                                            name: coursedata.data().name,
                                            code: coursedata.data().code,
                                            acronym: coursedata.data().acronym,
                                            topics: k,
                                            classes: f,
                                            quizzes: g,
                                            reference: element.reference
                                        }
                                        commit('setTeacherCourse', newelement)
                                    }).catch(
                                        error => {
                                            commit('setLoading', false)
                                            commit('setError', error)
                                        }
                                    )
                            });
                        }
                        commit('setLoading', false)
                    }
                ).catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                    }
                )
            }
            else {
                // console.log('Courses already there')
            }
        },
        deleteCourse({ commit, getters, dispatch }, payload) {
            commit('setLoading', true)
            commit('clearError')
            commit('clearSuccess')
            
            var courseref = db.collection('courses').doc(payload.reference)
            var teacherref = db.collection('teachers').doc(getters.getUserId)

            db.runTransaction(function (transaction) {
                return transaction.get(courseref).then(function (cr) {
                    if (cr.data().topics !== undefined && cr.data().topics !== null) {

                        cr.data().topics.forEach(element => {
                            var topicref = db.collection('topics').doc(element.reference)
                            transaction.delete(topicref)
                        });
                        cr.data().topics.forEach(element => {
                            transaction.update(teacherref, {
                                topics: firebase.firestore.FieldValue.arrayRemove({ name: element.name, reference: element.reference })
                            })
                        });
                    }
                    if (cr.data().classes !== undefined && cr.data().classes !== null) {

                        cr.data().classes.forEach(element => {
                            var classref = db.collection('classes').doc(element.reference)
                            transaction.delete(classref)
                        });
                        cr.data().classes.forEach(element => {
                            transaction.update(teacherref, {
                                classes: firebase.firestore.FieldValue.arrayRemove({ name: element.name, acronym: element.acronym, reference: element.reference })
                            })
                        });
                    }

                    if (cr.data().quizzes !== undefined && cr.data().quizzes !== null) {

                        cr.data().quizzes.forEach(element => {
                            var quizref = db.collection('quizzes').doc(element.reference)
                            transaction.delete(quizref)
                        });
                        cr.data().quizzes.forEach(element => {
                            transaction.update(teacherref, {
                                quizzes: firebase.firestore.FieldValue.arrayRemove({ reference: element.reference })
                            })
                        });
                    }
                    transaction.delete(courseref)
                    transaction.update(teacherref, {
                        courses: firebase.firestore.FieldValue.arrayRemove({ name: payload.name, acronym: payload.acronym, code: payload.code, reference: payload.reference })
                    })


                    return
                })
            }).then(function () {
                if (payload.topics !== undefined && payload.topics !== null) {
                    dispatch('deletetopicwhencoursedeleted', payload)
                }
                else{
                }
                if (payload.classes !== undefined && payload.classes !== null) {
                    dispatch('deleteclasswhencoursedeleted', payload)
                }
                if (payload.quizzes !== undefined && payload.quizzes !== null) {
                    dispatch('deletequizwhencoursedeleted', payload)
                }
                commit('updateCourses', payload)
                commit('setLoading', false)
                commit('setSuccess', { message: 'Course Deleted Successfully', status: true })
            }
            ).catch(error => {
                commit('setLoading', false)
                commit('setError', error)
            })

        }
    }
}       