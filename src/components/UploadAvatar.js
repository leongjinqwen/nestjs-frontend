import React from 'react'
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function UploadAvatar () {
  const props = {
    name: 'file',
    action: 'http://localhost:5000/api/v1/users/upload',  // endpoint to uplaod profile image
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  }

  const handleChange = (info)=> {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  return (
    <Upload 
      {...props}
      onChange={handleChange}
    >
      <Button shape="circle" size="small" type="primary" icon={<UploadOutlined />} style={{position:'absolute', bottom:0}} />
    </Upload>
  )
}
export default UploadAvatar;