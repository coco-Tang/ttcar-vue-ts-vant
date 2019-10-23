<!--
 * @Author: coco-Tang
 * @Date: 2019-08-29 09:22:16
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-10-23 09:50:50
 * @Description: 主页
 -->
<template>
  <div class="home">
    <div class="search">
      <form action="/">
        <van-search
          v-model="searchVal"
          placeholder="请输入搜索关键词(姓名，联系方式)"
          show-action
          @search="onSearch"
        />
      </form>
    </div>
    <!-- -->

    <!-- 过滤条件 -->
    <!-- <div class="filter-item">
      <div class="item">
        <div class="label">服务项目:</div>
        <div class="type">
          <van-button
            size="small"
            v-for="(service,idx) in serviceItemType"
            :key="idx"
            :type="service.type"
            @click="filterList"
          >{{service.label}}</van-button>
        </div>
      </div>
    </div>-->
    <div class="list">
      <!-- 面板形式展示 -->
      <van-panel
        title="订单号"
        :desc="service.id"
        :status="service.status ? '已完成' : '待处理'"
        v-for="service in serviceList"
        :key="service.id"
      >
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
              <span class="car-number">{{service.customer.carNo}}</span>
            </p>
            <p>
              <span>服务项目：</span>
              <span>{{service.serviceItem ? service.serviceItem.join('、') : '无'}}</span>
            </p>
            <p>服务时间：{{service.finishedTime}}</p>
            <p>
              姓名及联系方式：
              <span>{{service.customer.name}}</span>
              <span class="phone" @click="call">（{{service.customer.phone}}）</span>
            </p>
          </div>
        </div>
      </van-panel>
    </div>

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
import orderServices from "@/service/order";
// import { SERVICE_ITEM_TYPE } from "@/constant";
// console.log(SERVICE_ITEM_TYPE);

@Component
export default class Home extends Vue {
  private images: string[] = [
    "https://img.yzcdn.cn/vant/apple-1.jpg",
    "https://img.yzcdn.cn/vant/apple-2.jpg"
  ];
  private serviceList: any[] = [
    {
      id: "618182305456722288",
      status: false,
      serviceItem: ["洗车"],
      finishedTime: "2019-10-11",
      customer: {
        name: "汤陆彦",
        phone: "15651430850",
        carNo: "苏F8Q0B3"
      }
    },
    {
      id: "554876292345722288",
      status: true,
      serviceItem: ["洗车", "贴膜"],
      finishedTime: "2019-09-10",
      customer: {
        name: "汤陆彦",
        phone: "15651430850",
        carNo: "苏F8Q0B3"
      }
    },
    {
      id: "618182305456722288",
      status: false,
      serviceItem: ["洗车"],
      finishedTime: "2019-10-11",
      customer: {
        name: "汤陆彦",
        phone: "15651430850",
        carNo: "苏F8Q0B3"
      }
    }
  ];
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
  private finished: boolean = false;
  private loading: boolean = false;

  private getserviceList() {
    console.log("getserviceList");
    orderServices.get_order_list().then(res => {
      console.log(res);
    });
  }

  private onSearch() {
    console.log("onSearch", this.searchVal);
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
