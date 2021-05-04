import { createWebHistory, createRouter } from 'vue-router'
import login from '@/views/loginPage'
import User from '@/views/User'
import notFound from '@/views/notFound'
import { generalPosts, badges, myPosts } from './basic'
import Profile from '@/views/user/Profile'
import {
  Badges,
  InProgressBadges,
  Interests,
  TodoList,
  UserProfile
} from './userProfile'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
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
      },
      {
        path: 'user',
        component: Profile,
        children: [
          {
            path: 'profile',
            component: UserProfile
          },
          {
            path: 'todolist',
            component: TodoList
          },
          {
            path: 'interests',
            component: Interests
          },
          {
            path: 'badges',
            component: Badges
          },
          {
            path: 'in-progress',
            component: InProgressBadges
          }
        ]
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
