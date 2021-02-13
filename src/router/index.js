/* eslint-disable */
import Vue from 'vue'
import { store } from '../store/store'
import Router from 'vue-router'
import Mainpage from '@/components/mainpage'
// import Test from '@/components/testing'
import Profile from '@/components/Tutor/Profile/profile'
import Dashboard from '@/components/Tutor/Dashboard/dashboard'
import Quizzes from '@/components/Tutor/Quizzes/quizzes'
import QuizResult from '@/components/Tutor/Quizzes/result'
import Courses from '@/components/Tutor/Courses/courses'
import CourseClasses from '@/components/Tutor/Classes/courseclasses'
import Classes from '@/components/Tutor/Classes/classes'
import Student from '@/components/Tutor/Classes/studentinfo'
import Topic from '@/components/Tutor/Courses/topics'
import Allquizzes from '@/components/Tutor/Quizzes/allquizzes'
import Signin from '@/components/Tutor/User/signin'
import Home from '@/components/Tutor/User/home'
import Contact from '@/components/Tutor/ContactUs/contactus'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Mainpage',
      component: Mainpage
    },
    // {
    //   path: '/test',
    //   name: 'Test',
    //   component: Test
    // },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/signin',
          name: 'Signin',
          component: Signin,
          meta:{
            notloggedin: true
          }
        },
        {
          path: '/contactus',
          name: 'Contact',
          component: Contact
        },
        {
          path: '/profile',
          name: 'Profile',
          component: Profile,
          meta:{
            authRequired: true
          }
        },
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta:{
            authRequired: true
          }
        },
        {
          path: '/courses',
          name: 'Courses',
          component: Courses,
          meta:{
            authRequired: true
          }
        },
        {
          path: '/quizzes',
          name: 'Quizzes',
          component: Quizzes,
          meta:{
            authRequired: true
          }
        },
        {
          path: '/classes',
          name: 'Classes',
          component: Classes,
          meta:{
            authRequired: true
          }
        },        
        {
          path: '/courses/:coursereference',
          name: 'Topic',
          component: Topic,
          meta:{
            authRequired: true
          }
        },
        {
          path: '/result/:quizreference',
          name: 'QuizResult',
          component: QuizResult,
          meta:{
            authRequired: true
          }
        },
        {
          path: '/classes/:coursereference',
          name: 'CourseClasses',
          component: CourseClasses,
          meta:{
            authRequired: true
          }
        },
        {
          path: '/studentinfo/:classreference',
          name: 'StudentInfo',
          component: Student,
          meta:{
            authRequired: true
          }
        },
        {
          path: '/allquizzes/:coursereference',
          name: 'Allquizzes',
          component: Allquizzes,
          meta:{
            authRequired: true
          }
        }        
      ]
    },
    
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.getters.getUserId) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
