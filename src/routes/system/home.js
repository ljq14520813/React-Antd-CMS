import React from 'react';
//  这是一个高阶组件(高级函数),它的返回值是一个高阶函数
import {connect} from 'react-redux';
import {
    changeMsg,
    todoAdd,
    todoDel,
    todoUpd,
    todoClear
} from '@/store/actions/todoAction';


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={

        };
    }
    componentDidMount(){
        // console.log(this.props);
    }
    changeMsg(){
        //  dispatch一个action，发到store中
        //  store中收到发给reducer进行深复制
        this.props.change(Number(this.props.msg)+1);
    }
    addHandle(){
        this.props.add({
            id:Date.now(),
            task:'新创建的一个任务'
        })
    }
    delHandle(id){
        this.props.del(id);
    }
    updateHandle(id){
        this.props.upd({
            id,
            task:'修改的内容'
        });
    }
    clearHandle(){
        this.props.clear();
    }
    createList(){
        let {list} = this.props;
        return list.map(ele=>(
            <div key={ele.id}>
                <span>{ele.id}</span>
                <span>----</span>
                <span onClick={this.updateHandle.bind(this,ele.id)}>{ele.task}</span>
                <button onClick={this.delHandle.bind(this,ele.id)}>删除</button>
            </div>
        ))
    }
    render(){
        return (
            <div className='jq-system-home'>
                <h1>首页</h1>
                <h3>{this.props.msg}</h3>
                <button onClick={this.changeMsg.bind(this)}>实验</button>
                <hr></hr>
                <button onClick={this.addHandle.bind(this)}>添加</button>
                <button onClick={this.clearHandle.bind(this)}>清空</button>
                {this.createList()}
            </div>
        )
    }
}

//  把store中需要共享的数据变成  this.props的方式进行访问
function mapStateToProps(store){
    return{
        msg:store.todo.msg,
        list:store.todo.list
    }
}

//  把外部的actions生成器方法，映射到this.props上。
function mapActionToProps(dispatch){
    return{
        change:payload=>dispatch(changeMsg(payload)),
        add:payload=>dispatch(todoAdd(payload)),
        del:payload=>dispatch(todoDel(payload)),
        upd:payload=>dispatch(todoUpd(payload)),
        clear:payload=>dispatch(todoClear(payload))
    }
}

export default connect(mapStateToProps,mapActionToProps)(Home);