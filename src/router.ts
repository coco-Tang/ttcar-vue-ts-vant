/*
 * @Author: coco-Tang
 * @Date: 2019-08-29 09:22:16
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-09-24 10:55:17
 * @Description: 路由
 */
import Vue from 'vue';
import Router from 'vue-router';
import Index from './layouts/index.vue';
import Home from './views/home/Home.vue';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: 'home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home
        },
        {
          path: 'navigation',
          name: 'navigation',
          component: () => import(/* webpackChunkName: "navigation" */ './views/navigation/Navigation.vue')
        },
        {
          path: 'orderedit',
          name: 'orderedit',
          component: () => import(/* webpackChunkName: "orderedit" */ './views/order/OrderEdit.vue')
        },
        {
          path: 'ordersuccess',
          name: 'ordersuccess',
          component: () => import(/* webpackChunkName: "ordersuccess" */ './views/order/OrderSuccess.vue')
        }, {
          path: 'user',
          name: 'user',
          component: () => import(/* webpackChunkName: "user" */ './views/user/UserCenter.vue')
        },]
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ './views/login/Login.vue')
    },
    {
      path: '/register',
      component: () => import(/* webpackChunkName: "register" */ './views/login/Register.vue')
    },
    {
      path: '/about',
      // name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
export default router
