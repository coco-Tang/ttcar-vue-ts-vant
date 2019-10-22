/*
 * @Author: coco-Tang
 * @Date: 2019-08-29 19:03:28
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-10-22 13:55:18
 * @Description: 登录模块api
 */
import LoginService from "./index"
const API = {
  register: 'register',
  login: '/login',
  logout: '/logout'
}

export const login = LoginService
