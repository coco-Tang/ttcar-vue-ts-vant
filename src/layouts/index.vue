<!--
 * @Author: coco-Tang
 * @Date: 2019-08-29 10:02:14
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-09-11 14:01:48
 * @Description: layout组件
 -->
<template>
  <div class="layout">
    <MyHeader></MyHeader>
    <div class="router-view-wrap">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/home" name="home" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item replace to="/todo" name="todo-list" icon="todo-list-o">todo-list</van-tabbar-item>
      <van-tabbar-item replace to="/orderedit" name="coupon" icon="coupon-o">下单</van-tabbar-item>
      <van-tabbar-item replace to="/user" name="friends" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import MyHeader from "./Header.vue"; // @ is an alias to /src

@Component({
  components: {
    MyHeader
  }
})
export default class Home extends Vue {
  private active: String = "home";
}
</script>
<style lang="less">
.layout {
  width: 100%;
  height: 100%;
  .router-view-wrap {
    width: 100%;
    height: calc(100% - 100px);
  }
}
</style>