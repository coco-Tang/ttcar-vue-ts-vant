/*
 * @Author: coco-Tang
 * @Date: 2019-09-04 09:16:43
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-12-11 14:03:16
 * @Description: 
 */
// 路由模块权限
import Vue from 'vue';
// import NProgress from 'nprogress';
import { RawLocation, Route } from 'vue-router';

import Authority from '@/auth/authority';
import Token from '@/auth/token';
import { IS_DEV } from '@/config';
import { USER_TYPE } from '@/constant/common';

type NextFn = (to?: RawLocation | false | ((vm: Vue) => any) | void) => void;
const LOGIN_ROUTE_NAME = 'login';

/** 角色是否拥有当前路由的权限 */
function has_current_route_auth(route_auth: string[], auth_unstrict?: boolean): boolean {
  const auth_instance = Authority.instance<Authority>();

  if (!route_auth || !route_auth.length) { return true; } // 没配置权限则直接进入

  // 验证是否有权限进入
  let auth_is_true = false;
  if (auth_unstrict) {
    // 权限非严格匹配
    auth_is_true = route_auth.some((a) => auth_instance.flat_check(a));
  } else {
    // 权限严格匹配
    auth_is_true = route_auth.every((a) => auth_instance.flat_check(a));
  }
  if (auth_is_true) { return true; }

  return false;
}

/**
 * 未登录时，路由的处理函数
 *
 * @param {Route} to
 * @param {NextFn} next
 */
function no_login_handler(to: Route, next: NextFn) {
  if (to.name === LOGIN_ROUTE_NAME) {
    next();
    console.log('跟路由没有登录')
  } else {
    console.log('to.name', to.name)
    next({ name: LOGIN_ROUTE_NAME });
  }
}

/**
 * 进入根路径时的处理函数 (不同角色的用户，根路径进入的页面也不同)
 *
 * @param {Route} to
 * @param {NextFn} next
 * @param {TTCAR.UserEntity} user_info
 */
function enter_root_route(to: Route, next: NextFn, user_info: TTCAR.UserEntity) {
  const user_type = user_info.category;
  // 1. 是老师角色
  if (user_type === USER_TYPE.TEACHER) {
    next({ name: 'home-index' });
    // 2. 是学生角色
  } else if (user_type === USER_TYPE.STUDENT) {
    next({ name: 'student-guide-index' });
    // 其他角色 (跳到登录页面，该系统只用于教师和学生)
  } else {
    Token.logout(); // 不清除可能还会进入这个 case 导致死循环
    no_login_handler(to, next);
  }
}

/**
 * 路由守卫函数
 * 特殊页面:
 *   - login(登录页面): 未登录或者查询不到用户数据或者登录的不是老师或学生，会进入该页面，进入该页面不需权限
 *   - error(错误页面 404): 页面无权限或者未定义的路由会进入该页面，进入该页面不需权限
 *   - root(根路由): 每个角色的根路由不一样，需要进行特殊处理，进入有权限的页面的优先级最高的那个页面
 *
 * @export
 * @param {Route} to
 * @param {Route} from
 * @param {NextFn} next
 * @param {*} user_info
 * @returns
 */
export default function can_enter_the_page(to: Route, from: Route, next: NextFn, user_info: TTCAR.UserEntity | null) {
  return next(); // 测试、开发时用，不进行权限和是否登录验证
  const is_dev = IS_DEV();

  // 1. 没有登录，或登录过期
  if (!user_info || !Token.get()) {
    console.log('没有登录进入到此处，执行no_login_handler')
    no_login_handler(to, next);
    return;
  }

  // 2. 错误页面无需判断，直接可进入
  if (to.name === 'notFound') {
    next();
    return;
  }

  // 3. 登录了，判断用户信息中是否有进入目标页面的权限
  // 3.1 已登录了，进不了登录界面
  if (to.name === LOGIN_ROUTE_NAME) {
    next({ path: '/' });
    // NProgress.done(); // 如在 / 页面进入 login 页面则不会进入 router.afterEach，需自己关闭下
    return;
  }
  // 3.2 对进入 / 根路径的处理
  if (to.path === '/') {
    enter_root_route(to, next, user_info!);
    return;
  }
  // 3.3 其他路由，判断是否有进入权限 (走到这一步的路由都需要配置权限)
  if (to.meta && to.meta.auth && has_current_route_auth(to.meta.auth, to.meta.auth_unstrict)) {
    next();
  } else {
    if (is_dev) {
      console.warn('【无权限进入该页面】 需要权限: ', to.meta.auth);
    }
    // 无权限进入
    next({ name: 'notFound', replace: true });
  }
}
