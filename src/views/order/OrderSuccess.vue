<!--
 * @Author: coco-Tang
 * @Date: 2019-09-18 17:12:56
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-12-11 10:19:33
 * @Description: 
 -->
<template>
  <div class="order-success">
    <h1 class="success-title">预约成功</h1>
    <div class="wrap">
      <div
        class="service-item"
      >洗车{{ orderInfo.serviceItem ? orderInfo.serviceItem.map(item => {return item.name}).join("、") : "" }}</div>
      <hr />
      <div>预约订单单号：{{ orderInfo.orderId }}</div>
      <hr />
      <div>提交人：{{orderInfo.customerName}}</div>
      <hr />
      <div>申请人手机号：{{orderInfo.customerTel}}</div>
      <hr />
      <div>服务地址：{{orderInfo.address}}</div>
      <hr />
      <div>预计服务时间：{{orderInfo.time}}</div>
      <hr />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { login } from "@/services/login";
import { Dialog } from "vant";
import { dateformat } from "@/utils/global";

@Component
export default class Home extends Vue {
  private orderInfo: any = {};
}
</script>
<style lang="less" scoped>
@themeColor: #f44;
.order-success {
  .success-title {
    color: @themeColor;
    text-align: center;
  }
  .wrap {
    padding: 0 10px 10px;
    > div {
      height: 40px;
      line-height: 40px;
      // margin-bottom: 20px;
    }
    .service-item {
      min-height: 40px;
      color: purple;
    }
  }
}
</style>