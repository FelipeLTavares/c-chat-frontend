import { getToken } from "@/services/localStorage/AuthStorage";
import store from "@/store";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Auth from "../views/AuthenticationView.vue";
import Chat from "../views/ChatView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.name !== "Auth" && !store.state.userInfo.isLoggedIn) {
    console.log("está em chat");
    const token = getToken();
    console.log(token);
    if (token) {
      await store.dispatch("SET_TOKEN", token);
      next();
    } else {
      next({
        path: "/",
        replace: true,
      });
    }
  } else {
    next();
  }
});

export default router;
