import { createWebHistory, createRouter } from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/auth'
import generalPosts from '../components/generalPosts'
import login from '../components/loginPage'
import notFound from '../components/notFound'
import badges from '../components/badgesPage'

function routeGuard (to, from, next) {
  const user = firebase.auth().currentUser
  console.log(user)
  if (user) {
    next()
  } else {
    next('/login')
  }
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'generalPosts',
    beforeEnter: routeGuard,
    component: generalPosts
  },
  {
    path: '/badge',
    name: 'badges',
    beforeEnter: routeGuard,
    component: badges
  },
  {
    path: '/:catchAll(.*)',
    beforeEnter: routeGuard,
    component: notFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
