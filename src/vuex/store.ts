/*
 * @Author: coco-Tang
 * @Date: 2019-08-29 09:22:16
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-12-04 16:26:44
 * @Description: 数据管理
 */
import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/user/auth';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // user
    auth
  },
  strict: process.env.NODE_ENV !== 'production',
});

