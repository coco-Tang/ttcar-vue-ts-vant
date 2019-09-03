/*
 * @Author: coco-Tang
 * @Date: 2019-08-29 09:22:16
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-08-29 16:15:36
 * @Description: 
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { Cell, CellGroup, NavBar, Field, Button, Divider, Icon, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload } from "vant";
Vue.use(Cell).use(CellGroup).use(NavBar).use(Field).use(Button).use(Divider).use(Icon).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem).use(Lazyload);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
