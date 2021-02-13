import Vue from 'vue'
import Vuex from 'vuex'
import shared from './Shared'
import user from './User'
import profile from './Profile'
import courses from './Courses'
import topics from './Topics'
import classes from './Classes'
import quizzes from './Quizzes'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules:{
    shared: shared,
    user: user,
    profile: profile,
    courses:courses,
    topics: topics,
    classes: classes,
    quizzes:quizzes
  }
})
