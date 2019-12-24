/*
 * @Author: coco-Tang
 * @Date: 2019-12-11 10:49:39
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-12-11 10:49:45
 * @Description: 
 */
// 只用于 vuex 的类型
import {
  ActionContext,
  GetterTree,
  ActionTree,
  MutationTree,
  ModuleTree,
} from 'vuex';


interface MyModule<S, R> {
  namespaced: boolean;
  state: S | (() => S);
  getters: GetterTree<S, R>;
  actions: ActionTree<S, R>;
  mutations: MutationTree<S>;
  modules?: ModuleTree<R>;
}
export type _Module = MyModule<any, any>;
// action
export type _ActionContext<State> = ActionContext<State, any>;
