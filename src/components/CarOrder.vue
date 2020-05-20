<template>
  <div>
    <van-cell-group>
      <van-field
        v-model="carOrderOptions.carNum"
        label="车牌号"
        placeholder="请输入车牌号"
        @blur="applicantValidate"
        :error-message="carNumErrorMessage"
      />
      <van-field
        v-model="carOrderOptions.applicant"
        label="车主姓名"
        placeholder="请输入姓名"
        @blur="applicantValidate"
        :error-message="applicantErrorMessage"
      />
      <van-field
        v-model="carOrderOptions.phoneNumber"
        label="车主手机号"
        placeholder="请输入手机号"
        @blur="phoneNumberValidate"
        :error-message="phoneNumberErrorMessage"
      />
      <van-field
        v-model="carOrderOptions.orderAmount"
        label="金额"
        placeholder="请输入金额"
        @blur="orderAmountValidate"
        :error-message="orderAmountErrorMessage"
      />
      <van-field
        label="修理时间"
        placeholder="请选择时间"
        v-model="carOrderOptions.repairDate"
      />
        <!-- @focus="timeShow = true" -->
    </van-cell-group>
    <van-action-sheet v-model="timeShow">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-action-sheet>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class CarOrder extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  @Prop({
    type: Object,
    default: () => {
      return {
        id: "",
        carNum: "",
        applicant: "",
        phoneNumber: "",
        orderAmount: "",
        repairDate: ""
      };
    }
  })
  options: any;
  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */
  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  private mounted() {
    console.log('mounted',this.options);
  }
  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private timeShow: Boolean = false;
  private currentDate: any = {};
  private carOrderOptions: any = this.options;

  private carNumErrorMessage: string = "";
  private applicantErrorMessage: string = "";
  private phoneNumberErrorMessage: string = "";
  private orderAmountErrorMessage: string = "";

  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  private applicantValidate(): void {
    if (!this.carOrderOptions.applicant) {
      this.applicantErrorMessage = "车主名称不能为空";
    } else {
      this.applicantErrorMessage = "";
    }
  }

  private phoneNumberValidate(): void {
    const phoneNumber = this.carOrderOptions.phoneNumber;
    if (!phoneNumber) {
      this.phoneNumberErrorMessage = "车主手机号不能为空";
    } else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNumber)) {
      this.phoneNumberErrorMessage = "输入手机号格式不对";
    } else {
      this.phoneNumberErrorMessage = "";
    }
  }

  private orderAmountValidate(): void {
    const orderAmount = this.carOrderOptions.orderAmount;
    if (/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(orderAmount + "")) {
      this.orderAmountErrorMessage = "输入金额格式不对";
    } else {
      this.orderAmountErrorMessage = "";
    }
  }

  confirm() {
    this.carOrderOptions.repairDate = this.currentDate;
  }

  cancel() {

  }

  submit() {
    console.log("submit", this.carOrderOptions);
  }
}
</script>