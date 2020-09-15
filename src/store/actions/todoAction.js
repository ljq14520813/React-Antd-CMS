import {
    CHANGE_MSG,
    TODO_ADD,
    TODO_DEL,
    TODO_UPD,
    TODO_CLEAR
} from '@/store/storeType';


function changeMsg(payload){
    return {
        type:CHANGE_MSG,
        payload
    }
}

//  todoList如下
function todoAdd(payload){
    return{
        type:TODO_ADD,
        payload
    }
}
function todoDel(payload){
    return{
        type:TODO_DEL,
        payload
    }
}
function todoUpd(payload){
    return{
        type:TODO_UPD,
        payload
    }
}
function todoClear(payload){
    return{
        type:TODO_CLEAR,
        payload
    }
}


export {
    changeMsg,
    todoAdd,
    todoDel,
    todoUpd,
    todoClear
} ;