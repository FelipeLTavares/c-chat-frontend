import { getToken } from "@/services/localStorage/AuthStorage";
import store from "@/store";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Auth",
    component: () => import("../views/AuthenticationView.vue"),
    async beforeEnter(_, __, next) {
      if (!store.state.userInfo.isLoggedIn) {
        const token = getToken();
        console.log(token);
        if (token) {
          await store.dispatch("SET_TOKEN", token);
          next({
            name: "Chat",
          });
        }
        next({
          name: "Auth",
        });
      }
    },
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("../views/ChatView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

/* router.beforeEach(async (to, from, next) => {
  console.log("Estou aqui:", store.state.userInfo);
  console.log(to.name, from.name);
  if (!store.state.userInfo.isLoggedIn) {
    const token = getToken();
    console.log(token);
    if (token) {
      await store.dispatch("SET_TOKEN", token);
      next({
        name: "Chat",
      });
    }
    next({
      name: "Auth",
    });
  }
}); */

export default router;
