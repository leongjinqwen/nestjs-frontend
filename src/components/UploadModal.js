import React from 'react'
import { Upload, message, Button, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function UploadModal ({showUpload,uploadVisible}) {
  const props = {
    name: 'file',
    action: 'http://localhost:5000/api/v1/images/upload', // endpoint to upload user images
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
      showUpload()
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
      showUpload()
    }
  }
  return (
    <Modal
      title="Upload Image"
      visible={uploadVisible}
      onCancel={showUpload}
      footer={[
        <Button key="cancel" type="primary" onClick={showUpload}>
          Cancel
        </Button>,
      ]}
    >
      <Upload 
        {...props}
        onChange={handleChange}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Modal>
  )
}
export default UploadModal;