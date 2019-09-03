/*
 * @Author: coco-Tang
 * @Date: 2019-08-29 17:01:57
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-08-29 19:16:08
 * @Description: request
 */
import axios from "axios";
import qs from "qs";
import store from "@/store"
console.log(store)

const instance = axios.create({})
instance.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlcoded;charset=UTF-8'
}

instance.defaults.withCredentials = true

instance.defaults.baseURL = '/ttcar';
instance.defaults.timeout = 10000;


let startTime: number = 0;

instance.interceptors.request.use((config: any) => {
  startTime = +new Date();

  if (config.method === 'POST') {
    config.data = qs.stringify(config.data);
  }

  return config
}, (error: any) => {
  return Promise.reject(error);
})

instance.interceptors.response.use((response: any) => {
  const loadTime = +new Date() - startTime;

  if (loadTime > 4000) {
    console.warn(
      `本次加载时间为 ${loadTime / 1000}s, 你的网络状况似乎不太好`,
      `api: ${response.request.responseURL}`
    )
  }

  if (response.status === 200) {
    return response.data
  } else {

  }
}, (error: any) => {
  if (error.response.status === 401) {

  }
})


export default instance

