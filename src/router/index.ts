import { getToken } from "@/services/localStorage/AuthStorage";
import store from "@/store";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Auth from "../views/AuthenticationView.vue";
import Chat from "../views/ChatView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Chat",
    component: Chat,
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

async function verifyToken() {
  const token = getToken();
  if (token) {
    await store.dispatch("SET_TOKEN", token);
    return true;
  }
  return false;
}

router.beforeEach(async (to, from, next) => {
  if (
    !store.state.userInfo.isLoggedIn &&
    to.name === "Auth" &&
    (await verifyToken())
  ) {
    next({
      path: "/",
      replace: true,
    });
    return;
  }
  if (
    !store.state.userInfo.isLoggedIn &&
    to.name !== "Auth" &&
    !(await verifyToken())
  ) {
    next({
      path: "/auth",
      replace: true,
    });
    return;
  }
  next();
});

export default router;
