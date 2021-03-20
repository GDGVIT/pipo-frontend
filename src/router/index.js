import { createWebHistory, createRouter } from "vue-router";
import generalPosts from "../components/generalPosts";
import login from "../components/loginPage";
import notFound from "../components/notFound";
import badges from "../components/badgesPage";

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
    path: "/:catchAll(.*)",
    component: notFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
