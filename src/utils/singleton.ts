/** 单例基类 */

export default class Singleton {

  private static _instance: Singleton | null = null;

  public constructor(...args: any[]) {}

  /** 获取单例 */
  public static instance<T extends Singleton>(...args: any[]): T {
    if (this._instance === null) {
      try {
        this._instance = new this(...args);
      } catch (err) {}
    }

    return this._instance as T;
  }

  /** 释放单例 */
  public static free() {
    this._instance = null;
  }

}
