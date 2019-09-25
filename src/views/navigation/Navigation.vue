<!--
 * @Author: coco-Tang
 * @Date: 2019-09-19 16:48:47
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-09-25 15:35:52
 * @Description: 
 -->
<template>
  <div class="module_Navigation">
    <div v-show="isShow" @click="goBack">返回</div>
    <div id="container"></div>
    <van-action-sheet v-model="isShowMapItem" :actions="mapItems" @select="onSelect" />
    <!-- <div id="panel"></div> -->
  </div>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "navigation",
  components: {}
})
export default class Navigation extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  // @Prop() private parentData!: any
  // @Emit('event_name') private handler() {}
  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */
  // @Getter private some_getter!: any
  // @Action private some_action!: () => void
  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  // private created() {}
  private mounted() {
    var lnglat = [121.696597, 31.871499];
    var map = new AMap.Map("container", {
      resizeEnable: true,
      center: lnglat,
      zoom: 15,
      zooms: [4, 18]
    });
    var marker = new AMap.Marker({
      position: lnglat
    });
    marker.setMap(map);

    var content = `<div class="info-title">天天汽车保养中心</div>
                   <div class="info-content">
                     <img src="https://webapi.amap.com/images/amap.jpg">
                     <div>地址：江苏省南通市启东市南阳镇南阳村（靠近江苏省南通市启东市221省道）</div>
                     <div>电话：<span class="info-tel">18862836256</span></div>
                   </div>`;
    var infowindow = new AMap.AdvancedInfoWindow({
      content: content,
      offset: new AMap.Pixel(0, -30)
    });
    infowindow.open(map, lnglat);
    const self = this;
    infowindow.on("open", function() {
      self.isShow = false;
    });
    infowindow.on("complete", function(SearchResult: any) {
      const { type, data } = SearchResult;
      // console.log(type, data);
      if (data.info === "OK") {
        switch (type) {
          case "driving":
            self.initDriving(data);
            break;
          case "transit":
            self.initTransfer(data);
            break;
          case "walking":
            self.initWalking(data);
            break;
        }
      }
    });
  }
  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private isShow: Boolean = false;
  private isShowMapItem: Boolean = false;
  private mapItems: any[] = [
    {
      name: "高德地图",
      key: 1
    },
    {
      name: "百度地图",
      key: 2
    }
  ];
  // get computed_data(): string { return 'computed' } // computed
  /* ------------------------ WATCH ------------------------ */
  // @Watch('some_thing') private some_thing_changed(val: any, oldVal: any) {}
  /* ------------------------ METHODS ------------------------ */
  private initMap(lnglat: number[]): any {
    // var lnglat = [121.696597, 31.871499];
    return new AMap.Map("container", {
      resizeEnable: true,
      center: lnglat,
      zoom: 15,
      zooms: [4, 18]
    });
  }
  private initDriving(result: any): void {
    var map = new AMap.Map("container", {
      resizeEnable: true
    });
    //驾车导航，您如果想修改结果展现效果，请参考页面：https://lbs.amap.com/fn/css-style/
    var drivingOption = {
      policy: AMap.DrivingPolicy.LEAST_TIME
    };
    var driving = new AMap.Driving(drivingOption); //构造驾车导航类
    driving.searchOnAMAP({
      origin: result.origin,
      destination: result.destination
    });
  }
  private initTransfer(result: any): void {
    var map = new AMap.Map("container", {
      resizeEnable: true
    });
    var drivingOption = {
      map: map,
      policy: AMap.TransferPolicy.LEAST_TIME
    };
    var transfer = new AMap.Transfer(drivingOption); //构造驾车导航类
    transfer.searchOnAMAP({
      origin: result.origin,
      destination: result.destination
    });
  }
  private initWalking(result: any): void {
    var map = new AMap.Map("container", {
      resizeEnable: true
    });
    var drivingOption = {
      map: map
    };

    var walking = new AMap.Walking(drivingOption); //构造驾车导航类
    walking.searchOnAMAP({
      origin: result.origin,
      destination: result.destination
    });
  }
  private goBack(): void {
    this.isShow = false;
  }
  /* 添加地图选项的功能（暂时未做） */
  private onSelect(item: any) {
    // 点击选项时默认不会关闭菜单，可以手动关闭
    this.isShowMapItem = false;
    // Toast(item.name);
    switch (item.key) {
      case 1:
        driving.searchOnAMAP({
          origin: result.origin,
          destination: result.destination
        });
    }
  }
}
</script>
<style >
.info-title {
  color: white;
  font-size: 14px;
  background-color: #25a5f7;
  line-height: 26px;
  padding: 0px 0 0 6px;
  font-weight: lighter;
  letter-spacing: 1px;
}

.info-content {
  font: 12px Helvetica, "Hiragino Sans GB", "Microsoft Yahei", "微软雅黑", Arial;
  font-weight: 700;
  padding: 4px;
  color: #666666;
  line-height: 23px;
}

.info-content img {
  float: left;
  margin: 3px;
}

.info-tel {
  font-size: 16px;
  color: green;
}

#panel {
  position: fixed;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 10px;
  right: 10px;
  width: 280px;
}
#panel .amap-lib-driving {
  border-radius: 4px;
  overflow: hidden;
}

.amap-info-combo .keyword-input {
  height: 25px;
  border-radius: 2px 0 0 2px;
}
</style>
<style lang="less" scoped>
// @import '~@/assets/less/var'

.module_Navigation {
  height: 100%;
  #container {
    height: 100%;
  }
}
</style>
