<!--
 * @Author: coco-Tang
 * @Date: 2019-08-29 13:57:45
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-09-11 17:30:30
 * @Description: 订单
 -->
<template>
  <div class="order">
    <van-tabs v-model="activeOrder">
      <van-tab title="预约上门服务" name="homeService">预约上门服务</van-tab>
      <van-tab title="预约门店修理" name="storeService">
        <div class="wrap">
          <!-- class="van-hairline--bottom" -->
          <div
            style="display:flex;justify-content:space-between;align-items:center;padding: 0 10px;"
          >
            <div style="text-align:center;">
              <h3>
                你已选择
                <span style="color:#ee0a24">{{ activeIds.length }}</span>
                个服务
              </h3>
              <div>({{serviceItem.length ? serviceItem.join("、") : "无"}})</div>
            </div>

            <van-button type="danger" @click="show = true;">服务选择</van-button>
          </div>
          <hr />
          <div class="form-info">
            <h3>请填写以下资料</h3>
            <van-cell-group>
              <van-field v-model="applicant" label="申请人姓名" placeholder="请输入姓名" />
              <van-field v-model="phoneNumber" label="申请人手机号" placeholder="请输入手机号" />
              <!-- v-model="reserveTime" -->
              <van-field label="预约服务时间" placeholder="请选择时间" @focus="timeShow = true" />
              <!-- <van-field
                v-model="remark"
                label="备注"
                type="textarea"
                placeholder="请输入留言"
                rows="1"
                autosize
              />-->
            </van-cell-group>
          </div>
        </div>

        <van-dialog v-model="show" title="选择服务" show-cancel-button>
          <van-tree-select
            :items="items"
            :active-id.sync="activeIds"
            :main-active-index.sync="activeIndex"
          />
        </van-dialog>

        <van-action-sheet v-model="timeShow">
          <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="getReserveTime"
          />
        </van-action-sheet>
      </van-tab>
      <van-tab title="查询门店" name="storeInquire">内容 3</van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { login } from "@/service/login";
import { Dialog } from "vant";

@Component({
  components: {
    [Dialog.Component.name]: Dialog.Component
  }
})
export default class Home extends Vue {
  private show: Boolean = false;
  private timeShow: Boolean = false;
  private activeOrder: String = "storeService";
  private items: any[] = [
    {
      // 导航名称
      text: "养护",
      // 导航名称右上角徽标
      // info: 3,
      // 该导航下所有的可选项
      children: [
        {
          // 名称
          text: "洗车",
          // id，作为匹配选中状态的标识
          id: 1
          // 禁用选项
          // disabled: true
        },
        {
          text: "贴膜",
          id: 2
        }
      ]
    },
    {
      // 导航名称
      text: "修理",
      // 导航名称右上角徽标
      info: 3,
      // 该导航下所有的可选项
      children: [
        {
          // 名称
          text: "发动机",
          // id，作为匹配选中状态的标识
          id: 3
          // 禁用选项
          // disabled: true
        },
        {
          text: "轮胎",
          id: 4
        }
      ]
    }
  ];
  private activeIds: Number[] = [1];
  private activeIndex: Number = 0;
  private applicant: String = "";
  private phoneNumber: Number = 132;
  private reserveTime: Number = 0;
  private minHour: Number = 10;
  private maxHour: Number = 20;
  private minDate: Date = new Date();
  private maxDate: Date = this.getMaxDate();
  private currentDate: any = {};

  get serviceItem() {
    let serviceName = this.items
      .map(item => item.children)
      .flat(2)
      .filter(s => {
        return this.activeIds.includes(s.id);
      })
      .map(item => {
        return item.text;
      });
    return serviceName;
  }

  // get maxDate() {
  //   let myDate = this.minDate;
  //   // console.log(myDate);
  //   myDate.setDate(myDate.getDate() + 31);
  //   // console.log(myDate);
  //   return myDate;
  // }

  private getReserveTime(): void {
    console.log("getReserveTime", this.maxDate, this.currentDate);
  }
  private reservationSubmit(): void {}
  private dialogClose(): void {
    this.show = false;
    this.activeIds = [];
  }
  private serviceItemSubmit(): void {
    // console.log(this.activeIds);
    // this.dialogClose();
  }
  private getMaxDate(): Date {
    let myDate = new Date();
    // console.log(myDate);
    myDate.setDate(myDate.getDate() + 31);
    // console.log(myDate);
    return myDate;
  }
}
</script>
<style lang="less" scoped>
.order {
  .wrap {
    padding: 0 10px;
  }
}
</style>