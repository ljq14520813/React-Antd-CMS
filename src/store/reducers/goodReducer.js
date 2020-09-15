import {
    GET_ALL_CATES,
    GET_GOODS_LIST
}from '../storeType';

const initState={
    cates:[],
    list:[],
    total:0
}

function goodReducer(state=initState,action){
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case GET_ALL_CATES:
            newState.cates=action.payload;
            return newState;
        case GET_GOODS_LIST:
            newState.list=action.payload.list;
            newState.total=action.payload.total;
            return newState;
        default:
            return state
    }
}


export default goodReducer;