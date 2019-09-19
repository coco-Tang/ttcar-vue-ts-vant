<!--
 * @Author: coco-Tang
 * @Date: 2019-09-19 16:48:47
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-09-19 17:31:49
 * @Description: 
 -->
<template>
  <div class="module_TodoList">
    <div id="container"></div>
  </div>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

@Component({
  name: "todo",
  components: {}
})
export default class TodoList extends Vue {
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

    var content =
      // '<div class="info-title">天天汽车保养中心</div><div class="info-content">' +
      // '<img src="https://webapi.amap.com/images/amap.jpg">' +
      // "地址：江苏省南通市启东市南阳镇南阳村（靠近江苏省南通市启东市221省道）<br/>" +
      // '<a target="_blank" href = "https://mobile.amap.com/">点击下载高德地图</a></div>';
      `<div class="info-title">天天汽车保养中心</div>
     <div class="info-content">
       <img src="https://webapi.amap.com/images/amap.jpg">
       <div>地址：江苏省南通市启东市南阳镇南阳村（靠近江苏省南通市启东市221省道）</div>
       <div>电话：</div>
     </div>`;
    var infowindow1 = new AMap.AdvancedInfoWindow({
      content: content,
      offset: new AMap.Pixel(0, -30)
    });
    var infowindow2 = new AMap.AdvancedInfoWindow({
      content: content,
      asOrigin: false,
      asDestination: false,
      offset: new AMap.Pixel(0, -30)
    });
    var infowindow3 = new AMap.AdvancedInfoWindow({
      content: content,
      placeSearch: false,
      asDestination: false,
      offset: new AMap.Pixel(0, -30)
    });
    infowindow1.open(map, lnglat);
    // var map = new AMap.Map("container", {
    //   zoom: 15
    // });
    // AMapUI.loadUI(["overlay/SimpleInfoWindow"], function(SimpleInfoWindow) {
    //   var marker = new AMap.Marker({
    //     map: map,
    //     zIndex: 9999999,
    //     position: map.getCenter()
    //   });
    //   var infoWindow = new SimpleInfoWindow({
    //     infoTitle: "<strong>这里是标题</strong>",
    //     infoBody:
    //       '<p class="my-desc"><strong>这里是内容。</strong> <br/> 高德地图 JavaScript API，是由 JavaScript 语言编写的应用程序接口，' +
    //       "它能够帮助您在网站或移动端中构建功能丰富、交互性强的地图应用程序</p>",
    //     //基点指向marker的头部位置
    //     offset: new AMap.Pixel(0, -31)
    //   });
    //   function openInfoWin() {
    //     infoWindow.open(map, marker.getPosition());
    //   }
    //   //marker 点击时打开
    //   AMap.event.addListener(marker, "click", function() {
    //     openInfoWin();
    //   });
    //   openInfoWin();
    // });
  }
  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  // private my_data: string = 'some thing' // data
  // get computed_data(): string { return 'computed' } // computed
  /* ------------------------ WATCH ------------------------ */
  // @Watch('some_thing') private some_thing_changed(val: any, oldVal: any) {}
  /* ------------------------ METHODS ------------------------ */
  // private some_method(): void {}
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

.amap-info-combo .keyword-input {
  height: 25px;
  border-radius: 2px 0 0 2px;
}
</style>
<style lang="less" scoped>
// @import '~@/assets/less/var'

.module_TodoList {
  height: 100%;
  #container {
    height: 100%;
  }
}
</style>
