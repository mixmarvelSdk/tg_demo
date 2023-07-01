<template>
  <div class="flex-col page">
    <!-- <div class="flex-col header space-y-24">
      <div class="flex-row justify-center items-center relative" style="cursor:pointer">
        <img @click="goBack" class="image_4 pos" src="@/assets/back.png" />
        <span class="text_2">接收代币</span>
      </div>
    </div> -->
    <div class="flex-col justify-start flex-auto group_2">
      <div class="flex-col section space-y-26">
        <span class="font_1 text_3">仅向该地址转入Rangers网络资产</span>
        <div class="flex-col justify-start items-center relative group_3">
          <img class="image_6" src="@/assets/Shape.png" />
          <img class="image_5 pos_2" :src="state.qrCode" />
        </div>
        <div class="flex-col">
          <div class="flex-col self-center group_4 space-y-6">
            <span class="font_1 text_4">扫描二维码向我转入代币</span>
            <span class="font_1 text_5">
              {{ state.address }}
            </span>
          </div>
          <div
            class="flex-col justify-start items-center button"
            @click="copyAddress"
          >
            <span class="font_1 text_6">复制地址</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive, onMounted, getCurrentInstance, onUnmounted } from "vue";
import Service from "@/utils/service";
import useClipboard from "vue-clipboard3";
const router = useRouter();
const { proxy } = getCurrentInstance();
const { toClipboard } = useClipboard();
let service;
onMounted(async () => {
  service = Service.getInstance();
  state.address = service.user.address;
  state.qrCode = await service.getQrcode();
});

onUnmounted(() => {
  service.mmtg.backButtonHide();
});
const goBack = () => {
  router.go(-1);
};
const state = reactive({
  address: null,
  qrCode: null,
});

const copyAddress = async () => {
  await toClipboard(state.address).then(() => {
    proxy.$toast.success("copy success");
  });
};
</script>

<style scoped lang="scss">
.page {
  background-color: #fafbff;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  .header {
    padding: 1rem 0.94rem 0.5rem;
    height: 5.81rem;

    .image_4 {
      width: 1.5rem;
      height: 1.5rem;
    }
    .pos {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    .text_2 {
      color: #333333;
      font-size: 1.13rem;
      font-family: "PingFang SC";
      font-weight: 600;
      line-height: 1.56rem;
    }
  }
  .space-y-24 {
    & > *:not(:first-child) {
      margin-top: 1.5rem;
    }
  }
  .group_2 {
    // padding: 4.38rem 0 10.19rem;
    overflow-y: auto;
    .section {
      margin: 0 1.56rem;
      padding: 1rem 3rem;
      background-color: #ffffff;
      border-radius: 0.63rem;
      .font_1 {
        font-size: 0.88rem;
        font-family: "PingFang SC";
        line-height: 1.25rem;
        font-weight: 600;
        color: #333333;
      }
      .text_3 {
        text-align: center;
        margin-left: 0.75rem;
      }
      .group_3 {
        margin: auto;
        width: 14.31rem;
        // background: red;
        padding: 1.25rem 0;
        .image_6 {
          width: 11.88rem;
          height: 11.88rem;
        }
        .image_5 {
          width: 14.31rem;
          height: 14.31rem;
        }
        .pos_2 {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
        }
      }
      .group_4 {
        padding-bottom: 1.13rem;
        // width: 10.81rem;
        .text_4 {
          text-align: center;
          margin-left: 0.44rem;
        }
        .text_5 {
          color: #8f92a1;
          line-height: 1.13rem;
          text-align: center;
          word-break: break-all;
        }
      }
      .space-y-6 {
        & > *:not(:first-child) {
          margin-top: 0.38rem;
        }
      }
      .button {
        cursor: pointer;
        padding: 0.63rem 0;
        background-color: #333333;
        border-radius: 1.25rem;
        .text_6 {
          color: #ffffff;
          font-weight: 500;
        }
      }
    }
    .space-y-26 {
      & > *:not(:first-child) {
        margin-top: 1.63rem;
      }
    }
  }
}
</style>
