<template>
  <div class="flex-col page">
    <div class="flex-col flex-auto group space-y-10">
      <div class="flex-col sectionbanner space-y-26">
        <div class="flex-col items-start space-y-6">
          <span class="text_3">Rangers</span>
          <span class="text_4">{{ state.address }}</span>
        </div>
        <div class="flex-row items-baseline space-x-3">
          <span class="font_1 text_6">$</span>
          <span class="text_5">7829734.22</span>
        </div>
      </div>
      <div class="flex-row equal-division space-x-15">
        <div
          class="flex-row justify-evenly equal-division-item"
          @click="goTransfer"
        >
          <img src="@/assets/shang.png" />
          <span class="font_1">发送代币</span>
        </div>

        <div
          class="flex-row justify-evenly equal-division-item"
          @click="goReceive"
        >
          <img src="@/assets/xia.png" />
          <span class="font_1">接收代币</span>
        </div>
      </div>
      <div class="flex-col space-y-10">
        <div
          class="flex-row justify-between list-item"
          :key="i"
          v-for="(item, i) in state.tokenList"
        >
          <div class="flex-row items-end self-center group_2 space-x-9">
            <img class="image_5" :src="item.image" />
            <div class="flex-col">
              <span class="self-start font_1">{{ item.symbol }}</span>
            </div>
          </div>
          <span class="font_2">{{ item.balance }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import {
  reactive,
  ref,
  onMounted,
  onBeforeMount,
  getCurrentInstance,
} from "vue";
import Service from "@/utils/service";
const { proxy } = getCurrentInstance();
const router = useRouter();
let service;

onMounted(async () => {
  proxy.$toast.clear();
  service = Service.getInstance();
  service.mmtg.backButtonClick(backButtonClicked);
  state.address = service.user.address;
  state.tokenList = service.getTokenList();
  loadBalnace();
});
const backButtonClicked = () => {
  router.go(-1);
};

const goReceive = () => {
  service.mmtg.backButtonShow();
  router.push("/receive");
};
const goTransfer = () => {
  service.mmtg.backButtonShow();
  router.push("/transfer");
};
const goBack = () => {
  router.go(-1);
};

const getImg = (name) => {
  let url = new URL(`/src/assets/${name}.png`, import.meta.url).href;
  return url;
};

const loadBalnace = async () => {
  state.tokenList = await service.loadMultiBalance(state.tokenList);
};

const state = reactive({
  tokenList: [],
  address: null,
});

const jump = () => {
  router.push("/empower");
};
</script>

<style scoped lang="scss">
.page {
  background: #fafbff;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
  .sectionbanner {
    padding: 0.94rem 0.81rem 0.75rem;
    background: url(@/assets/banner.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .space-y-6 {
      & > *:not(:first-child) {
        margin-top: 0.38rem;
      }
      .text_3 {
        color: #ffffff;
        font-size: 1rem;
        font-family: ".AppleSystemUIFont";
        line-height: 1.13rem;
      }
      .text_4 {
        color: #ffffff;
        font-size: 0.75rem;
        font-family: ".AppleSystemUIFont";
        line-height: 0.94rem;
      }
    }
    .space-x-3 {
      & > *:not(:first-child) {
        margin-left: 0.19rem;
      }
      .font_1 {
        font-size: 0.88rem;
        font-family: "PingFang SC";
        line-height: 1.25rem;
        font-weight: 500;
        color: #333333;
      }
      .text_6 {
        color: #ffffff;
      }
      .text_5 {
        color: #ffffff;
        font-size: 1.38rem;
        font-family: "PingFang SC";
        font-weight: 500;
        line-height: 1.88rem;
      }
    }
  }
  .equal-division {
    width: 100%;
    // height: 92px;
    background: #ffffff;
    border-radius: 10px;
    padding: 15px;
    box-sizing: border-box;

    img {
      width: 20px;
      height: 20px;
    }
    .equal-division-item {
      cursor: pointer;
      padding: 0.38rem 2.25rem;
      flex: 1 1 9.38rem;
      background-color: #0000001a;
      border-radius: 0.38rem;
      height: 2rem;
    }

    .font_1 {
      font-size: 0.88rem;
      font-family: "PingFang SC";
      line-height: 1.25rem;
      font-weight: 500;
      color: #333333;
    }
  }
  .space-x-15 {
    & > *:not(:first-child) {
      margin-left: 0.94rem;
    }
  }
  .space-y-26 {
    & > *:not(:first-child) {
      margin-top: 1.63rem;
    }
  }
  .pos {
    position: absolute;
    left: 0.94rem;
    right: 0.94rem;
    top: 0.75rem;
  }
  .text_2 {
    margin-bottom: 0.71rem;
    text-align: center;
    color: #333333;
    font-size: 1.25rem;
    font-family: "PingFang SC";
    font-weight: 600;
    line-height: 1.75rem;
  }
  .space-y-18 {
    & > *:not(:first-child) {
      margin-top: 1.13rem;
    }
  }
  .group {
    padding: 0.81rem 0.94rem 0;
    overflow-y: auto;
    .image_4 {
      width: 21.56rem;
      height: 11.5rem;
    }
  }
  .space-y-10 {
    .list-item {
      margin-top: 0.63rem;
      display: flex;
      align-items: center;
      padding: 0.71rem;

      background-color: #ffffff;
      border-radius: 0.63rem;
      .group_2 {
        display: flex;
        align-items: center;
        width: 8.81rem;
        .group_3 {
          display: flex;
          align-items: center;
          width: 3.31rem;
        }
        .section {
          background-color: #ffffff;
          width: 1.75rem;
          height: 1.75rem;
        }
        .image_5 {
          display: block;
          width: 2.25rem;
          height: 2.25rem;
        }
        .font_1 {
          font-size: 0.88rem;
          font-family: "PingFang SC";
          line-height: 1.25rem;
          font-weight: 500;
          color: #333333;
        }
        .text-wrapper {
          padding: 0.13rem 0;
          background-color: #000000;
          border-radius: 0.63rem;
          width: 4.94rem;
        }
      }
      .space-x-9 {
        & > *:not(:first-child) {
          margin-left: 0.56rem;
        }
      }
      .font_2 {
        display: block;
        font-size: 1rem;
        font-family: "PingFang SC";
        line-height: 1.38rem;
        font-weight: 500;
        color: #333333;
      }
      // .text_3 {
      //   margin-right: 0.75rem;
      //   margin-top: 1.56rem;
      // }
    }
  }

  .font_3 {
    font-size: 0.75rem;
    font-family: "PingFang SC";
    line-height: 1.06rem;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
