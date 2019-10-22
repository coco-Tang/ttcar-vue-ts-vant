/*
 * @Author: coco-Tang
 * @Date: 2019-10-14 10:51:46
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-10-22 13:44:22
 * @Description: 
 */
// 公共类型
declare namespace TTCAR {
  /** 用户信息 */
  export interface UserEntity {
    userid: number;   // 用户 id
    usercode: string; // user code
    username: string; // 用户名
    schoolid: number; // 学校 id
    source?: number;  // 来源 id
    category: 0 | 1 | 2 | 3; // 分类 id

    address?: string;   // 地址
    birthday?: string;  // 生日
    created_at: number; // 创建时间
    email: string;      // 邮箱
    gender: number;     // 性别
    tel: string;        // 电话
    photo?: string;     // 头像
    fullPath?: string;  // 头像图片地址
    classid?: number;   // 班级id
    loginname?: string; // 用户别名

    // acl?: UserAuthMapType; // 权限映射表
    // aclrole?: UserRoleType[]; // 角色信息

    // true: 包含角色不需要跳转到设置班级页面
    // false: 没有对应角色信息，需跳转到班级设置页面
    hasRole?: boolean;
    // 是否有设置班级
    hasClassinfo?: boolean;
  }
  /* ============================ services 类型 ============================ */
  /**
   * 返回数据
   *
   * @export
   * @interface AjaxResponseType
   */
  export interface AjaxResponseType {
    readonly code: number;   // 状态码
    readonly msg: string;    // 信息
    readonly token?: string; // token
    readonly data: any;      // 具体数据
  }

  /** 登录接口的返回数据 */
  export interface LoginAjaxResponseType {
    readonly code: number;    // 状态码
    readonly message: string; // 信息
    readonly token?: string;  // token
    readonly data: null; // 用户信息
  }

  /**
   * 返回数据的 page 数据
   *
   * @export
   * @interface ResponsePageType
   */
  export interface ResponsePageType {
    cur: number;   // 当前页
    line: number;  // 每页条数
    total: number; // 总数
  }

  /**
   * 状态返回的数据
   *
   * @export
   * @interface ResponseStatusType
   */
  export interface ResponseStatusType {
    status: boolean;
    message: string;
  }

  /**
   * 状态返回的数据 (会携带数据)
   *
   * @export
   * @interface ResponseStatusAndDataType
   */
  export interface ResponseStatusAndDataType<T> {
    status: boolean;
    message: string;
    data: T;
  }

  /**
   * get 请求参数
   *
   * @export
   * @interface GetConfigType
   */
  export interface GetConfigType {
    url: string;
    params?: any;
  }

  /**
   * post 请求参数
   *
   * @export
   * @interface PostConfigType
   */
  export interface PostConfigType {
    url: string;
    data?: any;
    json?: boolean;
  }

  /** 学期 */
  export interface TermType {
    termid: number;     // 学期 id
    termname: string;   // 学期名称
    iscurrent?: number; // 是否为当前学期: 1 : 是当前学期; 0 : 不是当前学期
  }

  /** 携带学期信息的用户信息 */
  export interface UserEntityAndTermInfoType {
    userEntity: UserEntity;
    termVos: TermType[];
  }

}
