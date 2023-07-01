/*
 * @Author: mouse
 * @Date: 2023-06-15 12:12:19
 * @LastEditTime: 2023-07-01 11:33:27
 * @LastEditors: mouse
 * @Description: 
 * @FilePath: /telegram_demo/src/router/index.js
 * @project: 
 */
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/empower",
      name: "empower",
      component: () => import("../views/empower.vue"),
    },
    {
      path: "/",
      name: "home",
      component: () => import("../views/empower.vue"),
    },
    {
      path: "/assetsHome",
      name: "assetsHome",
      redirect: { name: 'assets' },
      component: () => import("../views/assetsHome.vue"),
      children: [

        {
          path: '/assets',
          name: 'assets', //资产
          component: () => import(/* webpackChunkName: "assets" */ '../views/assets.vue')
        },
      ]
    },
    {
      path: "/receive",
      name: "receive",
      component: () => import("../views/receive.vue"),
    },
    {
      path: "/transfer",
      name: "transfer",
      component: () => import("../views/transfer.vue"),
    },
    
  ],
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior() {
    // vue2.0  x  y  控制
    // vue3.0  left  top 控制
    return { left: 0, top: 0 }
  }
});

export default router;
