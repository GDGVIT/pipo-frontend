import { createWebHistory, createRouter } from "vue-router";
import login from "@/views/loginPage";
import User from "@/views/User";
import generalPosts from "@/views/user/generalPosts";

const routes = [
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/",
    component: User,
    children: [
      {
        name: "generalPosts",
        path: "",
        component: generalPosts,
      },
      {
        name: "myPosts",
        path: "posts",
        component: () =>
          import(/*webpackChunkName: "myposts"*/ "../views/user/myPosts.vue"),
      },
      {
        name: "badges",
        path: "badges",
        component: () =>
          import(/*webpackChunkName: "badges"*/ "../views/user/badgesPage.vue"),
      },
      {
        name: "user",
        path: "user",
        component: () =>
          import(/*webpackChunkName: "user"*/ "../views/user/Profile.vue"),
        children: [
          {
            name: "userProfile",
            path: "profile",
            component: () =>
              import(
                /*webpackChunkName: "userProfile"*/ "../views/user/profile/userProfile.vue"
              ),
          },
          {
            name: "todolist",
            path: "todolist",
            component: () =>
              import(
                /*webpackChunkName: "todolist"*/ "../views/user/profile/todolist.vue"
              ),
          },
          {
            name: "interests",
            path: "interests",
            component: () =>
              import(
                /*webpackChunkName: "interests"*/ "../views/user/profile/interests.vue"
              ),
          },
          {
            name: "completedBadges",
            path: "badges",
            component: () =>
              import(
                /*webpackChunkName: "completedBadges"*/ "../views/user/profile/badges.vue"
              ),
          },
          {
            name: "calendar",
            path: "in-progress/:challengeName",
            component: () =>
              import(
                /*webpackChunkName: "inProgressBadges"*/ "../views/user/profile/Calendar.vue"
              ),
          },
          {
            name: "inProgressBadges",
            path: "in-progress",
            component: () =>
              import(
                /*webpackChunkName: "inProgressBadges"*/ "../views/user/profile/inProgressBadges.vue"
              ),
          },
        ],
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    component: () =>
      import(/*webpackChunkName: "notFound"*/ "../views/notFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
