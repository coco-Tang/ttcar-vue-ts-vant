/*
 * @Author: coco-Tang
 * @Date: 2019-08-29 09:22:16
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-12-03 17:16:42
 * @Description: 
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './vuex/store';

import { Row, Col, Cell, CellGroup, NavBar, Field, Button, Divider, Icon, Tabbar, TabbarItem, Tab, Tabs, TreeSelect, Swipe, SwipeItem, Lazyload, DatetimePicker, ActionSheet, Dialog, List, Panel, Search, Toast, Popup, Checkbox, CheckboxGroup, PullRefresh, Sticky } from "vant";
Vue.use(Row).use(Col).use(Cell).use(CellGroup).use(NavBar).use(Field).use(Button).use(Divider).use(Icon).use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(TreeSelect).use(Swipe).use(SwipeItem).use(Lazyload).use(DatetimePicker).use(ActionSheet).use(Dialog).use(List).use(Panel).use(Search).use(Toast).use(Popup).use(Checkbox).use(CheckboxGroup).use(PullRefresh).use(Sticky);



import VueCarPlateKeyboard from 'vue-car-plate-keyboard';
Vue.use(VueCarPlateKeyboard);
// ---------------------------------------- 其他 ----------------------------------------
Vue.config.productionTip = false;



new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
