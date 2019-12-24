// import Axios from 'axios';
// import qs from 'qs';
// import { wait_time } from '@/utils/utils';
// import checkServices from '@/services/download_check';
import { VNode } from 'vue';

/**
 * 获取祖先节点中指定 class 的节点元素 (只是匹配 class 有指定的字符，并不是完整匹配)
 *
 * @export
 * @param {HTMLElement} dom
 * @param {string} class_name
 * @returns {(HTMLElement | null)}
 */
export function find_parent_dom_base_class(dom: HTMLElement, class_name: string): HTMLElement | null {
  const $target = dom.parentNode as HTMLElement;

  if (! $target || ($target === document.body)) { return null; }
  if (has_class($target, class_name)) { return $target; }

  return find_parent_dom_base_class($target, class_name);
}

/**
 * 滚动动画函数
 *
 * @export
 * @param {(HTMLElement | Window)} el
 * @param {number} [from=0]
 * @param {number} to
 * @param {number} [duration=500]
 */
export function scroll_to(el: HTMLElement | Window, from: number = 0, to: number, duration: number = 500): void {
  function callback() {
    return window.setTimeout(callback, 1000 / 60);
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
        window.webkitRequestAnimationFrame ||
        (window as any).mozRequestAnimationFrame ||
        (window as any).msRequestAnimationFrame ||
        callback
    );
  }

  const difference = Math.abs(from - to);
  const scroll_step = Math.ceil(difference / duration * 50);

  function scroll(start: number, end: number, step: number) {
    if (start === end) {
      return;
    }

    let d = (start + step > end) ? end : start + step;

    if (start > end) {
      d = (start - step < end) ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      (el as HTMLElement).scrollTop = d;
    }

    window.requestAnimationFrame(() => scroll(d, end, step));
  }

  scroll(from, to, scroll_step);
}

/**
 * 遍历滚动函数
 *
 * @export
 * @param {number} [target_top=0]
 * @param {number} [duration=500]
 */
export function from_current_top_scroll_to(target_top: number = 0, duration: number = 500): void {
  const current_top = document.documentElement!.scrollTop || document.body.scrollTop;

  scroll_to(window, current_top, target_top, duration);
}

/**
 * 图片懒加载
 *
 * @export
 * @param {string}
 */
export function lazyload_img_html(html: string): string {
  // return (html || '').replace('src', ' class="lazyload can_view_img" data-src');
  // return (html || '').replace('src', ' class="lazyload can_view_img" title="双击显示大图" src');
  // 先将图片替换为 1px gif，显示时在替换为真实图片 (从 data-src 中取出)
  const gif_1px = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';
  const title = ' title="双击查看大图" ';
  const img_re = /<img(.*?)>/ig;
  const src_re = /src/gi;
  const class_src_re = /class="(.*?)".*(src)/gi;
  const src_class_re = /(src).*class="(.*?)"/gi;
  const class_src_replacer = (p1_match: string, p1_1: string, p1_2: string) => p1_match
    .replace(p1_1, p1_1 + ' lazyload can_view_img')
    .replace(p1_2, `src="${gif_1px}" data-src`);
  const src_class_replacer = (p1_match: string, p1_1: string, p1_2: string) => p1_match
    .replace(p1_2, p1_2 + ' lazyload can_view_img')
    .replace(p1_1, `src="${gif_1px}" data-src`);

  if (html.search(img_re) === -1) { return html; }

  return html.replace(img_re, (match: string, p1: string) => {
    let new_str = p1;

    if (p1.search(src_re) !== -1) {
      new_str = p1.replace(src_re, `src="${gif_1px}" data-src`) + ' class="lazyload can_view_img" ' + title;
    } else if (p1.search(class_src_re) !== -1) {
      new_str = p1.replace(class_src_re, class_src_replacer) + title;
    } else if (p1.search(src_class_re) !== -1) {
      new_str = p1.replace(src_class_re, src_class_replacer) + title;
    } else {
      new_str = ' class="lazyload can_view_img" ' + title + p1;
    }

    return match.replace(p1, new_str);
  });
}

/**
 * answerhtml显示 - 学生端和老师端
 *
 * @export
 * @param {string}
 */
export function answer_html_show(html: string): string {
  if ( !html ) { return ''; }
  if ( html.slice(1, 6) === 'audio' ) {
    return (html || '').replace('src', ' style="min-height: 55px;" controls="controls" src');
  }
  return lazyload_img_html(html);
}

/**
 * 删除弹窗
 * @param message
 * @param title
 * @param type
 */
export async function confirm_message(message: string | VNode, title: string = '提示', type: MessageType = 'warning', options: object = {}): Promise<boolean> {
  try {
    await MessageBox.confirm(message as string, title,
      Object.assign({}, { confirmButtonText: '确定', cancelButtonText: '取消', type }, options));

    return true;
  } catch (err) {
    return false;
  }
}

/**
 * 输入文字弹窗
 *
 * @export
 * @param {string} message
 * @param {string} [title='提示']
 * @param {*} [options]
 * @returns
 */
export async function prompt(message: string, title: string = '提示', options?: any): Promise<{ status: boolean, message: string }> {
  try {
    const result = await MessageBox.prompt(message, title,
      Object.assign({}, { confirmButtonText: '确定', cancelButtonText: '取消' }, options));

    return {status: true, message: (result as any).value};
  } catch (err) {
    return {status: true, message: ''};
  }
}

/** 跳转到其他网站 */
export function jump_the_url(url: string) {
  const $a = document.createElement('a');
  $a.href = url;
  document.body.appendChild($a);
  $a.click();
}

/**
 * useFormDownload function - 通过 form 下载文件
 *
 * @param  {String} method http method
 * @param  {String} action 后端接口
 * @param  {Object} params 请求参数
 * @return {Void}
 */
export async function use_form_download(method: string, action: string, params: any = {}) {
  const inputs = Object.keys(params).map((key) => {
      return `<input type="hidden" name="${key}" value='${params[key]}'/>`;
  }).join('');

  const $form = document.createElement('form');

  $form.action = action;
  $form.method = method;
  $form.innerHTML = inputs;

  document.body.appendChild($form);

  $form.submit();

  setTimeout(() => {
    node_remove($form);
  }, 10000);
}


/**
 * use_iframe_download function - 通过 iframe 下载文件
 *
 * @param  {String} download_path 需下载文件的链接
 * @return {Void}
 */
export async function use_iframe_download(download_path: string, check = true) {
  // 文件下载检测
  if ( check ) {
    const check_params: EDU.DownloadCheckType = {
      path: encodeURI(download_path),
    };
    const response = await checkServices.download_check(check_params);
    if ( response.code !== 200 ) {
      Message.error(response.msg);
      return;
    }
  }

  const $iframe = document.createElement('iframe');

  $iframe.style.height = '0px';
  $iframe.style.width = '0px';
  document.body.appendChild($iframe);
  $iframe.setAttribute('src', download_path);

  setTimeout(() => { node_remove($iframe); }, 20000);
}

/**
 * 获取元素相对于 domcument 的 offset
 *
 * @export
 * @param {Element} dom
 * @param {EDU.DOMOffset} [offset]
 * @returns {EDU.DOMOffset}
 */
export function get_dom_base_document_offset(dom: Element, offset?: EDU.DOMOffset): EDU.DOMOffset {
  if ( ! offset) {
    offset = { top: 0, left: 0 };
  }

  if ( ! dom || dom === document.body) { return offset; }

  offset.top += (dom as HTMLElement).offsetTop;
  offset.left += (dom as HTMLElement).offsetLeft;

  return get_dom_base_document_offset((dom as HTMLElement).offsetParent!, offset);
}

/**
 * 获取 dom 样式
 *
 * @export
 * @param {Element} dom
 * @param {string} style_name
 * @returns {(null | string)}
 */
export function get_dom_style(dom: Element, style_name: string): null | string {
  const style = window.getComputedStyle ?
    window.getComputedStyle(dom, '') :
    (dom as any).currentStyle;

  if ( ! style || ! style[style_name]) { return null; }
  return style[style_name];
}

// 如果 str 是 http 开头，认为其是一个图片链接，如果其有 src 认为其是一个 img 标签，取其 src 属性中的链接
export function get_img_src_or_url(str: string): string {
  const reg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
  const match = reg.exec(str);

  if (str.startsWith('http')) {
    return str;
  } else if (match && match[1]) {
    return match[1];
  }

  return '';
}

/**
 * 获取滚动条宽度
 */
let scroll_bar_width: number | null = null;
export function get_scroll_bar_width(): number {
  if (scroll_bar_width !== null) { return scroll_bar_width; }

  const outer = document.createElement('div');
  outer.className = 'scrollbar__wrap';
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode!.removeChild(outer);
  scroll_bar_width = widthNoScroll - widthWithScroll;

  return scroll_bar_width;
}

/** 获取图片的宽高 */
export function get_image_dom_natural_wh(img_dom: HTMLImageElement): Promise<{width: number, height: number}> {
  return new Promise((resolve) => {
    if (img_dom.naturalWidth && img_dom.naturalHeight) {
      return resolve({ width: img_dom.naturalWidth, height: img_dom.naturalHeight });
    } else {
      const img = new Image();

      img.src = img_dom.src;
      img.onload = () => {
        return resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        return resolve({ width: 0, height: 0 });
      };
    }
  });
}

/** 根据图片 url 获取图片的宽高 */
export function get_image_natural_wh(url: string): Promise<{width: number, height: number}> {
  return new Promise((resolve) => {
    const img = new Image();

    img.src = url;
    img.onload = () => {
      return resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      return resolve({ width: 0, height: 0 });
    };
  });
}

/** 显示隐藏 footer */
export function show_or_hide_footer(show = false) {
  const footer = document.querySelector('.module_my_footer');
  if ( ! footer) { return; }
  (footer as HTMLElement).style.display = show ? 'block' : 'none';
}

/** 判断是否有该 classname */
export function has_class(el: HTMLElement, cls: string): boolean {
  if (!el || !cls) { return false; }
  if (cls.indexOf(' ') !== -1) { throw new Error('className should not contain space.'); }
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

/** 添加 classname */
export function add_class(el: HTMLElement, cls: string) {
  if ( ! el) { return; }
  const classes = (cls || '').split(' ');
  let curClass = el.className;

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if ( ! clsName) { continue; }

    if (el.classList) {
      el.classList.add(clsName);
    } else if ( ! has_class(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/** 删除 classname */
export function remove_class(el: HTMLElement, cls: string) {
  if ( ! el || ! cls) { return; }
  const classes = cls.split(' ');
  let curClass = ' ' + el.className + ' ';

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if ( ! clsName) { continue; }

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (has_class(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = curClass.trim();
  }
}

/** 获取视频时长，时长为 0 表示获取失败 */
export function get_video_duration(file: File): Promise<number> {
  return new Promise((resolve) => {
    const $video = document.createElement('video');
    $video.preload = 'metadata';
    $video.src = URL.createObjectURL(file);

    $video.onloadedmetadata = () => {
      window.URL.revokeObjectURL($video.src);
      resolve($video.duration || 0);
    };
    $video.onerror = () => {
      resolve(0);
    };
  });
}

/** 删除节点 */
export function node_remove(dom: HTMLElement) {
  try {
    if (dom.remove) {
      dom.remove();
    } else if ((dom as any).removeNode) {
      (dom as any).removeNode();
    }
  } catch (e) {}
}
