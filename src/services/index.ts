/*
 * @Author: coco-Tang
 * @Date: 2019-08-29 17:01:57
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-12-04 15:21:17
 * @Description: request
 */
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from "qs";
import { Notify } from "vant";
import { AUTH_API_ROOT, ORDER_API_ROOT, QUESTION_API_ROOT, COACH_API_ROOT, OFFICE_API_ROOT, ENV, GUIDE_API_ROOT, RESOURCE_API_ROOT, DICTIONARY_API_ROOT } from '@/config';
import { safe_get } from '@/utils/utils';
import { SUCCESS_RESPONSE_CODE } from '@/constant';

// 用户未登录
const NO_LOGIN_CODE = 464;
// 其他错误
const OTHER_ERROR_CODES = [
  599,  // 加载失败
  532,  // 调用第三方错误
  9999, // 服务不可用
  -1,   // 未知错误
];

/* ######################################################## 基础配置 ######################################################## */
const URLENCODED_CONTENT_TYPE = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
const JSON_CONTENT_TYPE = { 'Content-Type': 'application/json;charset=UTF-8' };
const axios = Axios.create({
  // timeout: 5000, // 请求超时时间
  headers: URLENCODED_CONTENT_TYPE,
});

interface MyAxiosRequestConfig extends AxiosRequestConfig {
  json?: boolean;
}

/* ######################################################## ajax 钩子 ######################################################## */
// 请求钩子
let startTime = 0;
axios.interceptors.request.use((config: MyAxiosRequestConfig) => {
  // if (!config.params) { config.params = {}; }

  // // 携带 token
  // const token = Token.get();
  // if (token) {
  //   config.params.token = token; // query 中加上 token (get/post 都需要)
  // }
  // // 携带语言设置
  // const lang = I18NStorage.get();
  // if (lang) {
  //   config.params.lang = lang;
  // }
  // // 携带角色标识
  // const roledata = RoleStorage.get();
  // if (roledata && roledata.roletype) {
  //   config.params.roletype = roledata.roletype;
  // }

  startTime = new Date().getTime();
  return config;
},
  (error) => {
    return Promise.reject(error);
  },
);

// 响应钩子
axios.interceptors.response.use((response: AxiosResponse<TTCAR.AjaxResponseType>) => {
  const loadTime = new Date().getTime() - startTime;
  const response_data = response.data; // 响应数据

  // 1. 记录时间
  if (ENV.is_dev && loadTime > 4000) {
    console.warn(`本次加载时间为 ${loadTime / 1000}s`, `api: ${response.request.responseURL}`);
  }
  const status_code = Number(response_data.code);

  // 2. response code 处理
  if (status_code === NO_LOGIN_CODE) {
    // Message.error('用户未登录，即将跳转到登录页面！');
    console.error(response_data);
    // setTimeout(() => {
    // Token.logout(true, true);
    // }, 2000);
  }
  // 3. other error
  if (OTHER_ERROR_CODES.indexOf(status_code) !== -1) {
    // Message.error(response_data.msg || '网络错误！');
  }
  // 4. 如有携带 token，则存储起来
  // if (response_data.token) { Token.set(response_data.token); }

  return response;
},
  (error) => {
    return Promise.reject(error);
  },
);

/* ######################################################## 请求基类 ######################################################## */
export default class BaseServices {
  /* ======================================================== decorator ======================================================== */

  /* ======================================================== attr ======================================================== */
  public static readonly AUTH_API_ROOT: string = AUTH_API_ROOT;
  public static readonly ORDER_API_ROOT: string = ORDER_API_ROOT;
  public static readonly QUESTION_API_ROOT: string = QUESTION_API_ROOT;
  public static readonly COACH_API_ROOT: string = COACH_API_ROOT;
  public static readonly OFFICE_API_ROOT: string = OFFICE_API_ROOT;
  public static readonly GUIDE_API_ROOT: string = GUIDE_API_ROOT;
  public static readonly RESOURCE_API_ROOT: string = RESOURCE_API_ROOT;
  public static readonly DICTIONARY_API_ROOT: string = DICTIONARY_API_ROOT;
  // 默认的请求错误信息
  private static readonly ERROR_RESPONSE: TTCAR.AjaxResponseType = {
    msg: '',
    code: -1,
    data: null,
  };

  /* ======================================================== 挂载 ======================================================== */
  public static readonly safe_get = safe_get;
  public static readonly message = Notify;
  public static readonly stringify = qs.stringify;
  public static readonly URLENCODED_CONTENT_TYPE = URLENCODED_CONTENT_TYPE;
  public static readonly JSON_CONTENT_TYPE = JSON_CONTENT_TYPE;

  /* ======================================================== private method ======================================================== */
  /**
   * 返回标准响应数据
   *
   * @private
   * @static
   * @param {AxiosResponse} response
   * @returns {TTCAR.AjaxResponseType}
   *
   * @memberOf BaseServices
   */
  private static create_response_data(response: AxiosResponse): TTCAR.AjaxResponseType {
    const data = response.data;

    if (!data) { throw new Error(''); }

    return data ? data : this.ERROR_RESPONSE;
  }

  /**
   * 通用的错误处理
   *
   * @private
   * @static
   * @param {*} error_data
   *
   * @memberOf BaseServices
   */
  private static network_error_handler(error_data: any) {
    console.error(error_data);
    // this.message({ type: 'error', message: '!', showClose: true, duration: 5000 });
  }

  /**
   * 登录的工具方法
   *
   * @private
   * @static
   * @param {string} username
   * @param {string} password
   * @returns {Promise<TTCAR.AjaxResponseType>}
   *
   * @memberOf BaseServices
   */
  private static async _login(username: string, password: string): Promise<TTCAR.LoginAjaxResponseType> {
    const error_data: TTCAR.LoginAjaxResponseType = {
      code: -1,
      message: '',
      data: null,
    };

    try {
      // const roledata = RoleStorage.get();
      // const roleid = roledata ? roledata.roleid : undefined;

      const response = await axios({
        method: 'POST',
        url: this.create_auth_api('/login'),
        params: { username, password },
      });
      if (!response.data) { throw new Error(''); }
      const data = response.data ? response.data : error_data;

      return { code: data.code, data: data.data, message: data.msg || '' };
    } catch (error) {
      this.network_error_handler(error);
      // Token.logout();
      return error_data;
    }
  }

  /* ======================================================== public method ======================================================== */
  /* --------------------------------- error handler --------------------------------- */

  /* --------------------------------- url --------------------------------- */
  /**
   * 创建 教师 auth 完整 url
   * @param api
   */
  public static create_auth_api(api: string): string {
    return this.AUTH_API_ROOT + api;
  }

  /**
   * 创建 订单 完整 url
   * @param api
   */
  public static create_order_api(api: string): string {
    return this.ORDER_API_ROOT + api;
  }

  /**
   * 创建 题库 完整 url
   * @param api
   */
  public static create_question_api(api: string): string {
    return this.QUESTION_API_ROOT + api;
  }
  /**
   * 创建 作业辅导 完整 url
   * @param api
   */
  public static create_coach_api(api: string): string {
    return this.COACH_API_ROOT + api;
  }
  /**
   * 创建 office 完整 url
   * @param api
   */
  public static create_office_api(api: string): string {
    return this.OFFICE_API_ROOT + api;
  }
  /**
   * 创建 导学本 完整 url
   * @param api
   */
  public static create_guide_api(api: string): string {
    return this.GUIDE_API_ROOT + api;
  }

  /**
   * 创建 资源库 完整 url
   * @param api
   */
  public static create_resource_api(api: string): string {
    return this.RESOURCE_API_ROOT + api;
  }

  /**
   * 创建 背单词 完整 url
   * @param api
   */
  public static create_dictionary_api(api: string): string {
    return this.DICTIONARY_API_ROOT + api;
  }

  /* --------------------------------- return --------------------------------- */
  /**
   * ajax 状态类型请求的返回值 (如删除请求)
   *
   * @static
   * @param {TTCAR.AjaxResponseType} result
   * @returns {TTCAR.ResponseStatusType}
   *
   * @memberOf BaseServices
   */
  public static return_status_data(result: TTCAR.AjaxResponseType, default_message = ''): TTCAR.ResponseStatusType {
    const status = result.code === SUCCESS_RESPONSE_CODE;

    if (ENV.is_dev && !status) {
      console.warn('【' + '】 ', result);
    }

    return {
      status,
      message: result.msg || default_message as string,
    };
  }

  /**
   * ajax 的错误状态类型
   *
   * @public
   * @static
   * @param {string} [default_message='操作失败']
   * @returns {TTCAR.ResponseStatusType}
   *
   * @memberOf BaseServices
   */
  public static return_error_status_data(default_message = ""): TTCAR.ResponseStatusType {
    return { status: false, message: default_message as string };
  }

  /**
   * ajax 状态类型请求的返回值 (如删除请求) 会携带数据
   *
   * @static
   * @template T
   * @param {TTCAR.AjaxResponseType} result
   * @param {string} [default_message='操作失败']
   * @returns {TTCAR.ResponseStatusAndDataType<T>}
   *
   * @memberOf BaseServices
   */
  public static return_status_and_data<T>(result: TTCAR.AjaxResponseType, default_message = ""): TTCAR.ResponseStatusAndDataType<T> {
    return {
      status: result.code === SUCCESS_RESPONSE_CODE,
      message: result.msg || default_message as string,
      data: result.data,
    };
  }

  /* --------------------------------- ajax --------------------------------- */
  /** axios */
  public static async axios(config: MyAxiosRequestConfig): Promise<any> {
    try {
      return await axios(config);
    } catch (error) {
      this.network_error_handler(error);
      return null;
    }
  }

  /**
   * ajax 请求方法
   *
   * @static
   * @param {MyAxiosRequestConfig} config axios 的配置
   * @returns {Promise<TTCAR.AjaxResponseType>} promise，promise 包装的数据为返回数据
   *
   * @memberOf BaseServices
   */
  public static async ajax(config: MyAxiosRequestConfig): Promise<TTCAR.AjaxResponseType> {
    const method = config.method ? config.method.toUpperCase() : 'GET';

    // 1. 每种请求参数的特殊处理
    if (method === 'GET') {
      // ...
    } else if (method === 'POST') {
      if (!config.data) { config.data = {}; }
      if (!config.json) {
        config.data = this.stringify(config.data);
      } else {
        config.headers = Object.assign({}, config.headers, this.JSON_CONTENT_TYPE);
      }
    }

    // 2. 请求和错误处理
    try {
      const response: AxiosResponse<TTCAR.AjaxResponseType> = await axios(config);

      return this.create_response_data(response);
    } catch (error) {
      this.network_error_handler(error);
      return this.ERROR_RESPONSE;
    }
  }

  /**
   * 基础 get
   *
   * @static
   * @param {TTCAR.GetConfigType} config
   * @returns {Promise<TTCAR.AjaxResponseType>}
   *
   * @memberOf BaseServices
   */
  public static async base_get(config: TTCAR.GetConfigType): Promise<TTCAR.AjaxResponseType> {
    return this.ajax({
      url: config.url,
      method: 'GET',
      params: config.params,
    });
  }

  /**
   * 基础 post
   *
   * @static
   * @param {TTCAR.PostConfigType} config
   * @returns {Promise<TTCAR.AjaxResponseType>}
   *
   * @memberOf BaseServices
   */
  public static async base_post(config: TTCAR.PostConfigType): Promise<TTCAR.AjaxResponseType> {
    return this.ajax({
      url: config.url,
      method: 'POST',
      data: config.data,
      json: config.json,
    });
  }

  /**
   * 用户登录 ajax (将登录接口返回的数据转换为标准格式)
   *
   * @static
   * @param {string} username
   * @param {string} password
   * @returns {Promise<TTCAR.UserEntity>}
   *
   * @memberOf BaseServices
   */
  public static async login(username: string, password: string): Promise<TTCAR.ResponseStatusAndDataType<TTCAR.UserEntityAndTermInfoType | null>> {
    const result = await this._login(username, password);
    return {
      status: result.code == SUCCESS_RESPONSE_CODE,
      message: result.message,
      data: result.data,
    };
  }
}

