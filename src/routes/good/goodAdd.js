import React from 'react';


import {connect} from 'react-redux';
import {
    Form, 
    Input, 
    Button, 
    InputNumber,
    Switch,
    message
} from 'antd';
import {Upload} from '@/components';
import { CateSelect } from '../../components';
import {fetchAddGoods,fetchRank,fetchGoodsDetail} from '@/utils/api';
import './style.scss'
const {TextArea} = Input;


function mapStateToProps(state){
    return {
        
    }
}

function mapActionToProps(dispatch){
    return {
       
    }
}


class GoodAdd extends React.Component{
    constructor(props){
        super(props);
        this.state={
            minRank:0,
        };
    }
    componentDidMount(){
        let _id=this.props.location.search.split('=')[1];
        if(_id){
            fetchGoodsDetail({_id}).then(res=>{
                this.refs.form.setFieldsValue({
                    name:res.data.name,
                    desc:res.data.desc,
                    price:res.data.price,
                    cate:res.data.cate,
                    img:res.data.img,
                    hot:res.data.hot,
                    rank:res.data.rank
                });
            })
        }else{
            fetchRank({}).then(res=>{
                this.refs.form.setFieldsValue({
                    rank:res.data+1
                });
                this.setState({
                    minRank : this.refs.form.getFieldValue('rank')
                });
            })
        }
    }
    onFinish(val){
        // console.log('提交表单',val);
        let _id=this.props.location.search.split('=')[1],tip;
        if(_id){
            tip='正在修改';
            val._id=_id;
        }else{
            tip='正在添加';
        }
        message.loading({content:tip,key:'addLoading'});
        fetchAddGoods(val).then(res=>{
            if(_id){
                message.success({ content: res.msg, key:'addLoading', duration: 2 });
                this.props.history.push('/goodList');
                return;
            }
            // console.log('看看修改逻辑');
            message.success({ content: res.msg, key:'addLoading', duration: 2 });
            // this.refs.form.resetFields();
            this.setState({
                minRank : this.refs.form.getFieldValue('rank')
            },()=>{
                // console.log(this,res.data);
                this.refs.form.setFieldsValue({
                    name:'',
                    desc:'',
                    price:0,
                    cate:'',
                    img:'',
                    hot:false,
                    rank:this.refs.form.getFieldValue('rank')+1
                });
            });
            // console.log(this.refs.form.getFieldValue('rank'));
        })
    }
    imgChange(url){
        this.refs.form.setFieldsValue(['img',url])
    }
    cateChange(val){
        this.refs.form.setFieldsValue(['cate',val])
    }
    priceValid(rule,val){
        return new Promise(async (resolve,reject)=>{
            if(!val){
                rule.message = '价格为空'
                await reject('价格为空')
            }else if(/\.+$/.test(val)){
                rule.message = '小数点后最多两位'
                await reject('小数点后最多两位')
            }else if(!rule.pattern.test(val)){
                rule.message = '价格不合规范'
                await reject('价格不合规范')
            }else{
                await resolve();
            }
        });
    }
    goBack(){
        this.props.history.goBack();
    }
    render(){
        let _id=this.props.location.search.split('=')[1];
        const layout = {
            labelCol: {
                span: 5,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 5,
                span: 16,
            },
        };
        return (
            <div className='jq-good-goodAdd'>
                <div className='goodAdd-title'>
                    <h1>{_id?'编辑商品':'商品新增'}</h1>
                    {<Button type="dashed" size='dashed' onClick={this.goBack.bind(this)}>
                        返  回
                    </Button>}
                </div>
                <Form
                    {...layout}
                    name="basic"
                    ref='form'
                    initialValues={{
                        name:'',
                        desc:'',
                        price:0,
                        cate:'',
                        img:'',
                        hot:false,
                        rank:0
                    }}
                    onFinish={this.onFinish.bind(this)}
                    >
                    <Form.Item
                        label="商品名称"
                        name="name"
                        rules={[
                        {
                            required: true,
                            message: '商品名称为空!',
                            whitespace:true,
                            // validator:()=>Promise.reject()
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="商品描述"
                        name="desc"
                        rules={[
                        {
                            required: true,
                            message: '商品描述为空!',
                            whitespace:true
                        },
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        label='商品价格'
                        name='price'
                        // trigger='onChange'
                        // validateTrigger='onBlur'
                        rules={[
                            {
                                required:true,
                                message:'价格错误',
                                pattern:/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
                                validator:this.priceValid
                            }
                        ]}
                    >
                        <InputNumber min={0}
                        />
                    </Form.Item>

                    <Form.Item
                        label='商品品类'
                        name='cate'
                        rules={[
                            {
                                required:true,
                                message:'品类为空'
                            }
                        ]}
                    >
                        <CateSelect onChange={this.cateChange.bind(this)} def/>
                    </Form.Item>

                    <Form.Item
                        label='商品图片'
                        name='img'
                        rules={[
                            {
                                required:true,
                                message:'商品图片为空'
                            }
                        ]}
                    >
                        <Upload 
                            onChange={this.imgChange.bind(this)} 
                        />
                    </Form.Item>

                    <Form.Item
                        label='是否热销'
                        name='hot'
                        valuePropName='checked'
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item
                        label='商品排名'
                        name='rank'
                        rules={[
                            {
                                pattern:/^[1-9]\d*$/,
                                validator:(rule,val)=>{
                                    return new Promise((resolve,reject)=>{
                                        if(!rule.pattern.test(val)){
                                            reject('排名只能是正整数')
                                        }else{
                                            resolve()
                                        }
                                    })
                                }
                            }
                        ]}
                    >
                        <InputNumber min={this.state.minRank} 
                        />
                    </Form.Item>


                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                        提 交
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapActionToProps)(GoodAdd);