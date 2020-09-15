import {
    CHANGE_MSG,
    TODO_ADD,
    TODO_DEL,
    TODO_UPD,
    TODO_CLEAR
} from '@/store/storeType';

//初始化state
const initState = {
    msg:'1000',
    list:[{id:1,task:'吃饭'},{id:2,task:'睡觉'}]
}

function todoReducer(state=initState,action){
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case CHANGE_MSG:
            //  方法一，ES6解构赋值
            // let newState = {...state};
            //  方法二：js的Object.assign方法
            // let newState = Object.assign({},state);
            //  方法三
            newState.msg = action.payload;
            return newState;
        case TODO_ADD:
            //  厚道action.type=add 要向list中添加一条数据
            //  先对state深复制，得到一个新的newState
            //  newState.list.push(action.payload)
            //  最后return newState
            newState.list.push(action.payload);
            return newState;
        case TODO_DEL:
            // newState.list.splice(action.payload,1);
            newState.list =newState.list.filter(ele=>ele.id!==action.payload);
            return newState;
        case TODO_UPD:
            newState.list.map(ele=>{
                if(ele.id===action.payload.id){
                    ele.task=action.payload.task;
                }
                return null;
            })
            return newState;
        case TODO_CLEAR:
            newState.list = [];
            return newState;
        default:
            return state;
    }
}

export default todoReducer;