<!--
 * @Author: coco-Tang
 * @Date: 2019-08-29 13:57:45
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-12-11 17:24:45
 * @Description: 订单
 -->
<template>
  <div class="order">
    <div class="wrap">
      <h3>选择服务</h3>
      <!-- <span style="color:tomato;font-size:12px;">{{serviceItemErrorMessage}}</span> -->
      <van-checkbox-group v-model="result">
        <van-cell-group>
          <van-cell v-for="(item) in items" :key="item.value" :title="item.label">
            <template #right-icon>
              <van-checkbox :name="item.label" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <van-field v-model="remark" v-show="isOtherChecked" placeholder="请填写不包含以上列举服务的情况" />
      <hr />

      <div class="form-info">
        <h3>填写资料</h3>
        <div>
          <span class="carnum-wrap">车牌号</span>
          <div class="__vcp-panel">
            <!--输入框Start-->
            <div class="__vcp-number-box">
              <ul>
                <li
                  v-for="i in nums"
                  :key="i"
                  @click="active(i)"
                  :class="{
                        active: activeIndex === i, 
                        'split-line': i == 0 || (i > 1 && i < 6) || (i == 6 && (activeIndex == 7 || val.length == 8)),
                        'last-blank-key': i == 7 && val.length < 8 && activeIndex < 7
                    }"
                >
                  <span v-bind:style="{backgroundColor: activeColor}"></span>
                  {{val[i]}}
                </li>
              </ul>
            </div>
            <!--键盘Start-->
            <div class="__vcp-keyboard-panel" :class="{hide: activeIndex == -1}">
              <div class="__vcp-keyboard-panel-bar">
                <a class="close-board-btn" @click="close" v-bind:style="{color: activeColor}">确定</a>
              </div>
              <ul>
                <li v-for="k in keys" :key="k">
                  <a @click="taped($event)">{{k}}</a>
                </li>
              </ul>
              <div
                class="__vcp-keyboard-del-btn"
                @click="delback"
                v-bind:style="{backgroundColor: activeColor}"
              >
                <span></span>
                <a v-bind:style="{color: activeColor}">×</a>
              </div>
            </div>
          </div>
        </div>

        <van-cell-group>
          <van-field
            v-model="applicant"
            label="车主姓名"
            placeholder="请输入姓名"
            @blur="applicantValidate"
            :error-message="applicantErrorMessage"
          />
          <van-field
            v-model="phoneNumber"
            label="车主手机号"
            placeholder="请输入手机号"
            @blur="phoneNumberValidate"
            :error-message="phoneNumberErrorMessage"
          />
          <van-field
            v-model="orderAmount"
            label="金额"
            placeholder="请输入金额"
            @blur="orderAmountValidate"
            :error-message="orderAmountErrorMessage"
          />
          <van-field
            label="修理时间"
            placeholder="请选择时间"
            :min-date="minDate"
            :max-date="maxDate"
            v-model="selectedDate"
            @focus="timeShow = true"
          />
          <van-button type="info" style="margin:10px;" size="small" @click="reservationSubmit">确认下单</van-button>
        </van-cell-group>
      </div>
    </div>

    <van-action-sheet v-model="timeShow">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @cancel="timePickerCancel"
        @confirm="confirm"
      />
    </van-action-sheet>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import orderServices from "@/services/order";
import { Dialog, Checkbox, CheckboxGroup } from "vant";
import { dateformat } from "@/utils/global";
// import Amap from "../../components/Amap.vue";
// import "./MixedKeyboard";
import CarOrder from "@/components/CarOrder.vue";
const COLUMNS = 10;
const KEY_SPACE = 4;
const PROVINCE = [
  "京",
  "沪",
  "津",
  "渝",
  "冀",
  "晋",
  "蒙",
  "辽",
  "吉",
  "黑",
  "苏",
  "浙",
  "皖",
  "闽",
  "赣",
  "鲁",
  "豫",
  "鄂",
  "湘",
  "粤",
  "桂",
  "琼",
  "川",
  "贵",
  "云",
  "藏",
  "陕",
  "甘",
  "青",
  "宁",
  "新"
];
// 字母，去掉了车牌里不会出现的I、O
const ALPHABET = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "M",
  "N",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];
const NUMBER = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const SPECIAL_SUFFIX = ["港", "澳", "学", "警"];
@Component({
  components: {
    [Dialog.Component.name]: Dialog.Component,
    "car-order": CarOrder
  }
})
export default class Home extends Vue {
  // 当前激活输入框的索引，从0开始
  activeIndex: number = -1;
  nums: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  activeColor: string = "#1a84e7";
  val: string = "";
  // 键盘类型province,alphabet,num_alph,mixed
  get keyBoardType() {
    if (this.activeIndex === 0) {
      return "province";
    }
    if (this.activeIndex === 1) {
      return "alphabet";
    }
    if (
      this.activeIndex === 7 ||
      (this.activeIndex === 6 && this.val.length < 8)
    ) {
      return "mixed";
    }
    return "num_alph";
  }
  // 按键
  get keys() {
    if (this.keyBoardType === "province") {
      return PROVINCE;
    }
    if (this.keyBoardType === "alphabet") {
      return ALPHABET;
    }
    if (this.keyBoardType === "num_alph") {
      return NUMBER.concat(ALPHABET);
    }
    if (this.keyBoardType === "mixed") {
      return NUMBER.concat(ALPHABET, SPECIAL_SUFFIX);
    }
  }

  // 激活其中某个输入框
  active(i: number) {
    // 点击的框前面有空白时不响应
    if (i > this.val.length) return false;
    this.activeIndex = i;
  }

  // 点击某个按键
  taped(e: any) {
    e.target.style.cssText = `color: #ffffff; font-size: 20px; font-weight: bold; background-color: #1a84e7`;
    setTimeout(() => {
      e.target.style.cssText = `color: #000000; font-size: 16px; font-weight: normal; background-color: #ffffff`;
    }, 100);
    const key = e.target.text;
    this.val = this.nums.reduce((res, v) => {
      res += v == this.activeIndex ? key : this.val[v] || "";
      return res;
    }, "");
    this.activeIndex = this.activeIndex < 7 ? this.activeIndex + 1 : -1;
  }

  // 回删
  delback() {
    this.val = this.nums.reduce((res, v) => {
      res += v >= this.activeIndex ? "" : this.val[v] || "";
      return res;
    }, "");
    this.activeIndex = this.activeIndex > 0 ? this.activeIndex - 1 : 0;
  }

  // 点击确定按钮
  close() {
    this.activeIndex = -1;
  }
  private carOptions: any = {};
  private show: Boolean = false;
  private timeShow: Boolean = false;
  private applicantErrorMessage: string = "";
  private phoneNumberErrorMessage: string = "";
  private orderAmountErrorMessage: string = "";
  private serviceItemErrorMessage: string = "";
  private result: [] = [];
  private items: any[] = [
    {
      label: "洗车",
      value: 1
    },
    {
      label: "贴膜",
      value: 2
    },
    {
      label: "补胎",
      value: 3
    },
    {
      label: "修发动机",
      value: 4
    },
    {
      label: "其他",
      value: 5
    }
  ];
  private remark: string = "";
  private isOtherChecked: Boolean = false;
  // private activeIndex: Number = 0;
  private carNum: string = "";
  private applicant: string = "";
  private phoneNumber: string = "";
  private orderAmount: number = 0;
  private currentDate: any = {};
  private minDate: Date = new Date();
  private maxDate: Date = this.getMaxDate();
  addressInfo: any = {};

  get selectedDate() {
    if (this.currentDate instanceof Date) {
      return dateformat(this.currentDate);
    }
    let begin_date = new Date();
    let end_date = new Date();
    begin_date.setTime(end_date.getTime() + 1 * 24 * 60 * 60 * 1000);
    return dateformat(begin_date);
  }

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  @Watch("result")
  getResult(newValue: any) {
    if (newValue.includes("其他")) {
      this.isOtherChecked = true;
    } else {
      this.isOtherChecked = false;
    }
  }

  private applicantValidate() {
    if (!this.applicant) {
      this.applicantErrorMessage = "车主名称不能为空";
      return false;
    } else {
      this.applicantErrorMessage = "";
      return true;
    }
  }

  private phoneNumberValidate() {
    const phoneNumber = this.phoneNumber;
    if (!phoneNumber) {
      this.phoneNumberErrorMessage = "车主手机号不能为空";
      return false;
    } else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNumber)) {
      this.phoneNumberErrorMessage = "输入手机号格式不对";
      return false;
    } else {
      this.phoneNumberErrorMessage = "";
      return true;
    }
  }

  private orderAmountValidate() {
    const orderAmount = this.orderAmount;
    if (/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(orderAmount + "")) {
      this.orderAmountErrorMessage = "输入金额格式不对";
      return false;
    } else {
      this.orderAmountErrorMessage = "";
      return true;
    }
  }

  private carNumValidate() {
    return this.val;
  }

  private serviceItemValidate() {
    if (!this.result.length) {
      this.serviceItemErrorMessage = "服务项目不能为空";
      return false;
    } else {
      this.serviceItemErrorMessage = "";
      return true;
    }
  }

  confirm() {
    this.timeShow = false;
  }

  cancel() {
    this.timeShow = false;
  }

  private async reservationSubmit() {
    if (
      !this.applicantValidate() ||
      !this.phoneNumberValidate() ||
      !this.orderAmountValidate()
    ) {
      this.$toast("请按规定填写");
      return;
    }

    if (!this.serviceItemValidate()) {
      this.$toast("请勾选服务项目");
      return;
    }

    if (!this.carNumValidate()) {
      this.$toast("请填写车牌号");
      return;
    }

    const params = {
      carNo: this.val,
      // carBrand,
      // carType,
      repairTime: this.selectedDate,
      orderAmount: this.orderAmount,
      carOwner: this.applicant,
      carOwnerTel: this.phoneNumber,
      serviceContent: this.isOtherChecked
        ? this.result.filter(item => item !== "其他").join(",") +
          "," +
          this.remark
        : this.result.join(",")
    };
    const { code } = await orderServices.order_create(params);

    if (code === "0") {
      this.$router.push({ name: "ordersuccess" });
    }
  }

  private timePickerCancel(): void {
    this.timeShow = false;
  }

  toggle(index: any) {
    const checkboxes = this.$refs.checkboxes as [];
    // console.log(index)
    // console.log(this.$refs.checkboxes[index])
    // this.$refs.checkboxes[index].toggle();
    // console.log(this.result);
  }

  private getMaxDate(): Date {
    let myDate = new Date();
    myDate.setDate(myDate.getDate() + 31);
    return myDate;
  }
}
</script>
<style lang="less" scoped>
.carnum-wrap {
  font-size: 14px;
  padding-left: 20px;
}
/*输入框样式*/
.__vcp-number-box {
  font-size: 12px;
  background: transparent;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
}
.__vcp-number-box ul {
  width: 100%;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: stretch;
  padding: 0;
  height: 40px;
}
.__vcp-number-box ul > li {
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  flex: 1 2 30px;
  margin-right: 0;
  text-align: center;
  font-size: 16px;
  line-height: 40px;
  position: relative;
}
.__vcp-number-box ul > li:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-left: 1px solid #cccccc;
}
.__vcp-number-box ul > li.split-line::after {
  content: "";
  position: absolute;
  height: 80%;
  width: 1px;
  right: 0;
  background-color: #cccccc;
  top: 10%;
}
.__vcp-number-box ul > li:nth-child(2) {
  margin-right: 8px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-right: 1px solid #cccccc;
}
.__vcp-number-box ul > li:nth-child(3) {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-left: 1px solid #cccccc;
}

.__vcp-number-box ul > li > span {
  display: none;
}
.__vcp-number-box ul > li.active > span {
  display: block;
  height: 2px;
  width: 60%;
  position: absolute;
  background-color: #1a84e7;
  left: 20%;
  bottom: 3px;
}

/*最后一个特殊按键[新能源]*/
.__vcp-number-box ul > li.last-blank-key {
  background-color: #cccccc;
}
.__vcp-number-box ul > li.last-blank-key::after {
  content: "+";
  width: 100%;
  height: 100%;
  background-color: #cccccc;
  text-align: center;
  color: #aaaaaa;
  font-size: 24px;
  font-weight: 100;
  left: 0;
  top: 0;
}
.__vcp-number-box ul > li:last-child {
  margin-right: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-right: 1px solid #cccccc;
}
.__vcp-number-box ul > li:last-child.active {
  background-color: inherit;
}
.__vcp-number-box ul > li:last-child.active::after {
  display: none;
}

/* 键盘样式 */
.__vcp-keyboard-panel {
  width: 100%;
  background: #e5e5e5;
  position: fixed;
  left: 0;
  z-index: 100;
  padding: 4px 0 0 0;
  visibility: visible;
  bottom: 0;
  box-shadow: 1px -5px 10px #cccccc;
}
.__vcp-keyboard-panel.hide {
  bottom: -500px;
}
.__vcp-keyboard-panel-bar {
  height: 35px;
  width: 100%;
  background-color: #ffffff;
  position: absolute;
  left: 0;
  top: 0;
}
.__vcp-keyboard-panel-bar .close-board-btn {
  height: 100%;
  padding: 0 10px;
  line-height: 35px;
  display: inline-block;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 16px;
  color: #1a84e7;
}
.__vcp-keyboard-panel > ul {
  padding: 35px 0 0 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
}
.__vcp-keyboard-panel > ul > li {
  text-align: center;
  border: none;
  background: transparent;
  height: 30px;
  margin: 0 0 4px 0;
  line-height: 30px;
  flex: 0 1 10%;
}
.__vcp-keyboard-panel > ul > li a {
  font-size: 16px;
  display: block;
  margin: 0 3px 0 0;
  border-radius: 4px;
  background: #ffffff;
}
.__vcp-keyboard-panel > ul > li:nth-child(10n) a {
  margin-right: 0;
}
.__vcp-keyboard-del-btn {
  width: 20%;
  height: 30px;
  line-height: 30px;
  position: absolute;
  bottom: 4px;
  right: 0;
  text-align: center;
  border-radius: 4px;
  color: #ffffff;
  background-color: #1a84e7;
}
.__vcp-keyboard-del-btn span {
  height: 20px;
  width: 40px;
  position: absolute;
  display: block;
  text-align: center;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
}
.__vcp-keyboard-del-btn:active {
  opacity: 0.8;
}

.__vcp-keyboard-del-btn span::before {
  content: "";
  width: 0;
  height: 0;
  display: block;
  position: absolute;
  left: -5px;
  border-style: solid;
  border-width: 10px;
  border-color: transparent #ffffff transparent transparent;
}
.__vcp-keyboard-del-btn span::after {
  content: "";
  width: 25px;
  height: 100%;
  background-color: #ffffff;
  display: block;
  position: absolute;
  right: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.__vcp-keyboard-del-btn a {
  position: absolute;
  z-index: 1;
  font-size: 18px;
  margin-left: 2%;
  color: #1a84e7;
}
.order {
  .wrap {
    padding: 0 10px;
  }
}
#container {
  height: 100%;
  width: 100%;
}
.map-container {
  width: 100%;
  overflow: scroll;
  height: 100%;
  z-index: 10;
  overflow: hidden;

  .map-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.2rem;
    padding-bottom: 0;
    background-color: #ededed;
    height: 2.5rem;

    .map-title {
      font-size: 0.4rem;
      height: 0.7rem;
      font-weight: bold;
    }

    .confirm-btn {
      background-color: #57be69;
      color: #fff;
      // padding: 0.1rem 0.2rem;
      border-radius: 4px;
      // font-size: 0.377rem;
    }

    .cancel-btn {
      // font-size: 0.377rem;
      // padding: 0.1rem 0.2rem;
      border-radius: 4px;
    }
  }
}
</style>