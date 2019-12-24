// BEGIN ******************* 通用 *******************
/** 项目所需软件下载地址，以及微课大师录制视频的上传地址获取 */
export const SOFTWARE_INFO = 'SOFTWARE_INFO';
/** 刷新列表页 */
export const RELOAD_PAGE_LIST = 'RELOAD_PAGE_LIST';
// END ******************* 通用 *******************

// BEGIN ******************* 知识点/课本树 *******************
/** 存储树节点 */
export const SAVE_SHARE_TREE_NODES = 'SAVE_SHARE_TREE_NODES';
/** 存储课本到 global/temp store */
export const SAVE_TEXTBOOK_TO_GOLBAL_STORE = 'SAVE_TEXTBOOK_TO_GOLBAL_STORE';
export const SAVE_TEXTBOOK_TO_TEMP_STORE = 'SAVE_TEXTBOOK_TO_TEMP_STORE';
// END ******************* 知识点/课本树 *******************

// BEGIN ******************* USER *******************
// auth
export const GET_USER_DATA = 'GET_USER_DATA';
export const CLEAN_USER_DATA = 'CLEAN_USER_DATA';
export const USER_TERMS_DATA = 'USER_TERMS_DATA';
export const UPDATE_USER_ROLE = 'UPDATE_USER_ROLE';
// teacher
/** 获取学期 */
export const FETCH_TEACHER_TERMS = 'FETCH_TEACHER_TERMS';
/** 设置当前学期 */
export const SET_CURRENT_TERM = 'SET_CURRENT_TERM';
// END ******************* USER *******************

// BEGIN ******************* 题库 *******************
/** 更新question_state中的基础数据 */
export const QUESTIONS_STATE_MUST_UPDATE = 'QUESTIONS_STATE_MUST_UPDATE';
/** 更新试卷显示样式 */
export const EXAM_STYLE_UPDATE = 'EXAM_STYLE_UPDATE';
/** 更新试卷中的题目 */
export const EXAM_QUESTION_UPDATE = 'EXAM_QUESTION_UPDATE';
/** 新增题目的 history */
export const CREATE_QUESTION_PREPARATION_DATA = 'CREATE_QUESTION_PREPARATION_DATA';
// END ******************* 题库 *******************

// BEGIN ******************* 作业 *******************
/** 创建作业题库导入 */
export const ADD_QUESTIONS_TO_WORK_STORE = 'ADD_QUESTIONS_TO_WORK_STORE';
export const REPLACE_WORK_QUESTIONS = 'REPLACE_WORK_QUESTIONS';
export const ADD_QUESTION_TO_WORK_STORE = 'ADD_QUESTION_TO_WORK_STORE';
export const REPLACE_QUESTION_TO_WORK_STORE = 'REPLACE_QUESTION_TO_WORK_STORE';
export const REMOVE_QUESTION_FROM_WORK_STORE = 'REMOVE_QUESTION_FROM_WORK_STORE';
export const CLEAN_QUESTION_BASE_QUESTION_TYPE = 'CLEAN_QUESTION_BASE_QUESTION_TYPE';
export const CLEAN_WORK_STORE = 'CLEAN_WORK_STORE';
export const WORK_STORE_ITEM_UP = 'WORK_STORE_ITEM_UP';
export const WORK_STORE_ITEM_DOWN = 'WORK_STORE_ITEM_DOWN';
export const EDIT_WORK_BIG_QUESTION_NAME = 'EDIT_WORK_BIG_QUESTION_NAME';
/** 批阅 */
export const GET_CORRECT_STUDENTS_DATA = 'GET_CORRECT_STUDENTS_DATA';
export const SET_CORRECT_CURRENT_CLASS = 'SET_CORRECT_CURRENT_CLASS';
export const SET_CORRECT_CURRENT_STUDENT = 'SET_CORRECT_CURRENT_STUDENT';
export const GET_CORRECT_QUESTIONS_DATA = 'GET_CORRECT_QUESTIONS_DATA';
export const SET_CORRECT_CURRENT_QUESTION = 'SET_CORRECT_CURRENT_QUESTION';
export const SET_STUDENT_CORRECTED = 'SET_STUDENT_CORRECTED';
export const SET_CORRECT_QUESTION_SCORE = 'SET_CORRECT_QUESTION_SCORE';
export const SET_CORRECT_QUESTION_COMMENT = 'SET_CORRECT_QUESTION_COMMENT';
// END ******************* 作业 *******************

// BEGIN ******************* 作业辅导 *******************
/** 作业辅导监控 */
export const SET_COACH_MONITOR_CLASS_ID = 'SET_COACH_MONITOR_CLASS_ID';
export const SET_COACH_MONITOR_CLASS_INFO = 'SET_COACH_MONITOR_CLASS_INFO';
export const SET_COACH_MONITOR_ALL_CLASSID = 'SET_COACH_MONITOR_ALL_CLASSID';
export const SET_COACH_MONITOR_QUESTION_INFO = 'SET_COACH_MONITOR_QUESTION_INFO';
// END ******************* 作业辅导 *******************
