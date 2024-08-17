import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/product/:id",
      name: "product",
      component: () => import("../views/DetailProduct.vue"),
    },
    {
      path: "/keranjang",
      name: "keranjang",
      component: () => import("../views/Keranjang.vue"),
    }
  ],
});

export default router;
