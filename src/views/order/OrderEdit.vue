<!--
 * @Author: coco-Tang
 * @Date: 2019-08-29 13:57:45
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-09-23 11:10:18
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
              <van-field
                v-model="applicant"
                label="申请人姓名"
                placeholder="请输入姓名"
                @blur="applicantValidate"
                :error-message="applicantErrorMessage"
              />
              <van-field
                v-model="phoneNumber"
                label="申请人手机号"
                placeholder="请输入手机号"
                @blur="phoneNumberValidate"
                :error-message="phoneNumberErrorMessage"
              />
              <!-- v-model="reserveTime" -->
              <van-field
                label="预约服务时间"
                placeholder="请选择时间"
                v-model="selectedDate"
                @focus="timeShow = true"
              />
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
            @confirm="reservationSubmit"
            @cancel="timePickerCancel"
          />
        </van-action-sheet>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { login } from "@/service/login";
import { Dialog } from "vant";
import { dateformat } from "@/utils/global";
// import Amap from "../../components/Amap.vue";

@Component({
  components: {
    [Dialog.Component.name]: Dialog.Component
  }
})
export default class Home extends Vue {
  private show: Boolean = false;
  private timeShow: Boolean = false;
  private activeOrder: string = "storeService";
  private applicantErrorMessage: string = "";
  private phoneNumberErrorMessage: string = "";
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
  private applicant: string = "";
  private phoneNumber: string = "";
  private reserveTime: Number = 0;
  private minHour: Number = 10;
  private maxHour: Number = 20;
  private minDate: Date = new Date();
  private maxDate: Date = this.getMaxDate();
  private currentDate: any = {};
  addressInfo: any = {};

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

  get selectedDate() {
    if (this.currentDate instanceof Date) {
      return dateformat(this.currentDate);
    }
    let begin_date = new Date();
    let end_date = new Date();
    begin_date.setTime(end_date.getTime() + 1 * 24 * 60 * 60 * 1000);
    return dateformat(begin_date);
  }

  private applicantValidate(): void {
    if (!this.applicant) {
      this.applicantErrorMessage = "申请人名称不能为空";
    } else {
      this.applicantErrorMessage = "";
    }
  }

  private phoneNumberValidate(): void {
    const phoneNumber = this.phoneNumber;
    if (!phoneNumber) {
      this.phoneNumberErrorMessage = "申请人手机号不能为空";
    } else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNumber)) {
      this.phoneNumberErrorMessage = "输入手机号格式不对";
    } else {
      this.phoneNumberErrorMessage = "";
    }
  }

  private reservationSubmit(): void {
    this.applicantValidate();
    this.phoneNumberValidate();
    this.timeShow = false;
    this.$router.push({ name: "ordersuccess" });
    // console.log("getReserveTime", this.maxDate, this.currentDate);
  }
  private timePickerCancel(): void {
    this.timeShow = false;
  }
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
    myDate.setDate(myDate.getDate() + 31);
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