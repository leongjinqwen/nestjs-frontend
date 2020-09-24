import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Image, Card } from 'antd';
import { LikeOutlined, DeleteOutlined } from '@ant-design/icons';


function UserImages ({userid}) {
  const [images, setImages] = useState([])
  console.log(userid)
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/images/${userid}`)
    .then(result => {
      setImages(result.data)
    })
    .catch(error => {
      console.log('ERROR: ', error)
    })
  }, [])
  return (
    <Row>
    {
      images.map((image,index)=>{
        return (
          <Card
            key={index}
            hoverable
            style={{ width: 300, margin:5 }}
            cover={<Image alt={image._id} src={image.imageUrl} />}
            actions={[
              <LikeOutlined key="like" />,
              <DeleteOutlined key="delete" />,
            ]}
            bodyStyle={{padding:0}}
          />
        )
      })
    }
  </Row>
  )
}
export default UserImages;