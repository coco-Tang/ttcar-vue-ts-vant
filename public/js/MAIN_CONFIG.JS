/*
 * @Author: coco-Tang
 * @Date: 2019-10-22 14:39:08
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-12-11 13:50:21
 * @Description: 
 */
; (function (name, definition, context) {
  if ((typeof module !== 'undefined') && module.exports)
    module.exports = definition() // node 环境
  else if ((typeof context['define'] === 'function') && (context['define']['amd'] || context['define']['cmd']))
    define(definition)            // amd cmd 规范环境，如 seajs requirejs
  else
    context[name] = definition()  // 浏览器环境
})('MAIN_CONFIG', function () {

  // var API_ROOT = 'http://10.10.10.116:9002/';
  // var API_ROOT = 'http://10.10.10.108:9002/';
  // var API_ROOT = 'http://10.10.12.48:9002/';
  var API_ROOT = 'ttcar';

  return {
    // ---------------------------- api prefix ----------------------------
    AUTH_API_ROOT: API_ROOT,
    CAR_APT_ROOT: API_ROOT + 'car',
    ORDER_API_ROOT: API_ROOT + 'order',
    QUESTION_API_ROOT: API_ROOT + 'tiku',
    COACH_API_ROOT: API_ROOT + 'coach',
    OFFICE_API_ROOT: API_ROOT + 'office',
    GUIDE_API_ROOT: API_ROOT + 'daoxue',
    RESOURCE_API_ROOT: API_ROOT + 'resource',
    DICTIONARY_API_ROOT: API_ROOT + 'word',

    // ---------------------------- page url ----------------------------
    ADMIN_URL: '/admin-s', // 管理后台 url

    // ---------------------------- key ----------------------------
    LOCALSTROAGE_PREFIX: 'edutech_',      // localstroage prefix
    TOKEN_KEY: 'edutech_token', // token key

    // ---------------------------- cache config ----------------------------
    WK_STORAGE_EXPIRE: 1000 * 60 * 60,  // 微课大师本地缓存的过期时间 (1小时过期)
    DISABLED_CHAPTER_TREE_CACHE: false, // 是否禁用树缓存 (章节树第一层节点的内存缓存)
    DISABLED_KNOW_TREE_CACHE: false,    // 是否禁用树缓存 (知识点树的内存缓存)

    // ---------------------------- third party ----------------------------
    RECORDING_PLATFORM: 'https://lubo.ischool365.com/auth.html', // 录播平台登录页面

    // ---------------------------- other ----------------------------
    __DEV__: false, // 是否为开发环境
    // 补丁
    PATCH_CALLBACK: function (route) { }
  }

}, this);
