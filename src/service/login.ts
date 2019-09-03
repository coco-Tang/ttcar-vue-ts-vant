/*
 * @Author: coco-Tang
 * @Date: 2019-08-29 19:03:28
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-08-29 20:02:47
 * @Description: 登录模块api
 */
import ajax from "./index"
const API = {
  register: 'register',
  login: '/login',
  logout: '/logout'
}

export const login = (data: any) =>
  ajax({ url: `${API.login}`, method: 'POST', data }).then((response: any) => { response.data })
