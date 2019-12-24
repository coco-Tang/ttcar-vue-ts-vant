// service
export const SUCCESS_RESPONSE_CODE = 0;

// 用户类型
export enum USER_TYPE {
  SUPER_ADMIN = 0, // 超级管理员
  ADMIN = 1,       // 学校管理员
  TEACHER = 2,     // 教师
  STUDENT = 3,     // 学生
}

/**
 * 角色类型
 * - 1: 教师 TEACHER
 * - 2: 班主任 HEAD_TEACHER
 * - 3: 学生 STUDENTS
 * - 4: 校长 PRINCIPAL
 * - 5: 年级主任 GRADE_DIRECTOR
 * - 6: 科目组长 SUBJECT_LEADER
 */
export enum ROLE_TYPE {
  TEACHER = 1,
  HEAD_TEACHER = 2,
  STUDENTS = 3,
  PRINCIPAL = 4,
  GRADE_DIRECTOR = 5,
  SUBJECT_LEADER = 6,
}

// 是否为默认角色
export enum ROLE_STATUS {
  IS = 1,
  NO = 0,
}

// 是否为默认学期
export enum DEFAULT_TERM_TYPE {
  YES = 1,
  NO = 0,
}

// 课本类型
export enum TEXTBOOK_TYPE {
  SCHOOL_BOOK = 1,     // 校本课本
  E_BOOK = 2,          // 电子书
  ONLINE_TUTORIAL = 3, // 网络教程
  PERSONAL_BOOK = 4,   // 个人课本
}

// KEYCODE
export enum KEYCODE {
  LEFT = 37,
  RIGHT = 39,
}

export const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
export const JUDGE = ['对', '错'];
export const CHECK = ['自动', '人工'];
export const QUESTION_SCORE_MAXIMUM = 30;  // 题目最大分值
export const QUESTION_SCORE_MINIMUM = 1;   // 题目最小分值
export const QUESTION_DEFAULT_SCORE = 2;   // 默认分数

// 题目来源
export const QUESTION_FROM = [
  // {label: '全部', value: 0},
  {label: '个人题库', value: 1},
  {label: '校本题库', value: 2},
  {label: '公共题库', value: 3},
];

// 题目来源
export enum QUESTION_SOURCE_TYPE {
  PERSON = 1, // 个人
  SCHOOL = 2, // 学校
  PUBLIC = 3, // 公共
}

// 课本来源
export enum BOOK_SOURCE_TYPE {
  PERSON = 1, // 个人
  SCHOOL = 2, // 学校
  PUBLIC = 3, // 公共
}

// 题目难度
export const QUESTION_DIFFICULTY = [
  {label: '全部', value: 0},
  {label: '入门', value: 1},
  {label: '容易', value: 2},
  {label: '中等', value: 3},
  {label: '较难', value: 4},
  {label: '很难', value: 5},
];

// 获取对应数字展示的选择项
export function get_letter(index: number): string {
  return LETTERS[index - 1];
}

// 获取选择项对应展示的数字
export function get_letter_index(letter: string): number {
  if ( LETTERS.indexOf( letter ) === -1 ) {
    console.error('没有对应的选项');
  }
  return LETTERS.indexOf( letter ) + 1;
}

// 批阅类型
export enum Correct_Type {
  unapproved = 1,  // 未批
  approved = 2,  // 已批
}

// 自动批阅 人工批阅
export enum ManOrAutoCorrectType {
  AUTO = 1, // 自动
  MAN = 2,  // 人工
}

// 判断题类型
export enum Judge_Type {
  right = '1',  // 对
  wrong = '2',  // 错
}

// 题目类型、名称
export const QUESTION_TYPE = [
  {label: '单选题', value: 0},
  {label: '多选题', value: 1},
  {label: '判断题', value: 2},
  {label: '填空题', value: 3},
  // {label: '计算题', value: 4},
  {label: '简答题', value: 5},

  // 复合题型
  {label: '听力题', value: 7},
  {label: '完形填空', value: 8},
  {label: '阅读理解', value: 9},
];

// 题目类型
export enum Questions_type {
  single_choice = 0,       // 单选题
  multiple_choice = 1,     // 多选题
  check_question = 2,      // 判断题
  gap_filling = 3,         // 填空题
  calculation_problem = 4, // 计算题
  simple_question = 5,     // 简答题

  // 复合题型
  listening_question = 7,  // 听力题
  cloze_test = 8,          // 完形填空
  reading_comprehension = 9,  // 阅读理解
}

/** 单一题型 */
export const SIMPLE_QUESTIONS = [
  Questions_type.single_choice,
  Questions_type.multiple_choice,
  Questions_type.check_question,
  Questions_type.gap_filling,
  Questions_type.calculation_problem,
  Questions_type.simple_question,
];
/** 复合题 */
export const COMPLEX_QUESTIONS = [
  Questions_type.listening_question,
  Questions_type.cloze_test,
  Questions_type.reading_comprehension,
];

/**
 *  根据作业状态获取对应的题目类型
 */
export function get_question_typename(type: number): string {
  let item: string = '';

  switch ( type ) {
  case Questions_type.single_choice:
    item = '单选题';
    break;
  case Questions_type.multiple_choice:
    item = '多选题';
    break;
  case Questions_type.check_question:
    item = '判断题';
    break;
  case Questions_type.gap_filling:
    item = '填空题';
    break;
  case Questions_type.calculation_problem:
    item = '计算题';
    break;
  case Questions_type.simple_question:
    item = '简答题';
    break;

  // 复合题型
  case Questions_type.listening_question:
    item = '听力题';
    break;
  case Questions_type.cloze_test:
    item = '完形填空';
    break;
  case Questions_type.reading_comprehension:
    item = '阅读理解';
    break;
  default:
  console.warn('没有这个 type 对应的 status: ', type);
  }

  return item;
}

/**
 * 章节树的 props 配置
 */
export const chapter_tree_props = () => ({
  label: 'nodename',
  isLeaf: 'isLeaf',
  children: 'children',
});

/**
 * 知识点树的 props 配置
 */
export const know_tree_props = () => ({
  label: 'knowname',
  isLeaf: 'isLeaf',
  children: 'children',
});
export const sync_know_tree_props = () => ({
  label: 'knowname',
  isLeaf: 'isLeaf',
  children: 'items',
});

/**
 * 课本上下册
 *
 * 1:上册 2:下册
 *
 * @export
 * @enum {number}
 */
export enum TeacherTextbookUpAndDown {
  UP = 1,
  DOWN = 2,
}

/** 作业类型 */
export enum WorkType {
  question = 1,              // 题库作业
  accessory = 2,             // 附件作业
  accessory_no_sheet = 3,    // 无答题卡附件作业
  from_question_preview = 4, // 源自试卷预览的题库作业

  entrance_exam = 9, // 入学考试
}

/** 题型的默认选项个数 */
export function base_qstype_get_answer_number(type: EDU.CreateWorkParamsQuestionbankInfoQsType): number {
  let num = 1;

  switch ( type ) {
  case Questions_type.single_choice:
    num = 3;
    break;
  case Questions_type.multiple_choice:
    num = 3;
    break;
  case Questions_type.check_question:
    num = 2;
    break;
  default:
    num = 1;
  }

  return num;
}

/** 判断是否为客观题 (单选题, 多选题, 判断题) */
export function is_objective_question(type: EDU.CreateWorkParamsQuestionbankInfoQsType): boolean {
  if (type === Questions_type.single_choice) { return true; }
  if (type === Questions_type.multiple_choice) { return true; }
  if (type === Questions_type.check_question) { return true; }
  return false;
}

/** 是单选题或多选题 */
export function is_single_or_multiple_question(type: EDU.CreateWorkParamsQuestionbankInfoQsType): boolean {
  if (type === Questions_type.single_choice || type === Questions_type.multiple_choice) { return true; }
  return false;
}

/** 是复合题 */
export function is_complex_question(type: EDU.CreateWorkParamsQuestionbankInfoQsType): boolean {
  if (type === Questions_type.listening_question
    || type === Questions_type.cloze_test
    || type === Questions_type.reading_comprehension) {

    return true;
  }

  return false;
}

/** 获取题目的批阅类型 */
export function get_question_correct_type(type: Questions_type) {
  switch (type) {
  case Questions_type.single_choice:
    return ManOrAutoCorrectType.AUTO;
  case Questions_type.multiple_choice:
    return ManOrAutoCorrectType.AUTO;
  case Questions_type.check_question:
    return ManOrAutoCorrectType.AUTO;
  case Questions_type.gap_filling:
    return ManOrAutoCorrectType.AUTO;
  case Questions_type.simple_question:
    return ManOrAutoCorrectType.MAN;
  case Questions_type.calculation_problem:
    return ManOrAutoCorrectType.MAN;
  default:
    return ManOrAutoCorrectType.MAN;
  }
}

/** 单选多选最大 answer 个数 */
export const MAX_SINGLE_AND_MULTIPLE_ANSWER_NUMBER = 10;
/** 填空题最大 answer 个数 */
export const MAX_GAP_FILLING_ANSWER_NUMBER = 4;
/** 获取题目最大的 answer 个数 */
export function get_question_max_answer_number(type: Questions_type) {
  switch (type) {
  case Questions_type.single_choice:
    return MAX_SINGLE_AND_MULTIPLE_ANSWER_NUMBER;
  case Questions_type.multiple_choice:
    return MAX_SINGLE_AND_MULTIPLE_ANSWER_NUMBER;
  case Questions_type.check_question:
    return 2;
  case Questions_type.gap_filling:
    return MAX_GAP_FILLING_ANSWER_NUMBER;
  case Questions_type.simple_question:
    return 1;
  case Questions_type.calculation_problem:
    return 1;
  default:
    return 1;
  }
}

// 单个题目最大上传的讲解视频数
export const MAX_UPLOAD_EXPLAIN = 5;
// 讲解视频最大体积
// export const MAX_VIDEO_SIZE = 104857600 * 2; // 200MB
// export const MAX_FILE_SIZE = 104857600 * 2; // 200MB
export const MAX_VIDEO_SIZE = 1024 * 1024 * 1024; // 1gb
export const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1gb

/** 个人中心 页面对应类型 */
export enum SettingType {
  EDIT_DATA = '1',          // 编辑资料
  ACCOUNT_SECURITY  = '2',  // 账号安全
  CLASS_SET  = '3',         // 班级设置
  TEXTBOOK_MANAGE  = '4',   // 课本管理
  COMMON_QUESTION  = '5',   // 常见问题
}

/** 讲解视频格式 */
export enum ExplainVideoType {
  MP4 = 1,
  EVK = 2,
}

export const CommonFileType = [
  'folder',
  'word',
  'pdf',
  'txt',
  'mp3',
  'mp4',
  'picture',
];

/** 导学本 和 备课中心 支持上传的所有类型 */
export const IMPORT_ALL_TYPE = ['asx', 'asf', 'mpg', 'wmv', '3gp', 'mp4', 'mov', 'avi', 'flv', 'swf', 'evk', 'rmvb',
  'docx', 'doc', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'pdf', 'jpg', 'bmp', 'jpeg', 'png', 'gif', 'mp3', 'zip', 'wav', 'rar'];

/** 所有类型分类 - 视频 */
export const SHOW_VIDEO_TYPE = ['asx', 'asf', 'mpg', 'wmv', '3gp', 'mp4', 'mov', 'avi', 'flv', 'rmvb'];

/** 所有类型分类 - 音频 */
export const SHOW_AUDIO_TYPE = ['mp3', 'wav'];

/** 类型展示形式 - 图片 */
export const SHOW_PICTURE_TYPE = ['bmp', 'jpg', 'jpeg', 'png', 'gif', 'docx', 'doc', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'txt'];





/** 支持的视频类型 */
export const NO_MIME_VIDEO_TYPE = ['asx', 'asf', 'mpg', 'wmv', '3gp', 'mp4', 'mov', 'avi', 'flv', 'rmvb'];
/** 支持转换的文件类型 */
export const NO_MIME_FILE_CONVERT_TYPE = ['docx', 'doc', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'txt'];

// 视频类型 'asx', 'asf', 'mpg', 'wmv', '3gp', 'mp4', 'mov', 'avi', 'flv'  对应的 Mime类型 (flv 特殊 flv-application/octet-stream，其它都是 video 开头)
/** 支持的视频 mime 类型 */
export const HAVE_MIME_VIDEO_TYPE = ['x-ms-asf', 'mpeg', 'x-ms-wmv', '3gpp', 'mp4', 'quicktime', 'avi', 'octet-stream', 'vnd.rn-realvideo'];

// 文件需要转换的类型 'docx', 'doc', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'pdf' 对应的 Mime类型
/** 支持转换的文件 mime 类型 */
export const HAVE_MIME_FILE_CONVERT_TYPE = ['vnd.openxmlformats-officedocument.wordprocessingml.document', 'msword', 'vnd.ms-excel', 'vnd.ms-powerpoint',
  'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.openxmlformats-officedocument.presentationml.presentation', 'pdf', 'plain'];

/* --------------------------- 资源库 允许上传的 文件类型  START  ------------------------ */
export const ACCEPT_VIDEO_TYPE = ['.asx', '.asf', '.mpg', '.wmv', '.3gp', '.mp4', '.mov', '.avi', '.flv', '.swf', '.evk', '.rmvb'];
export const ACCEPT_VOICE_TYPE = ['.mp3', '.wav'];
export const ACCEPT_DOCUMENT_TYPE = ['.docx', '.doc', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.pdf'];
export const ACCEPT_PICTURE_TYPE = ['.bmp', '.jpg', '.jpeg', '.png', '.gif'];
export const ACCEPT_OTHER_TYPE = ['.zip', '.rar'];
/* --------------------------- 资源库 允许上传的 文件类型  END  ------------------------ */

/* --------------------------- 资源库、导学本 允许上传的类型， 文字 提示  START  ------------------------ */
export const TIPS_DATA = [
  {label: '视频格式', value: ACCEPT_VIDEO_TYPE.map( (item: string) => item.substring(1)).join(', ')},
  {label: '音频格式', value: ACCEPT_VOICE_TYPE.map( (item: string) => item.substr(1)).join(', ')},
  {label: '文件格式', value: ACCEPT_DOCUMENT_TYPE.map( (item: string) => item.substr(1)).join(', ')},
  {label: '图片格式', value: ACCEPT_PICTURE_TYPE.map( (item: string) => item.substr(1)).join(', ')},
  {label: '其他格式', value: ACCEPT_OTHER_TYPE.map( (item: string) => item.substr(1)).join(', ')},
  {label: '大小', value: '单个文件不超过 ' + MAX_FILE_SIZE / 1048576 + 'M'},
];

/* --------------------------- 资源库、导学本 允许上传的类型， 文字 提示  END  ------------------------ */



// END ------------------------- 资源库文上传文件， 以下两大类型， 真实数据由导学本接口上传  ---------------------


export const PAGE_EMPTY = 'page_empty';

