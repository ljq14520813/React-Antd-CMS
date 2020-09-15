import {
    GET_USER_LIST
} from '@/store/storeType'


const initState={
    list:[]
}


export default function userReducer(state=initState,action){
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case GET_USER_LIST:
            newState.list = action.payload;
            return newState;
        default:
            return state;
    }
}
