import {
    GET_ALL_CATES,
    GET_GOODS_LIST
}from '../storeType';

import {fetchAllCates,fetchGoodsList}from '@/utils/api';

export function getAllCates(params){
    return function(dispatch){
        fetchAllCates(params).then(res=>{
            dispatch({
                type:GET_ALL_CATES,
                payload:res.data
            })
        })
    }
}

export function getGoodsList(params){
    return async function(dispatch){
        await fetchGoodsList(params).then(res=>{
            // console.log(res.data);
            dispatch({
                type:GET_GOODS_LIST,
                payload:res.data
            })
        })
        return new Promise(function(resolve,reject){
            resolve();
        });
    }
}
