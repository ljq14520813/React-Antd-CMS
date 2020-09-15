import axios from 'axios'
import {message} from 'antd';

let baseURL='http://localhost:9000/api/v1'
const instance = axios.create({
    baseURL: baseURL,
    timeout: 7000,
    headers: {}//这个headers里可以放传给后端的数据
})

//请求拦截器：在请求被发送出去之前，做一些验证工作。
instance.interceptors.request.use(function (config) {
    //加token  ----- token作用：是用户鉴权
    config.headers.Authorization=localStorage.getItem('token')|| ''
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  //响应拦截器：在响应到达之前，先进行数据过滤
instance.interceptors.response.use(function (response) {
    if(response.status === 200){
        if(response.data && response.data.msg){
            // message.success(response.data.msg);
            return response.data;
        }else{
            message.error(response.data.msg);
            // alert('响应被拦截')
        }
    }
    // let code = response.data.err;//数据过滤，根据后端标识字符
    // if(code==0){
    //     return response.data;
    // }else if(code==1){
    //     return response;
    // }else if(code==2){
    //     //
    //     console.log('code==2');
    // }else{
    //     console.log('无err')
    // }

  }, function (error) {
    return Promise.reject(error);
  });

export default instance