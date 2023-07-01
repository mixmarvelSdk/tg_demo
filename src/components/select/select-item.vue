<template>
  <li
    class="tk-select-item"
    :class="{ active: active }"
    @click="chooseSelectItem"
  >
    <slot></slot>
  </li>
</template>

<script setup>
import Bus from "./selectBus";
import { ref, getCurrentInstance, inject, onDeactivated } from "vue";
const page = getCurrentInstance();
const active = ref(false);
const token = inject("token");
page.token = token;
const props = defineProps({
  mode: {
    type: String,
    default: "simple",
  },
  value: {
    type: Object,
    default: [],
  },
});

function chooseSelectItem() {
  console.log(props.value);
  if (props.mode == "simple")
    Bus.$emit("chooseSelectItem", { token: token, value: props.value });
}

onDeactivated(() => {
  Bus.$off("chooseActive");
});
Bus.$on("chooseActive", (res) => {
  if (res.token !== page.token) return;
  if (res.value == props.value) active.value = true;
  else active.value = false;
});
</script>

<style lang="scss" scoped>
// 暂时取消掉点击反应效果
// .tk-select-item.active {
//   color: aqua;
//   background-color: #f2f3f5;
//   user-select: none;
// }
.tk-select-item:hover {
  background-color: #f2f3f5;
}

.tk-select-item {
  padding: 0 10px;
  line-height: 26px;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  height: 2.33rem;
  img {
    margin-left: 10px;
    display: block;
  }
}
</style>
