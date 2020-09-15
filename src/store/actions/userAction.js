import {
    GET_USER_LIST
} from '@/store/storeType';


import {fetchUsers} from '@/utils/api';


//  异步数据
export function getUsers(params){
    return dispatch=>{
        fetchUsers(params).then(res=>{
            //调接口，派发第二个action
            dispatch({
                type:GET_USER_LIST,
                payload:res.data
            })
        }).catch(err=>{
            //第三次action
            console.log(err);
            dispatch({
                type:GET_USER_LIST,
                payload:[]
            })
        }).finally()
    }
}
