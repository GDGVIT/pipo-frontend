import { createWebHistory, createRouter } from "vue-router";
import generalPosts from "../components/generalPosts";
import login from "../components/loginPage";
import notFound from "../components/notFound";

const routes = [
  {
    path: "/",
    name: "login",
    component: login,
  },
  {
    path: "/general",
    name: "generalPosts",
    component: generalPosts,
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
