<template>
  <div class="flex-col page">
    <div class="flex-col flex-auto group">
      <div class="flex-col justify-start items-center relative group_2">
        <img class="image_5" src="@/assets/arrow.png" />
        <div class="flex-row pos">
          <div class="flex-col items-center equal-division-item space-y-10">
            <img class="image_4" src="@/assets/fly.png" />
            <span class="font_1">Telegram</span>
          </div>
          <div class="flex-col items-center equal-division-item space-y-10">
            <img class="image_4" src="@/assets/logo.png" />
            <span class="font_1">Mix Marvel</span>
          </div>
        </div>
      </div>
      <span class="self-center font_2 text_2">
        MixMarvel申请获取你的telegram用户名、头像
      </span>
      <div class="flex-col group_3 space-y-20">
        <div
          class="flex-col justify-start items-center button"
          @click="agree()"
        >
          <span class="text_3">允许</span>
        </div>
        <div
          class="flex-col justify-start items-center button_2"
          @click="cancle"
        >
          <span class="font_2 text_4">取消</span>
        </div>
      </div>
    </div>
    <!-- 底部弹出 -->
    <van-popup v-model:show="data.showBottom" position="bottom" round>
      <div class="flex-col section_3">
        <img class="self-center image_8" src="@/assets/ok.png" />
        <span class="self-center font_2 text_3">登录成功</span>
        <div
          class="flex-col justify-start items-center button_2"
          @click="startGame"
        >
          <span class="font_2">开始游戏</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { reactive, onMounted, getCurrentInstance } from "vue";
import Service from "@/utils/service";
const router = useRouter();
const { proxy } = getCurrentInstance();
let service;
onMounted(async () => {
  service = Service.getInstance();
});
const data = reactive({
  showBottom: false,
});

const agree = async () => {
  proxy.$toast.loadingAll("Logging in");
  await service.login();
  proxy.$toast.clear();
  data.showBottom = true;
};

const cancle = () => {
  Telegram.WebApp.close();
};

const startGame = async () => {
  proxy.$toast.loadingAll("Loading");
  await service.initSmartAccount();
  await service.getUserInfo();

  proxy.$toast.clear();
  router.push("/assetsHome");
};
</script>
<style scoped lang="scss">
.page {
  background-color: #fafbff;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;

  .group {
    margin-top: 150px;
    .group_2 {
      padding: 2.5rem 0;
      .image_5 {
        width: 2.25rem;
        height: 1.63rem;
      }
      .pos {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        .equal-division-item {
          flex: 1 1 11.72rem;
          padding: 0.25rem 0;
          .image_4 {
            width: 4rem;
            height: 4rem;
          }
          .font_1 {
            font-size: 1.13rem;
            font-family: "PingFang SC";
            line-height: 1.56rem;
            font-weight: 500;
            color: #333333;
          }
        }
        .space-y-10 {
          & > *:not(:first-child) {
            margin-top: 0.63rem;
          }
        }
      }
    }
    .font_2 {
      font-size: 0.88rem;
      font-family: "PingFang SC";
      line-height: 1.25rem;
      font-weight: 500;
    }
    .text_2 {
      text-align: center;
      margin-top: 1.88rem;
      color: #333333;
    }
    .group_3 {
      margin-top: 3.75rem;
      padding: 0 1.25rem;
      .button {
        padding: 0.63rem 0;
        filter: drop-shadow(0px 0.31rem 0.34rem #0000004d);
        background: url(@/assets/certainBtn.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .text_3 {
          color: #ffffff;
          font-size: 1rem;
          font-family: "PingFang SC";
          font-weight: 500;
          line-height: 1.38rem;
        }
      }
      .button_2 {
        padding: 0.63rem 0;
        background: url(@/assets/cancelBtn.png);
        filter: drop-shadow(0.063rem 0.31rem 0.47rem #0000000d);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .text_4 {
          color: #000000;
        }
      }
    }
    .space-y-20 {
      & > *:not(:first-child) {
        margin-top: 1.25rem;
      }
    }
  }
  .section_3 {
    padding: 2.88rem 4.44rem 3.38rem 4.63rem;
    background-color: #ffffff;
    border-radius: 0.75rem 0.75rem 0px 0px;
    .image_8 {
      width: 6.25rem;
      height: 6.25rem;
    }
    .font_2 {
      font-size: 1rem;
      font-family: "PingFang SC";
      line-height: 1.38rem;
      font-weight: 500;
      color: #ffffff;
    }
    .text_3 {
      margin-top: 1rem;
      color: #333333;
    }
    .button_2 {
      margin-top: 2.25rem;
      padding: 0.56rem 0;
      background-color: #333333;
      box-shadow: 0px 0.31rem 0.69rem 0px #0000004d;
      border-radius: 1.25rem;
    }
  }
}
</style>
