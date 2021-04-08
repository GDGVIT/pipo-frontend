import { createWebHistory, createRouter } from "vue-router";

import generalPosts from "../components/generalPosts";
import login from "../components/loginPage";
import notFound from "../components/notFound";
import badges from "../components/badgesPage";
import User from "../views/User";
import {
  UserProfile,
  CompletedBadges,
  InProgressBadges,
  Friends,
  Tags,
  TodoList,
} from "./user";

const routes = [
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/",
    name: "generalPosts",
    component: generalPosts,
  },
  {
    path: "/badge",
    name: "badges",
    component: badges,
  },
  {
    path: "/user/",
    component: User,
    children: [
      {
        path: "profile",
        component: UserProfile,
      },
      {
        path: "completed-badges",
        component: CompletedBadges,
      },
      {
        path: "in-progress-badges",
        component: InProgressBadges,
      },
      {
        path: "tags",
        component: Tags,
      },
      {
        path: "friends",
        component: Friends,
      },
      {
        path: "todolist",
        component: TodoList,
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    component: notFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
