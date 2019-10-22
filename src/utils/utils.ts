/*
 * @Author: coco-Tang
 * @Date: 2019-10-22 10:45:16
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-10-22 10:46:06
 * @Description: 
 */
/**
 * 安全的获取值
 *
 * safe_get(obj, 'a.b.c') // 123
 * safe_get(obj, 'a.b.d', '我是默认值') // 我是默认值
 *
 * @export
 * @param {*} targetObj
 * @param {string} keyString
 * @param {*} defaultValue
 * @returns {*}
 */
export function safe_get(targetObj: any, keyString: string, defaultValue: any): any {
  const path = String(keyString).split('.');
  const result = path.reduce((preObj, curPath) => {
    return (preObj !== null && !is_undefined(preObj))
      ? preObj[curPath]
      : preObj;
  }, targetObj);

  return is_undefined(result)
    ? (is_undefined(defaultValue) ? result : defaultValue)
    : result;
}

/**
 * 是否定义
 *
 * @export
 * @param {*} something
 * @returns {boolean}
 */
export function is_undefined(something: any): boolean {
  return something === void 0;
}