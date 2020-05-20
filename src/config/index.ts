/*
 * @Author: coco-Tang
 * @Date: 2019-10-22 10:46:43
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-10-22 16:08:25
 * @Description: 
 */
import { Route } from 'vue-router';

const W: any = window;
const MAIN_CONFIG: { [key: string]: any } = W.MAIN_CONFIG;
if (!MAIN_CONFIG) { console.error('主配置文件 MAIN_CONFIG.js 不存在，请检查!'); }

// ---------------------------- color ----------------------------
export const COLORS = { main: '#26bf80', white: '#ffffff', blue: '#53a8ff', red: '#fa541c' };

// ---------------------------- 开发环境判断 ----------------------------
export const ENV = { is_dev: process.env.NODE_ENV === 'development' };
export function IS_DEV() { return MAIN_CONFIG.__DEV__; }
W.IS_DEV = IS_DEV;

// ---------------------------- 接口根地址 ----------------------------
export const AUTH_API_ROOT = MAIN_CONFIG.AUTH_API_ROOT;
export const ORDER_API_ROOT = MAIN_CONFIG.ORDER_API_ROOT;
export const QUESTION_API_ROOT = MAIN_CONFIG.QUESTION_API_ROOT;
export const COACH_API_ROOT = MAIN_CONFIG.COACH_API_ROOT;
export const OFFICE_API_ROOT = MAIN_CONFIG.OFFICE_API_ROOT;
export const GUIDE_API_ROOT = MAIN_CONFIG.GUIDE_API_ROOT;
export const RESOURCE_API_ROOT = MAIN_CONFIG.RESOURCE_API_ROOT;
export const DICTIONARY_API_ROOT = MAIN_CONFIG.DICTIONARY_API_ROOT;

// ---------------------------- page url ----------------------------
export const ADMIN_URL = MAIN_CONFIG.ADMIN_URL; // 管理后台地址
export const RECORDING_PLATFORM = MAIN_CONFIG.RECORDING_PLATFORM; // 录播平台登录页面

// ---------------------------- ewebeditor config ----------------------------
export const EWEBEDITOR_URL = '/ewebeditor/ewebeditor.htm';
export const EWEBEDITOR_STYLE = 'expand600';
export const EWEBEDITOR_SKIN = 'flat10';
export function create_ewebeditor_src(editor_key: string) {
  return `${EWEBEDITOR_URL}?id=content${editor_key}&style=${EWEBEDITOR_STYLE}&skin=${EWEBEDITOR_SKIN}`;
}

// ---------------------------- key ----------------------------
export const LOCALSTROAGE_PREFIX = MAIN_CONFIG.LOCALSTROAGE_PREFIX; // localstroage prefix
export const TOKEN_KEY = MAIN_CONFIG.TOKEN_KEY; // token key

// ---------------------------- cache config ----------------------------
export const DISABLED_EXPIRE = 666666; // 不设置缓存
export const WK_STORAGE_EXPIRE = MAIN_CONFIG.WK_STORAGE_EXPIRE || DISABLED_EXPIRE;
export const DISABLED_CHAPTER_TREE_CACHE = MAIN_CONFIG.DISABLED_CHAPTER_TREE_CACHE || false;
export const DISABLED_KNOW_TREE_CACHE = MAIN_CONFIG.DISABLED_KNOW_TREE_CACHE || false;

// ---------------------------- cookie ----------------------------
interface CookiesType {
  set(key: string, val: string, attr?: { [key: string]: any }): string | void;
  get(key: string, json?: boolean): any;
  remove(key: string, attr?: { [key: string]: any }): void;
}
const Cookies: CookiesType | null = (window as any).Cookies || null;
export function get_cookie() {
  if (!Cookies) {
    console.log('js-cookie.js 未加载');
    return null;
  }
  return Cookies;
}

// ---------------------------- 其他 ----------------------------
// 补丁函数
type PatchCallbackType = (params: {
  route: { to: Route, from: Route },
}) => void;
export const PATCH_CALLBACK: PatchCallbackType | null = MAIN_CONFIG.PATCH_CALLBACK || null;

// ---------------------------- 必有配置的加载检查 ----------------------------
const api_config_arr = [AUTH_API_ROOT, ORDER_API_ROOT, QUESTION_API_ROOT, COACH_API_ROOT, OFFICE_API_ROOT, GUIDE_API_ROOT, RESOURCE_API_ROOT, DICTIONARY_API_ROOT, ADMIN_URL];
if (!api_config_arr.every((i) => i)) {
  console.error('【MAIN_CONFIG】 API PREFIX 加载错误，请检查配置文件', api_config_arr);
}
