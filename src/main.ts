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

import { Row, Col, Cell, CellGroup, NavBar, Field, Button, Divider, Icon, Tabbar, TabbarItem, Tab, Tabs, TreeSelect, Swipe, SwipeItem, Lazyload, DatetimePicker, ActionSheet, Dialog, List, Panel, Search } from "vant";
Vue.use(Row).use(Col).use(Cell).use(CellGroup).use(NavBar).use(Field).use(Button).use(Divider).use(Icon).use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(TreeSelect).use(Swipe).use(SwipeItem).use(Lazyload).use(DatetimePicker).use(ActionSheet).use(Dialog).use(List).use(Panel).use(Search);

// import VueAMap from 'vue-amap';
// Vue.use(VueAMap);

// ---------------------------------------- 其他 ----------------------------------------
import Authority from '@/auth/authority';
import can_enter_the_page from '@/auth/route';
import { IS_DEV, PATCH_CALLBACK } from '@/config';
import { ROUTER_CHANGE_HIDE_CLASS_NAME, class_selector } from '@/constant/class_name';
import { from_current_top_scroll_to } from '@/utils/dom';

import Token from '@/auth/token';
Vue.config.productionTip = false;

// ---------------------------------------- 路由钩子 ----------------------------------------
router.beforeEach(async (to, from, next) => {
  // debugger
  // 1. 设置 title
  document.title = (to.meta || {}).title || '教学平台';
  // 2. loading
  // NProgress.set(0.7);
  // 3. 路由守卫 (已登录但是还没有拉取过用户数据)
  if (Token.get() && !store.getters['auth/user_info']) {
    console.log('此处未执行')
    // 3.1 初始化对应用户的基础数据，并且初始化权限模块 get_user_info 的 mutations 中会初始化 Authority
    await store.dispatch('auth/get_user_info');

    // 3.2 第一次获取用户数据时验证角色权限 (班级/课本/科目相关)
    if (Authority.loaded) {
      const auth_instance = Authority.instance<Authority>();
      await auth_instance.check_role(store.getters['auth/has_class_info'], (goto_class_setting: boolean) => {
        if (goto_class_setting) {
          next('/setting?active=3'); // 跳转到班级设置页面
        }
      });
    }
  }
  // 4. 挂载权限模块
  if (!Vue.prototype.$$Authority && Authority.loaded) {
    Vue.prototype.$$Authority = Authority.instance<Authority>();
  }
  // 5. 鉴权
  can_enter_the_page(to, from, next, store.getters['auth/user_info']);
});

router.afterEach((to, from) => {
  if (to.name !== from.name) {
    from_current_top_scroll_to(0, 0); // 滚动到顶部

    setTimeout(() => {
      // 页面跳转的时候会隐藏有该类的元素
      const hide_doms = [].slice.call(document.querySelectorAll(class_selector(ROUTER_CHANGE_HIDE_CLASS_NAME)));
      for (const dom of hide_doms) {
        if (dom && (dom as any).style) {
          (dom as any).style.display = 'none';
        }
      }

      // 执行补丁函数
      if (PATCH_CALLBACK) {
        PATCH_CALLBACK({
          route: { to, from },
        });
      }
    }, 500);
  }

  // NProgress.done();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
