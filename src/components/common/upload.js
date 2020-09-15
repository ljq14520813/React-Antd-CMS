import React,{useState} from 'react';

import {Upload} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import img from '@/utils/img'

const JQUpload = (props)=>{
    let [loading,setLoading] = useState(false);
    const onChange=(e)=>{
        //对后端响应数据进行过滤
        // console.log(e);
        if (e.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (e.file.status === 'done') {
            setLoading(false);
        }
        if(e.file.response&&e.file.response.data){
            props.onChange(e.file.response.data.url);
            // setLoading(false);
        }
    }
    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="ant-upload-text">图片上传</div>
        </div>
      );
    return (
        <Upload
            name="file"     //这个name是给后端取值用的
            action={img.uploadUrl}  
            method='post'
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            multiple={false}
            // beforeUpload={beforeUpload}
            onChange={onChange}
        >
            {props.value ? <img src={'http://localhost:9999'+props.value} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            {/* <img src={props.value||img.uploadUrl} alt="avatar" style={{ width: '100%' }}/> */}
        </Upload>
    )
}

export default JQUpload;