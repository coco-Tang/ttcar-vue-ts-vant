/*
 * @Author: coco-Tang
 * @Date: 2019-10-11 15:29:21
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-12-04 15:20:02
 * @Description: 常量
 */

/**
* 服务项目类型
* - 1: 洗车 WASHING
* - 2: 贴膜 FILM
* - 3: 补胎 TIRE_REPAIRE
* - 4: 发动机 ENGINE
*/
export enum SERVICE_ITEM_TYPE {
  WASHING = 1,
  FILM = 2,
  TIRE_REPAIRE = 3,
  ENGINE = 4
}

export const SERVICE_ITEM_LABEL =  (id:number)=> {
  console.log(SERVICE_ITEM_TYPE[id])
  switch (id) {
    case 1:
      return SERVICE_ITEM_TYPE[id]
  }
}

// service
export const SUCCESS_RESPONSE_CODE = "0";