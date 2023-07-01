/*
 * @Author: mouse
 * @Date: 2023-06-13 15:12:22
 * @LastEditTime: 2023-06-19 15:24:29
 * @LastEditors: mouse
 * @Description:
 * @FilePath: /telegram_demo/src/main.js
 * @project:
 */

import { createApp } from "vue";
import { createPinia } from "pinia";
import service from "./utils/service";

import App from "./App.vue";
import router from "./router";
import Toaster from "@/components/toastPluals";

import Vant from "vant";
import "vant/lib/index.css";

(async () => {
    await service.getInstance().init();
    const app = createApp(App);

    app.use(createPinia());

    // app.mount("#app");

    app.use(router).use(Vant);
    app.use(Toaster);
    router.isReady().then(() => {
        app.mount("#app");
    });
})();

