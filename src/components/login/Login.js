import React,{useEffect} from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import {withRouter} from 'react-router-dom'
import {fetchLogin} from '@/utils/api';
import './style.scss';


function userValid(rule,val){
    return new Promise(async (resolve,reject)=>{
        if(!val){
            rule.message = '用户名为空'
            await reject('用户名为空')
        }else if(!/^[a-z_]/i.test(val)){
            rule.message = '开头必须是字母或者下划线'
            await reject('开头必须是字母或者下划线')
        }else if(!rule.pattern.test(val)){
            rule.message = '长度为6-18位，由数字字母下划线组成'
            await reject('长度为6-18位，由数字字母下划线组成')
        }else{
            await resolve();
        }
    });
}
function psdValid(rule,val){
    return new Promise(async (resolve,reject)=>{
        if(!val){
            rule.message = '密码为空'
            await reject('密码为空')
        }else if(/\s/.test(val)){
            rule.message = '不可有空格'
            await reject('不可有空格')
        }else if(!/^[\w~!@#$%^&*+-/]{6,20}$/.test(val)){
            rule.message = '密码不合要求'
            await reject('密码不合要求')
        }else{
            await resolve();
        }
    });
}
function Login(props){
    // console.log(props);
    useEffect(()=>{
        props.history.replace('/login');
        return undefined;
    },[props.history])
    function onLogin(val){
        message.loading({ content: 'Loading...', key:'login' });
        fetchLogin(val).then(res=>{
            if(!res.err){
                message.success({ content: '登录成功!', key:'login', duration: 2 });
                localStorage.setItem('token',res.data.token);
                props.history.replace('/');
                //让App刷新
                props.onLogin();
            }else{
                message.error({content:'账号或密码不正确',key:'login',duration:2})
                // this.refs.loginForm.resetFields()
            }
        })
    }
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      };
    const tailLayout = {
        wrapperCol: { offset: 4, span:20 },
    };
    return(
        <div className='login'>
            <div className='box'>
                <div className='title'>欢迎登录系统</div>
                <Form
                    {...layout}
                    // ref='loginForm'
                    name="basic"
                    initialValues={{ 
                        username:'',
                        Password:'',
                        remember: false 
                    }}
                    onFinish={onLogin}
                    >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                            { 
                                required: true, 
                                pattern:/^[a-z_][a-z0-9]{5,17}$/i,
                                validator:userValid
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密 码"
                        name="password"
                        rules={[
                            { 
                                required: true,
                                message: '请输入密码',
                                validator:psdValid
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>记住用户名</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default withRouter(Login);