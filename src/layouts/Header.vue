<!--
 * @Author: coco-Tang
 * @Date: 2019-08-29 10:36:22
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-08-29 11:06:57
 * @Description: header组件
 -->
<template>
  <div class="header">
    <div class="logo">启东市天天汽修</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
/* @Component一定要写，和父组件的@Component({
  components: {
    ...
  }
})对应，否则会报错‘Cannot read property 'key' of undefined’ */
@Component
export default class MyHeader extends Vue {}
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #856;
  text-align: center;
  .logo {
    color: #eee;
  }
}
</style>