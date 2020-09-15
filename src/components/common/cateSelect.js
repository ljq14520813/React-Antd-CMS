import React from 'react';
import {Select} from 'antd';
import {getAllCates} from '@/store/actions/goodAction';
import {connect} from 'react-redux';


const {Option} = Select;


class CateSelect extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:false
        }
    }
    componentDidMount(){
        this.props.getCates({});
        if(this.props.def)this.setState({show:true})
    }
    createOptions(){
        let {cates} = this.props;
        return cates.map(ele=>(
            <Option key={ele._id} value={ele.cate}>{ele.cate_zh}</Option>
        ))
    }
    setShow(){
        if(!this.state.show)return;
        this.setState({
            show:false
        })
    }
    render(){
        return(
            <Select style={{ width: 120 }} 
                value={this.props.value}
                onFocus={this.setShow.bind(this)}
                onChange={val=>this.props.onChange(val)}
            >
                {this.state.show&&<Option value='' key={0}>请选择品类</Option>}
                {(this.props.all)&&<Option value='' key={-1}>所有品类</Option>}
                {this.createOptions()}
            </Select>
        )
    }
}

function mapStateToProps(store){
    return {
        cates:store.good.cates
    }
}

function mapActionToProps(dispatch){
    return {
        getCates:params=>dispatch(getAllCates(params))
    }
}




export default connect(mapStateToProps,mapActionToProps)(CateSelect);