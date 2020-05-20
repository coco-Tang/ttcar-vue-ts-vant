<!--
 * @Author: coco-Tang
 * @Date: 2019-08-29 09:22:16
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-12-11 10:18:39
 * @Description: 主页
 -->
<template>
  <div class="home">
    <van-sticky :offset-top="50">
      <div class="search">
        <form action="/">
          <van-search
            v-model="searchVal"
            placeholder="请输入车牌号"
            show-action
            @search="onSearch"
            @cancel="onCancel"
          />
        </form>
      </div>
    </van-sticky>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :offset="10"
      @load="onLoad"
    >
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      <!-- 面板形式展示 -->
      <van-panel
        title
        :desc="'订单号 '+ service.orderId+''"
        v-for="service in serviceList"
        :key="service.id"
      >
        <!-- @click="goDetail(service)" -->
        <!-- @touchstart="touchstart" -->
        <!-- @touchend="touchend(service.id)" -->
        <!-- :status="service.status ? '已完成' : '待处理'" -->
        <div class="service">
          <!-- <div type="ticket" class="--flex-column">
          <div class="top --flex-column">
            <div class="bandname -bold">Ghost Mice</div>
            <div class="tourname">Home Tour</div>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/199011/concert.png" alt />
            <div class="deetz --flex-row-j!sb">
              <div class="event --flex-column">
                <div class="date">3rd March 2017</div>
                <div class="location -bold">Bloomington, Indiana</div>
              </div>
              <div class="price --flex-column">
                <div class="label">Price</div>
                <div class="cost -bold">$30</div>
              </div>
            </div>
          </div>

          <div class="rip"></div>

          <div class="bottom --flex-row-j!sb">
            <div class="barcode"></div>
            <a class="buy" href="#">BUY TICKET</a>
          </div>
          </div>-->
          <div class="list">
            <p style="display:flex;">
              <span>车牌号：</span>
              <span class="car-number">{{service.carNo}}</span>
            </p>
            <p>
              <span>服务项目：</span>
              <span class="car-service">{{service.serviceItem}}</span>
            </p>
            <p>维修时间：{{service.finishedTime}}</p>
            <p>金额：¥{{service.amount}}</p>
            <p>
              姓名：
              <span>{{service.carOwner}}</span>
              <!-- <span class="phone" @click="call">（{{service.carTel}}）</span> -->
            </p>
            <p>
              联系方式:
              <span class="phone">{{service.carTel}}</span>
            </p>
            <p>
              <van-button size="small" type="info" @click="goEdit(service.id)">修改</van-button>
            </p>
          </div>
        </div>
      </van-panel>
    </van-list>

    <!-- <div class="list">
      <div v-if="no_data" style="text-align:center;">暂无数据</div>
    </div>-->

    <van-popup v-model="showDelete">删除</van-popup>
    <!-- <van-popup v-model="showDetail">
      
    </van-popup>-->
    <van-dialog
      v-model="showDetail"
      title="修改订单"
      show-confirm-button
      show-cancel-button
      @confirm="confirm"
      @cancel="cancel"
    >
      <!-- <car-order :options="carOptions"></car-order> -->
      <van-cell-group>
        <van-field
          v-model="carNum"
          label="车牌号"
          placeholder="请输入车牌号"
          @blur="applicantValidate"
          :error-message="carNumErrorMessage"
        />
        <van-field
          v-model="orderAmount"
          label="金额"
          placeholder="请输入金额"
          @blur="orderAmountValidate"
          :error-message="orderAmountErrorMessage"
        />
        <van-field v-model="serviceItem" label=" 服务项目" placeholder="请输入服务项目" />
        <van-field label="修理时间" placeholder="请选择时间" v-model="repairDate" @focus="timeShow = true" />
      </van-cell-group>
    </van-dialog>

    <van-action-sheet v-model="timeShow">
      <van-datetime-picker
        type="date"
        @cancel="timePickerCancel"
        @confirm="timePickerConfirm"
      />
    </van-action-sheet>

    <!-- 列表形式展示 -->
    <!-- <van-list
      :finished="finished"
      :finished-text="finishedText"
      v-model="loading"
      :offset="10"
      :immediate-check="false"
      @load="getserviceList"
    >
      <van-row>
        <van-col>车牌号</van-col>
        <van-col>服务项目</van-col>
        <van-col>服务时间</van-col>
        <van-col></van-col>
      </van-row>
      <van-row>
        <van-col
          span="12"
          class="pic-box"
          v-for="(serve) in serviceList"
          :key="serve.id"
          @click="router(serve)"
        >
          <div class="pic-item">
            <img
              v-if="serve.picturePath"
              :src="$BASE_PICTUREPATH_URL + serve.picturePath.split(',')[0]"
            />
          </div>
          <p>{{serve.name}}</p>
          <p class="price-red">¥{{serve.price}}</p>
        </van-col>
      </van-row>
    </van-list>-->
    <!-- <van-swipe :autoplay="3000" style="height:100%">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import orderServices from "@/services/order";
import { SERVICE_ITEM_LABEL } from "@/constant";
import CarOrder from "@/components/CarOrder.vue";
import { dateformat } from "@/utils/global";
import { Toast } from "vant";
@Component({
  name: "home",
  components: {
    "car-order": CarOrder
  }
})
export default class Home extends Vue {
  timePickerConfirm(time:any) {
    this.repairDate = dateformat(time);
    this.timeShow = false;
  }
  timePickerCancel() {
    this.timeShow = false;
  }

  private timeShow: Boolean = false;
  private images: string[] = [
    "https://img.yzcdn.cn/vant/apple-1.jpg",
    "https://img.yzcdn.cn/vant/apple-2.jpg"
  ];
  count: number = 0;
  isLoading: Boolean = false;
  private carOptions: any = {};
  private serviceList: any[] = [];
  private serviceItemType: any[] = [
    {
      label: "全部",
      type: "info"
    },
    {
      label: "洗车",
      type: "default"
    },
    {
      label: "贴膜",
      type: "default"
    },
    {
      label: "补胎",
      type: "default"
    }
  ];
  private searchVal: string = "";
  private finishedText: string = "";
  private showDelete: boolean = false;
  private showDetail: boolean = false;
  private loading: boolean = false;
  private finished: boolean = false;
  private refreshing: boolean = false;
  private page: number = 0;
  private total: number = 0;
  async onLoad() {
    // if (this.refreshing) {
    //   this.serviceList = [];
    //   this.refreshing = false;
    // alert('load')
    // }
    this.page++;
    this.getserviceList();
  }
  list: any[] = [];
  private timerId: any = null;
  private countNo: number = 0;

  private carNumErrorMessage: string = "";
  private applicantErrorMessage: string = "";
  private phoneNumberErrorMessage: string = "";
  private orderAmountErrorMessage: string = "";

  private carNum: string = "";
  private applicant: string = "";
  private phoneNumber: string = "";
  private orderAmount: number = 0;
  private serviceItem: string = "";
  private reserveTime: Number = 0;

  private minHour: Number = 10;
  private maxHour: Number = 20;
  private minDate: Date = new Date();
  private maxDate: Date = this.getMaxDate();
  // private currentDate: any = {};
  repairDate: any = "";
  private orderId: string = "";
  private getMaxDate(): Date {
    let myDate = new Date();
    myDate.setDate(myDate.getDate() + 31);
    return myDate;
  }
  // get repairDate() {
  //   if (this.currentDate instanceof Date) {
  //     console.log('date',this.currentDate);
  //     return dateformat(this.currentDate);
  //   }

  //   if (typeof this.currentDate === "string") {
  //     console.log('string',this.currentDate)
  //     return dateformat(new Date(this.currentDate));
  //   }
  //   // let begin_date = new Date();
  //   // let end_date = new Date();
  //   // begin_date.setTime(end_date.getTime() + 1 * 24 * 60 * 60 * 1000);
  //   // return dateformat(begin_date);
  // }

  //回显订单数据
  async goEdit(id: string) {
    const data = await orderServices.getOrderDetailById(id);
    this.showDetail = true;
    this.carNum = data.car_no;
    this.orderAmount = data.order_amount;
    this.serviceItem = data.service_content;
    this.repairDate = data.repair_time.split(" ")[0];
    this.orderId = data.id;
  }

  private applicantValidate(): void {
    if (!this.applicant) {
      this.applicantErrorMessage = "车主名称不能为空";
    } else {
      this.applicantErrorMessage = "";
    }
  }

  private phoneNumberValidate(): void {
    const phoneNumber = this.phoneNumber;
    if (!phoneNumber) {
      this.phoneNumberErrorMessage = "车主手机号不能为空";
    } else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNumber)) {
      this.phoneNumberErrorMessage = "输入手机号格式不对";
    } else {
      this.phoneNumberErrorMessage = "";
    }
  }

  private orderAmountValidate(): void {
    const orderAmount = this.orderAmount;
    if (/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(orderAmount + "")) {
      this.orderAmountErrorMessage = "输入金额格式不对";
    } else {
      this.orderAmountErrorMessage = "";
    }
  }

  get no_data() {
    return !this.serviceList.length;
  }

  created() {
    // this.getserviceList();
  }

  private async editOrder(id: string) {
    const { code } = await orderServices.order_delete(id);
    if (code == 200) {
      this.$toast("操作成功");
      this.getserviceList();
    }
  }

  // private touchstart() {
  //   clearInterval(this.timerId);
  //   this.timerId = setInterval(() => {
  //     this.countNo++;
  //   }, 1000);
  // }
  // private touchend(id: string) {
  //   if (this.countNo < 5) return;
  //   clearInterval(this.timerId);
  //   this.$toast(id);
  //   this.showDelete = true;
  // }

  private goDetail(detail: any) {
    this.showDetail = true;
    const {
      id,
      carNo,
      carOwner,
      carTel,
      amount,
      finishedTime,
      serviceItem
    } = detail;
    this.carOptions = {
      carNum: carNo,
      applicant: carOwner,
      phoneNumber: carTel,
      orderAmount: amount,
      repairDate: finishedTime,
      id
    };
  }

  async confirm() {
    const status = await orderServices.order_update({
      id: this.orderId,
      carNo: this.carNum,
      repairTime: this.repairDate,
      orderAmount: this.orderAmount,
      carOwner: this.applicant,
      carOwnerTel: this.phoneNumber,
      serviceContent: this.serviceItem
    });

    if (status) {
      this.getserviceList();
    }
  }

  cancel() {}

  private async getserviceList() {
    let filterVal = this.searchVal.toUpperCase();
    const { rows, total } = await orderServices.get_order_list(
      this.page,
      filterVal
    );
    // console.log(rows,total);
    this.total = total;

    if (rows === null || rows.length === 0) {
      this.finished = true;
      return;
    }

    if (rows.length < 10) {
      this.finished = true;
    }

    this.loading = false;
    let rowData = rows.map((item: any) => {
      return Object.assign(item, {
        id: item.id,
        orderId: item.order_id,
        carNo: item.car_no || "未知",
        carOwner: item.car_owner || "未知",
        carTel: item.car_owner_tel || "未知",
        serviceItem: item.service_content,
        amount: item.order_amount,
        finishedTime: item.repair_time ? item.repair_time.split(" ")[0] : "-"
      });
    });
    if (this.page === 1) {
      this.serviceList = rowData;
    } else {
      this.serviceList = this.serviceList.concat(rowData);
    }

    if (this.serviceList.length >= this.total) {
      this.finished = true;
    }
  }

  private onSearch() {
    this.page = 1;
    this.getserviceList();
  }

  private onCancel() {
    this.searchVal = "";
    this.getserviceList();
  }

  private call() {
    console.log("调用通讯录");
  }

  private filterList() {
    this.$set(this.serviceItemType, "type", 1);
  }
}
</script>
<style lang="less">
.home {
  width: 100%;
  height: 100%;
  .filter-item {
    .item {
      display: flex;
      align-items: center;
      .label {
        margin: 0 10px;
      }
    }
  }
  .list {
    height: calc(100% - 54px);
    overflow: scroll;
    // background-color: #999;
  }
}
.service {
  padding: 0 20px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // background-image: linear-gradient(-45deg, #8067b7, #ec87c0);
  // min-height: calc(100vh - 40px);
  // margin: 20px;
  // font-family: "Lato", sans-serif;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  .list {
    border: 1px dashed rgb(223, 152, 22);
    border-radius: 10px;
    margin: 10px 0;
    padding: 0 10px;
    .car-number {
      display: block;
      padding: 0 2px;
      background-color: #154ab1;
      color: #fff;
    }
    .car-service {
      color: tomato;
    }
    .phone {
      color: rgb(63, 205, 63);
    }
  }
  div {
    filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
    &[type="ticket"] {
      width: 255px;
      .top,
      .bottom {
        > div {
          padding: 0 18px;
          &:first-child {
            padding-top: 18px;
          }
          &:last-child {
            padding-bottom: 18px;
          }
        }
        img {
          padding: 18px 0;
        }
      }
      .top,
      .bottom,
      .rip {
        background-color: #fff;
      }
      .top {
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        .deetz {
          padding-bottom: 10px !important;
        }
      }
      .bottom {
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        padding: 18px;
        height: 30px;
        padding-top: 10px;
        .barcode {
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAAABCAYAAABXChlMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAACPSURBVChTXVAJDsMgDOsrVpELiqb+/4c0DgStQ7JMYogNh2gdvg5VfXFCRIZaC6BOtnoNFpvaumNmwb/71Frrm8XvgYkker1/g9WzMOsohaOGNziRs5inDsAn8yEPengTapJ5bmdZ2Yv7VvfPN6AH2NJx7nOWPTf1/78hoqgxhzw3ZqYG1Dr/9ur3y8vMxgNZhcAUnR4xKgAAAABJRU5ErkJggg==);
          background-repeat: repeat-y;
          min-width: 58px;
        }
        .buy {
          display: block;
          font-size: 12px;
          font-weight: bold;
          background-color: #5d9cec;
          padding: 0 18px;
          line-height: 30px;
          border-radius: 15px;
          color: #fff;
          text-decoration: none;
        }
      }
      .rip {
        height: 20px;
        margin: 0 10px;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAACCAYAAAB7Xa1eAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAAAaSURBVBhXY5g7f97/2XPn/AcCBmSMQ+I/AwB2eyNBlrqzUQAAAABJRU5ErkJggg==);
        background-size: 4px 2px;
        background-repeat: repeat-x;
        background-position: center;
        position: relative;
        box-shadow: 0 1px 0 0 #fff, 0 -1px 0 0 #fff;
        &:before,
        &:after {
          content: "";
          position: absolute;
          width: 20px;
          height: 20px;
          top: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          border: 5px solid transparent;
          border-top-color: #fff;
          border-right-color: #fff;
          border-radius: 100%;
          pointer-events: none;
        }
        &:before {
          left: -10px;
        }
        &:after {
          transform: translate(-50%, -50%) rotate(225deg);
          right: -40px;
        }
      }
    }
    .-bold {
      font-weight: bold;
    }
  }
}
</style>
