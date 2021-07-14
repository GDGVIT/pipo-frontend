import { createWebHistory, createRouter } from "vue-router";
import login from "@/views/loginPage";
import User from "@/views/User";
import home from "@/views/user/home";

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
        name: "home",
        path: "",
        component: home,
      },
      {
        name: "generalPosts",
        path: "/leaderboard",
        component: () =>
          import(
            /* webpackChunkName: "generalPosts" */ "../views/user/generalPosts.vue"
          ),
      },
      {
        name: "randomUserPosts",
        path: "posts/:userId",
        component: () =>
          import(
            /* webpackChunkName: "randomUserPosts" */ "../views/user/postsOfUser.vue"
          ),
      },
      {
        name: "myPosts",
        path: "posts",
        component: () =>
          import(/* webpackChunkName: "myposts" */ "../views/user/myPosts.vue"),
      },
      {
        name: "badges",
        path: "badges",
        component: () =>
          import(
            /* webpackChunkName: "badges" */ "../views/user/badgesPage.vue"
          ),
      },
      {
        name: "user",
        path: "user",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user/Profile.vue"),
        children: [
          {
            name: "userProfile",
            path: "profile",
            component: () =>
              import(
                /* webpackChunkName: "userProfile" */ "../views/user/profile/userProfile.vue"
              ),
          },
          {
            name: "randomUserProfile",
            path: "profile/:userId",
            component: () =>
              import(
                /* webpackChunkName: "randomUserProfile" */ "../views/user/profile/randomUserProfile.vue"
              ),
          },
          {
            name: "todolist",
            path: "todolist",
            component: () =>
              import(
                /* webpackChunkName: "todolist" */ "../views/user/profile/todolist.vue"
              ),
          },
          {
            name: "interests",
            path: "interests",
            component: () =>
              import(
                /* webpackChunkName: "interests" */ "../views/user/profile/interests.vue"
              ),
          },
          {
            name: "completedBadges",
            path: "badges",
            component: () =>
              import(
                /* webpackChunkName: "completedBadges" */ "../views/user/profile/badges.vue"
              ),
          },
          {
            name: "calendar",
            path: "calendar/:challengeId",
            component: () =>
              import(
                /* webpackChunkName: "calendar" */ "../views/user/profile/Calendar.vue"
              ),
          },
          {
            name: "inProgressBadges",
            path: "in-progress",
            component: () =>
              import(
                /* webpackChunkName: "inProgressBadges" */ "../views/user/profile/inProgressBadges.vue"
              ),
          },
          {
            name: "followers",
            path: "followers",
            component: () =>
              import(
                /* webpackChunkName: "followers" */ "../views/user/profile/followers.vue"
              ),
          },
          {
            name: "following",
            path: "following",
            component: () =>
              import(
                /* webpackChunkName: "following" */ "../views/user/profile/following.vue"
              ),
          },
        ],
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "../views/notFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to) => {
    if (to.hash) {
      return { el: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes,
});

export default router;
