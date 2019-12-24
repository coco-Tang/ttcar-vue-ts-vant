import { _ActionContext, _Module } from '@/vuex/vuex_type';
import { Notify } from 'vant';

import {  ENV } from '@/config';
import {
  GET_USER_DATA,
  CLEAN_USER_DATA,
  UPDATE_USER_ROLE,
} from '@/vuex/mutation_types';
import Token from '@/auth/token';
import Authority from '@/auth/authority';
import AuthServices from '@/services/user/auth';
import { USER_TYPE,  ROLE_STATUS } from '@/constant/common';

interface AuthStateType {
  user_info: TTCAR.UserEntity | null;
}

// init state data
const state: AuthStateType = {
  user_info: null
};

type Context = _ActionContext<AuthStateType>;

const module: _Module = {
  namespaced: true,
  state,
  getters: {
    user_info(the_state: AuthStateType) {
      return the_state.user_info;
    }
  },
  actions: {
    /** ################################## 通用 ################################## */
    /**
     * 登录
     *
     * @param {Context} context
     * @param {string} username
     * @param {string} password
     * @returns {Promise<TTCAR.ResponseStatusType>}
     */
    async login(context: Context, { username, password }: { username: string, password: string }): Promise<TTCAR.ResponseStatusType> {
      // // 1. 发送登录请求
      // const { status, message, data } = await AuthServices.login(username, password);

      // // 2. 没有数据或请求失败均为登录失败，清除掉有可能保存了的 token
      // if (!status || !data || !data.userEntity) {
      //   Token.logout();
      //   return { status, message };
      // }

      // 5. 存储用户数据和学期信息
      // context.commit(GET_USER_DATA, data.userEntity);
      await context.dispatch('get_user_info'); // 异步初始化用户信息，保证登录页面跳转更快些

      return { status:true, message:'success' };
    },
    /**
     * 拉取用户数据 (需要初始化用户的基础数据，比较耗时)
     *
     * @param {Context} context
     */
    async get_user_info(context: Context) {

      try {
        // 1. getter 中没数据则获取用户数据
        if (!context.state.user_info) {
          const { status, message, data } = await AuthServices.user_info();

          if (status && data && data.userEntity) {
            // 存储用户数据和学期信息
            context.commit(GET_USER_DATA, data.userEntity);
          } else {
            Notify({ type: 'danger', message: '用户数据获取失败: ' + message});
            console.error('【用户数据获取失败-vuex/auth】', message);
          }
        }

        // 2. 判断是否有用户数据
        const user_info: TTCAR.UserEntity | null = context.getters.user_info;
        if (!user_info) {
          console.warn('【action get_user_info】 没有用户数据');
          // context.dispatch('logout');
          // await wait_time(2000);
          return;
        }

        // 3. 不同登录用户的初始化
        // 登录的是老师
        if (user_info.category === USER_TYPE.TEACHER) {
          // 初始化教师数据
          await context.dispatch('teacher_init');
        } else {
          // 登录的是学生，初始化学生数据
          await context.dispatch('student_init');
        }
      } catch (err) {
      }

    },
    /**
     * 更新用户数据
     */
    async update_user_data(context: Context) {
      const { status, message, data } = await AuthServices.user_info();

      if (status && data) {
        context.commit(GET_USER_DATA, data.userEntity);
      } else {
        console.error('【用户数据获取失败-vuex/auth】', message);
      }
    },
    /**
     * 切换角色，更新用户权限，返回是否切换成功
     */
    change_user_role(context: Context, new_role_id: number) {
      context.commit(UPDATE_USER_ROLE, { new_role_id });
    },
    /**
     * 清空项目中的用户数据
     *
     * @param {Context} context
     */
    clean_user_data(context: Context) {
      Token.logout();
      context.commit(CLEAN_USER_DATA);
    },
    /**
     * 登出
     *
     * @param {Context} context
     */
    logout(context: Context) {
      Token.logout(true, true); // 清除 token 并刷新页面，下次页面加载时会因为没有 token 跳到登录页
    }
  },
  mutations: {
    [GET_USER_DATA](the_state: AuthStateType, user_info: TTCAR.UserEntity | null) {
      the_state.user_info = user_info;

      // 初始化权限模块 (未加载过才需要初始化，Auth 是单例类)
      const info = user_info || { acl: {}, aclrole: [] };
      if (!Authority.loaded) {
        Authority.instance(info.acl);
      }

      // 存储老师的当前角色(本地有且存在与后端给的角色列表中则用它，否则用后端给的默认角色)
      const local_role = RoleStorage.get();
      const role_list = info.aclrole || [];
      const local_in_remote_role = role_list.find((r) => local_role ? r.roleid === local_role.roleid : false);
      if (!role_list.length) {
        RoleStorage.clean();
        return;
      }

      if (!local_role || !local_in_remote_role) {
        const default_role = role_list.find((r) => r.activestatus === ROLE_STATUS.IS); // 是默认角色

        // 没有默认角色，使用第一个角色
        if (!default_role) {
          const first_role = role_list[0];
          RoleStorage.set(first_role.roleid, first_role.type);
          return;
        }
        RoleStorage.set(default_role.roleid, default_role.type);
      } else {
        RoleStorage.set(local_in_remote_role.roleid, local_in_remote_role.type);
      }
    },
    [CLEAN_USER_DATA](the_state: AuthStateType) {
      the_state.user_info = null;
    },
    [UPDATE_USER_ROLE](the_state: AuthStateType, { new_role_id }: { new_role_id: number }) {
      if (!the_state.user_info) { return; }
      const cur_role = (the_state.user_info.aclrole || []).find((r) => r.roleid === new_role_id);
      if (!cur_role) { return; }

      RoleStorage.set(new_role_id, cur_role.type);

      Loading.service({ fullscreen: true });
      window.location.href = '/';
    },
  },
};

export default module;
