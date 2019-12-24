import Singleton from '@/utils/singleton';
import { all_auth } from '@/mock/auth';
// import TreeService from '@/services/tree';
// import { Message } from 'element-ui';
import { auth_textbook__tt_personal_textbook, auth_usercenter__class_setting } from './map';
// import RoleStorage from '@/storage/role';

// 是否 mock 所有权限
const MOCK_AUTH = false;

interface AuthMapType {
  [key: string]: string[];
}

/*
 * 权限分为:
 *     模块权限 (auth_module_name)
 *     功能权限 (fn_name) - 功能权限依附于模块权限
 */

// 全局权限配置
export default class Authority extends Singleton {

  // 是否已加载过权限
  public static loaded = MOCK_AUTH;
  // 权限映射表
  public auth_map: AuthMapType | null = null;
  // 扁平存放的权限映射表
  public flat_auth_map: string[] = [];

  private constructor(auth_map?: AuthMapType) {
    super();
    let _auth_map = MOCK_AUTH ? all_auth : auth_map;
    if ( ! _auth_map) {
      // throw new Error('[Authority] 初始化失败');
      // console.error('[Authority] 初始化失败');
      // return;
      _auth_map = {};
    }

    let flat_map: string[] = [];
    for (const key in _auth_map) {
      if (_auth_map.hasOwnProperty(key)) {
        const item = _auth_map[key];
        flat_map.push(key);
        flat_map = flat_map.concat(item);
      }
    }

    // if (flat_map.length) {
    this.auth_map = _auth_map;
    this.flat_auth_map = flat_map;
    Authority.loaded = true;
    // }
  }

  /**
   * 检查某模块是否有进入权限
   * 检查某模块下的某功能(比如按钮)是否有操作(按钮是否显示)权限
   *
   * @param {string} auth_module_name 模块权限
   * @param {[string]} fn_name 功能权限
   * @returns boolean
   *
   * @memberOf Auth
   */
  public check(auth_module_name: string, fn_name?: string): boolean {
    if ( ! this.auth_map) { return false; }
    const auth_module = this.auth_map[auth_module_name];

    // 1. fn_name 未传，说明只验证第一层权限
    if ( ! fn_name) { return !!auth_module; }

    // 2. fn_name 有传，说明验证第一层和第二层权限
    if ( ! auth_module || ! auth_module.length) { return false; }

    return auth_module.indexOf(fn_name) !== -1;
  }

  /**
   * 检查是否有权限 (不用区分模块权限还是功能权限)
   * @param auth_name 权限(模块或者功能权限)
   */
  public flat_check(auth_name: string): boolean {
    if ( ! this.auth_map) { return false; }
    if ( ! this.flat_auth_map.length) { return false; }

    return this.flat_auth_map.indexOf(auth_name) !== -1;
  }

  /**
   * 是否有设置班级的权限
   */
  public has_class_setting_auth(): boolean {
    return this.flat_check(auth_usercenter__class_setting);
  }

  /**
   * 检查是否存在个人课本
   */
  public async check_textbook(has_msg = true): Promise<boolean> {
    const all_textbooks = await TreeService.get_all_textbooks(); // 所有个人课本
    const status = all_textbooks.length > 0;

    if (!status && has_msg) {
      const has_add_tb_auth = this.flat_check(auth_textbook__tt_personal_textbook);

      if (has_add_tb_auth) {
        Message({ type: 'error', message: '暂无课本，可联系管理员设置或在个人中心-课本管理模块添加' });
      } else {
        Message({ type: 'error', message: '暂无课本，请联系管理员设置' });
      }
    }

    return status;
  }

  /**
   * 检查科目
   */
  public async check_subject(): Promise<boolean> {
    await TreeService.get_chapter_tree_filter_data();
    if (this.check_textbook(false)) { return true; }

    const all_subject = TreeService.get_all_subjects();
    if ( ! all_subject.length) {
      Message({ type: 'error', message: '学校暂无科目，请联系管理员设置' });
      return false;
    }

    return true;
  }

  /**
   * 验证用户是否有设置科目(特殊身份)或者班级(教师)
   * @param has_class_info 是否有配置班级
   * @param jump_callback 验证失败时的跳转 callback
   */
  public async check_role(has_class_info: boolean, jump_callback: (goto_class_setting: boolean) => void): Promise<boolean> {
    // 1. 判断是否为特殊角色
    if (!RoleStorage.is_teacher_role()) {
      // 特殊角色是否设置科目
      jump_callback(false);
      return this.check_subject();
    }

    // 2. 教师角色是否设置了班级
    if ( ! has_class_info) {
      // 没设置班级且有设置班级的权限
      if (this.has_class_setting_auth()) {
        Message({ type: 'error', message: '请设置授课班级及科目', duration: 5000 });
        jump_callback(true);
      } else {
        Message({ type: 'error', message: '您暂未设置授课班级及科目，请联系管理员设置', duration: 5000 });
        jump_callback(false);
      }

      return false;
    }

    jump_callback(false);
    return true;
  }
}
