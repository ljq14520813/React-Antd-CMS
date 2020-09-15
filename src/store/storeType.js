//  这些action type都是唯一的
//  会在action生成器和reducer中使用到。（统一放在这便于管理）

export const CHANGE_MSG = 'CHANGE_MSG';
export const TODO_ADD = 'TODO_ADD';
export const TODO_DEL = 'TODO_DEL';
export const TODO_UPD = 'TODO_UPD';
export const TODO_CLEAR = 'TODO_CLEAR';


//用户管理模块
export const GET_USER_LIST = 'GET_USER_LIST';

//商品管理模块
export const GET_ALL_CATES = 'GET_ALL_CATES';
export const GET_GOODS_LIST = 'GET_GOODS_LIST';
