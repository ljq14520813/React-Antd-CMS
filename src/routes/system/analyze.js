import React from 'react';


import {connect} from 'react-redux';
import {getUsers} from '@/store/actions/userAction';
// import { fetchUsers } from '../../utils/api';


function mapStateToProps(state){
    return {
        user:state.user.list
    }
}

function mapActionToProps(dispatch){
    return {
        //  触发异步action的第一次
        init:(params)=>dispatch(getUsers(params))
        // init:params=>{
        //     dispatch(dispatch=>{
        //         fetchUsers(params).then(res=>{
        //             dispatch({
        //                 type:'GET_USER_LIST',
        //                 payload:res.data
        //             })
        //         }).catch(err=>{
        //             dispatch({
        //                 type:'GET_USER_LIST',
        //                 payload:[]
        //             })
        //         })
        //     })
        // }
    }
}

class Analyze extends React.Component{
    constructor(props){
        super(props);
        this.state={

        };
    }
    componentDidMount(){
        //  触发调接口的action
        this.props.init();
        // console.log(this.props);
    }
    createUserList(){
        let {user} = this.props;
        return user.map(ele=>(
            <div key={ele._id}>
                <span>{ele._id}</span>
                <span>-----</span>
                <span>{ele.username}</span>
            </div>
        ))
    }
    render(){
        return (
            <div className='jq-system-analyze'>
                <h1>数据分析</h1>
                {this.createUserList()}
            </div>
        )
    }
}

export default connect(mapStateToProps,mapActionToProps)(Analyze);