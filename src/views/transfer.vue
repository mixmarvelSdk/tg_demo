<template>
  <div class="flex-col page">

    <div class="flex-col flex-auto group_2 space-y-430">
      <div class="flex-col group_3 space-y-28">
        <div class="flex-col space-y-15">
          <div class="flex-col space-y-7">
            <span class="self-start font_1">接收地址</span>
            <div class="flex-col justify-start items-start text-wrapper">
              <input
                class="font_2 text_3"
                placeholder="请输入接收地址或粘贴钱包地址"
                v-model="state.to"
              />
            </div>
          </div>
          <div class="flex-col space-y-7">
            <span class="self-start font_1">转账数量</span>
            <div class="flex-row justify-between section">
              <input
                class="self-start font_2 text_4"
                placeholder="请输入正确的转账金额"
                v-model="state.amount"
              />
              <div
                class="flex-row items-center self-center space-x-6 showSelect"
              >
                <tk-select v-model="state.inputCurrency">
                  <div class="showSelect">
                    <span class="showSelectfont">{{
                      state.inputCurrency?.symbol
                    }}</span>
                  </div>
                  <template #selectDropDown>
                    <tk-select-item
                      class="select-option li"
                      :value="item"
                      v-for="(item, index) in state.currency"
                      :key="index"
                    >
                      <img class="imgcon" :src="item.image" />
                      <span>{{ item.symbol }}</span>
                    </tk-select-item>
                  </template>
                </tk-select>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex-col justify-start items-center button"
          @click="transfer"
        >
          <span class="text_5">确认</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive, onMounted, getCurrentInstance, onUnmounted } from "vue";
import TkSelect from "@/components/select/select.vue";
import TkSelectItem from "@/components/select/select-item.vue";
import Service from "@/utils/service";
const { proxy } = getCurrentInstance();
const router = useRouter();

let servive;
onMounted(async () => {
  servive = Service.getInstance();
  state.address = servive.user.address;
  state.currency = servive.getTokenList();
  state.inputCurrency = state.currency[0];
});
onUnmounted(() => {
  service.mmtg.backButtonHide();
});
const state = reactive({
  currency: [],
  inputCurrency: null,
  to: null,
  amount: null,
});

const goBack = () => {
  router.go(-1);
};

const transfer = async () => {
  if (!state.to) {
    proxy.$toast.error("请填写收款地址");
    return;
  }
  if (!state.amount || parseFloat(state.amount) <= 0) {
    proxy.$toast.error("请输入正确的转账金额");
    return;
  }
  proxy.$toast.loadingAll("转账中");
  try {
    await servive.transferToken(
    state.inputCurrency.address,
    state.to,
    state.amount,
    state.inputCurrency.decimals
  );
  proxy.$toast.clear();
  proxy.$toast.info("转账成功");
  } catch (error) {
    proxy.$toast.clear();
    proxy.$toast.error("转账失败");
    console.log(error.message);
  }



};
</script>

<style scoped lang="scss">
.select-option {
  .imgcon {
    width: 34px;
    border-radius: 50%;
    margin-right: 4px;
  }
  .showSelectfont {
    text-align: right;
  }
}
.page {
  background: #fafbff;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
  input {
    flex: 1;
    height: 100%;
    border: 0;
    outline: 0;
    background: transparent;
  }
  .text-wrapper {
    width: 100%;
    display: flex;
  }
  .header {
    padding: 1rem 0.94rem 0.63rem;

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
    padding-top: 1rem;
    overflow-y: auto;
    .group_3 {
      padding: 0 0.94rem;
      .space-y-15 {
        & > *:not(:first-child) {
          margin-top: 0.94rem;
        }
        .space-y-7 {
          & > *:not(:first-child) {
            margin-top: 0.44rem;
          }
          .font_1 {
            font-size: 0.88rem;
            font-family: "PingFang SC";
            line-height: 1.25rem;
            font-weight: 500;
            color: #333333;
          }
          .text-wrapper {
            padding: 1rem 0;
            background-color: #8f92a114;
            border-radius: 0.63rem;
            .text_3 {
              width: 100%;
              margin-left: 0.94rem;
            }
          }
          .section {
            padding: 0.94rem 0.94rem 0.94rem;
            background-color: #8f92a114;
            border-radius: 0.63rem;

            .space-x-6 {
              & > *:not(:first-child) {
                margin-left: 0.38rem;
              }
              .image_5 {
                margin-bottom: 2px;
                width: 0.38rem;
                height: 0.69rem;
              }
            }
          }
          .font_2 {
            font-size: 0.75rem;
            font-family: "PingFang SC";
            line-height: 1.06rem;
            font-weight: 500;
            color: #8f92a1;
          }
        }
      }

      .button {
        cursor: pointer;
        margin-top: 1.7rem;
        padding: 0.75rem 0;
        background-color: #333333;
        border-radius: 1.38rem;
        .text_5 {
          color: #fefefe;
          font-size: 1rem;
          font-family: "PingFang SC";
          font-weight: 500;
          line-height: 1.38rem;
        }
      }
    }
    .image_6 {
      width: 23.44rem;
      height: 2.13rem;
    }
  }
}
</style>
