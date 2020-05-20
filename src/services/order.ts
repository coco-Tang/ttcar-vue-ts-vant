/*
 * @Author: coco-Tang
 * @Date: 2019-10-22 15:35:03
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-12-11 17:20:10
 * @Description: 
 */
import BaseServices from './index';


interface OrderCreateType {
  id?: string;
  carNo: string;
  // carBrand: string;
  // carType: string;
  repairTime: string;
  orderAmount: number;
  carOwner: string;
  carOwnerTel: string;
  serviceContent: string;
}

export default class orderServices extends BaseServices {

  /**
   * 获取订单列表
   *
   * @static
   * @param {number} carNo
   * @param {number} carOwner
   * @returns {Promise<any>}
   *
   * @memberOf Services
   */
  public static async get_order_list(page: number, carNo?: string):
    Promise<any> {

    const result = await this.base_get({
      url: this.create_order_api('/admin/order/list'),
      params: { page, carNo },
    });

    return result.data;
  }

  /**
   * 下单
   *
   * @static
   * @param {OrderCreateType} data
   * @returns {Promise<any>}
   *
   * @memberOf Services
   */
  public static async order_create(data: OrderCreateType): Promise<any> {
    const result = await this.base_post({
      url: this.create_order_api('/admin/order/add'),
      data,
    });
    return result;
  }

  /**
   * 修改订单
   *
   * @static
   * @param {OrderCreateType} data
   * @returns {Promise<any>}
   *
   * @memberOf Services
   */
  public static async order_update(data: OrderCreateType): Promise<any> {
    const result = await this.base_post({
      url: this.create_order_api('/admin/order/update'),
      data
    });
    return result.code === "0";
  }

  /**
   * 删除订单
   *
   * @static
   * @param data
   * @returns {Promise<any>}
   *
   * @memberOf Services
   */
  public static async order_delete(data: string): Promise<any> {
    const result = await this.base_delete({
      url: this.create_order_api('/api/order') + '/' + data
    });
    return result;
  }

  /**
   * 根据订单 ID 获取详情
   * @static
   * @param id
   * @return { Promise<any> }
   * 
   * @memberOf Services
   */
  public static async getOrderDetailById(id:any) {
    const result = await this.base_post({
      url: this.create_order_api('/admin/order/find'),
      data: {id}
    })

    return result.data;
  }

  /**
 * 获取新闻列表
 *
 * @static
 * @returns {Promise<any>}
 *
 * @memberOf Services
 */
  public static async get_newslist_api(): Promise<any> {
    const result = await this.base_get({
      url: 'http://v.juhe.cn/toutiao/index?type=top&key=e1935a2f2de69adf507482ea629f23b3'
    });
    return result.data;
  }
}



