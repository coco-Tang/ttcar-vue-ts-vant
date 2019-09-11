/*
 * @Author: coco-Tang
 * @Date: 2019-08-29 09:22:16
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-09-11 17:28:56
 * @Description: 
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { Cell, CellGroup, NavBar, Field, Button, Divider, Icon, Tabbar, TabbarItem, Tab, Tabs, TreeSelect, Swipe, SwipeItem, Lazyload, DatetimePicker, ActionSheet, Dialog } from "vant";
Vue.use(Cell).use(CellGroup).use(NavBar).use(Field).use(Button).use(Divider).use(Icon).use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(TreeSelect).use(Swipe).use(SwipeItem).use(Lazyload).use(DatetimePicker).use(ActionSheet).use(Dialog);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
