<!--
 * @Author: coco-Tang
 * @Date: 2019-08-29 09:22:16
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-08-29 13:47:59
 * @Description: 主页
 -->
<template>
  <div class="home">
    <van-swipe :autoplay="3000" style="height:100%">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  private images: string[] = [
    "https://img.yzcdn.cn/vant/apple-1.jpg",
    "https://img.yzcdn.cn/vant/apple-2.jpg"
  ];
}
</script>
<style lang="less">
.home {
  width: 100%;
  height: 100%;
}
</style>
