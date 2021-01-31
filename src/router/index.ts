import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/result",
    name: "Result",
    component: () => import("@/views/Result.vue"),
    beforeEnter(_to: object, _from: object, next: Function) {
      const mbti = localStorage.getItem("mbti") || "";

      if (!mbti) return next({ name: "Home" });

      return next();
    }
  },
  {
    path: "/check-result",
    name: "CheckResult",
    component: () => import("@/views/CheckResult.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
