/*
 * @Author: coco-Tang
 * @Date: 2019-10-22 15:35:03
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-10-22 17:52:59
 * @Description: 
 */
import BaseServices from './index';


interface OrderCreateType {
  carNo: string;
  carBrand: string;
  carType: string;
  carOwner: string;
  carTel: number;
  serviceType: number;
}

export default class Services extends BaseServices {

  /**
   * 获取未发布和已发布的作业数量
   *
   * @static
   * @param {number} termid
   * @param {number} gradeid
   * @param {number} subjectid
   * @param {number} teacherid
   * @returns {Promise<any>}
   *
   * @memberOf Services
   */
  public static async get_action_count(termid: number, gradeid: number, subjectid: number, teacherid: number):
    Promise<{ nonPubilc: number, pubilc: number }> {

    const result = await this.base_get({
      url: this.create_order_api('/api/index/get-action-count'),
      params: { termid, gradeid, subjectid, teacherid },
    });

    return result.data;
  }

  /**
   * 首页作业正确率统计
   *
   * @static
   * @param {OrderCreateType} data
   * @returns {Promise<any>}
   *
   * @memberOf Services
   */
  public static async order_create(data: OrderCreateType): Promise<any[]> {
    const result = await this.base_post({
      url: this.create_order_api('/api/create'),
      data,
    });

    return result.data;
  }

}
