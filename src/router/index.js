import { createWebHistory, createRouter } from 'vue-router'
import login from '@/views/loginPage'
import User from '@/views/User'
import notFound from '@/views/notFound'
import { generalPosts, badges, myPosts } from './basic'

// import {
//   UserProfile,
//   CompletedBadges,
//   InProgressBadges,
//   Friends,
//   Tags,
//   TodoList,
// } from "./userProfile";

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/:userId',
    component: User,
    children: [
      {
        path: '',
        component: generalPosts
      },
      {
        path: 'posts',
        component: myPosts
      },
      {
        path: 'badges',
        component: badges
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    component: notFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
