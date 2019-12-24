/*
 * @Author: coco-Tang
 * @Date: 2019-12-03 17:16:13
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-12-04 13:48:26
 * @Description: 
 */
// 登出、获取用户 token 操作
// import TokenStorage from '@/storage/token';

export default class Token {

  // public static readonly key = TokenStorage.key;
  // main.ts 中挂载的回调 (将不方便在这个类中做的事情放到 main.ts 中去做)
  public static logout_callback: null | ((reload_page: boolean) => void) = null;

  public static set(token: string) {
    // TokenStorage.set(token);
  }

  public static get(): string {
    // return TokenStorage.get();
  }

  public static is_login(): boolean {
    return !!this.get();
  }

  public static clean() {
    // TokenStorage.clean();
  }

  /**
   * 登出操作
   *
   * trigger_callback 会触发 Token.logout_callback 回调:
   *   该回调在 main.ts 中挂载了，一般用来处理清理 token 后的一些回收操作，比如清除 localStorage sessionStorage 之类的
   * reload_page 为 true 时，会刷新页面(避免退出了还有一些用户的额外信息保存在内存中)
   *   这里 reload_page 触发的地方在 main.ts/logout_callback 回调中 (重载页面的操作比较重要，放在 main.ts 中比较容易重视到)
   *   并且由于 callback 中可能会有清除缓存或者其他操作，所以放在 main.ts 中
   *
   * Token.logout(false, false): 只是清除掉用户 token，下次请求或跳转路由时会由于没有 token 跳到登录页
   * Token.logout(false, true):  同上
   * Token.logout(true, false):  (默认操作) 清除掉 token，并触发 main.ts 中挂载的的 logout_callback 回调 (刷新页面)
   * Token.logout(true, true):   清除 token，并会刷新页面，下次页面加载时会由于没有 token 跳到登录页 (最干净的退出方法)
   */
  public static logout(trigger_callback = true, reload_page = false) {
    this.clean();
    if (trigger_callback && this.logout_callback) {
      this.logout_callback(reload_page);
    }
  }

}
