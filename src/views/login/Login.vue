<!--
 * @Author: coco-Tang
 * @Date: 2019-08-29 09:40:08
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-12-11 13:57:37
 * @Description: 登录
 -->
<template>
  <div class="login-module">
    <van-nav-bar title="登录/注册" left-text="返回" left-arrow @click-left="$router.go(-1)" />
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />

      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <div class="btn-wrap">
      <van-button :disabled="disabled" type="info" round style="width:100%;" @click="loginSubmit">登录</van-button>
    </div>
    <div class="register" @click="$router.push('register')">注册</div>
    <div class="third-part">
      <van-divider>第三方账号登录</van-divider>
      <van-icon name="alipay" size="48px" color="#108ee9" />
      <div></div>
      <sub style="color:#666;">支付宝登录</sub>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import BaseService from "@/services";

@Component
export default class Home extends Vue {
  @Action("auth/login") private login_action!: ({
    username,
    password
  }: {
    username: string;
    password: string;
  }) => Promise<TTCAR.ResponseStatusType>;
  private username: string = "";
  private password: string = "";
  private get disabled() {
    return !this.username && !this.password;
  }

  private async loginSubmit() {
    try {
      // 1.表单验证
      // todo
      // 2.发起请求
      var md5 = require("md5");
      const { status, message } = await this.login_action({
        username: this.username,
        password: md5(this.password)
      });

      if (status) {
        this.$router.push({ name: "home" });
      } else {
        if (message) {
          this.$notify({ type: "danger", message });
        }
      }
    } catch (err) {}
  }
}
</script>
<style lang="less">
.btn-wrap {
  padding: 0 20px;
}
.register {
  text-align: right;
  margin: 20px 40px;
  color: #108ee9;
}
.third-part {
  width: 100%;
  position: fixed;
  bottom: 0;
  text-align: center;
  margin-bottom: 20px;
}
</style>