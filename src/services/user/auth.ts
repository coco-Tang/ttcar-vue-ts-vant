/*
 * @Author: coco-Tang
 * @Date: 2019-12-11 10:11:21
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-12-11 10:43:53
 * @Description: 
 */
import BaseServices from '@/services';

export default class AuthServices extends BaseServices {

  /**
   * 登录函数
   *
   * @static
   * @param {string} username
   * @param {string} password
   * @returns {(Promise<TTCAR.ResponseStatusAndDataType<TTCAR.UserEntityAndTermInfoType | null>>)}
   *
   * @memberOf Services
   */
  public static async login(username: string, password: string): Promise<TTCAR.ResponseStatusAndDataType<TTCAR.UserEntityAndTermInfoType | null>> {
    return super.login(username, password);
  }

  /**
   * 获取当前用户信息
   *
   * @static
   * @returns {(Promise<TTCAR.ResponseStatusAndDataType<TTCAR.UserEntity | null>>)}
   *
   * @memberOf Services
   */
  // public static async user_info(): Promise<TTCAR.ResponseStatusAndDataType<TTCAR.UserEntityAndTermInfoType | null>> {

  //   const result = await this.get({ url: '/api/user/efficiency-select-one' });

  //   return this.return_status_and_data(result);
  // }
}
