<!--
 * @Author: mouse
 * @Date: 2023-06-20 10:02:44
 * @LastEditTime: 2023-07-01 11:23:33
 * @LastEditors: mouse
 * @Description: 
 * @FilePath: /telegram_demo/src/views/assessHome/assessHome.vue
 * @project: 
-->
<template>
  <div class="flex-col page">
    <div class="group_content1">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item
        :key="i"
        v-for="(item, i) in state.tabs"
        @click="tabs(item)"
      >
        <span class="tabsfont">{{ item.name }}</span>
        <template #icon="props">
          <img :src="getImg(props.active ? item.activeimg : item.img)" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive, ref, onMounted, onBeforeMount } from "vue";
const router = useRouter();
const active = ref(0);

const tabs = (item) => {
  console.log(item);
  active.active = item.id;
  // localStorage.setItem("assetsHomeActive", index);
  router.replace(state.tabs[item.id].url);
};

const getImg = (name) => {
  let url = new URL(`/src/assets/${name}.png`, import.meta.url).href;
  return url;
};

const state = reactive({
  tabs: [
    {
      id: 0,
      name: "资产",
      img: "1icon",
      activeimg: "1iconActive",
      url: "/assets",
    },
    {
      id: 1,
      name: "c2c交易",
      img: "2icon",
      activeimg: "2iconActive",
      url: "",
    },
  ],
  active: 0,
});
</script>

<style scoped lang="scss">
:deep(.van-tabbar-item--active) {
  color: #333333 !important;
}
.tabsfont {
  font-size: 12px;
  font-weight: 500;
  // color: #8f92a1;
}
</style>
