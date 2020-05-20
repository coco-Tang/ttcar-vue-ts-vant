/*
 * @Author: coco-Tang
 * @Date: 2019-09-18 15:16:33
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-09-18 15:26:57
 * @Description: 
 */
export function dateformat(date: Date): string {
  let y = date.getFullYear();
  const Y = y;
  let m = date.getMonth() + 1;
  const M = m < 10 ? "0" + m : m;
  let d = date.getDate();
  const D = d < 10 ? "0" + d : d;
  let h = date.getHours();
  const H = h;
  let minute = date.getMinutes();
  const MINUTE = minute < 10 ? "0" + minute : minute;
  return Y + "-" + M + "-" + D;
  // return Y + "-" + M + "-" + D + " " + H + ":" + MINUTE;
}