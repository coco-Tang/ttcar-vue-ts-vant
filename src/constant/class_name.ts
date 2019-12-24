// 页面跳转的时候会隐藏有该类的元素
export const ROUTER_CHANGE_HIDE_CLASS_NAME = 'JS_hide_in_router_change';
// 双击大图展示 (暂未使用该常量进行替换)
export const CAN_VIEW_IMAGE_CLASS_NAME = 'can_view_img';
// 禁用状态的 className
export const DISABLED_CLASS_NAME = 'is-disabled';

export function class_selector(class_name: string) {
  return '.' + class_name;
}
