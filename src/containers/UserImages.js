import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Image, Card } from 'antd';
import { LikeOutlined, DeleteOutlined } from '@ant-design/icons';


function UserImages ({userid, currentUser}) {
  const [images, setImages] = useState([])
  
  const handleDelete = (id) => {
    axios({
      method: 'DELETE',
      url: `http://localhost:5000/api/v1/images/${id}`,
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
    })
    .then(result => {
      console.log(result.data)
      setImages(images.filter(image=>image._id!==id))
    })
    .catch(error => {
      console.log('ERROR: ', error.response.data)
    })
  }

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
      images.map((image)=>{
        if (currentUser.id === image.userId) {
          return (
            <Card
              key={image._id}
              hoverable
              style={{ width: 300, margin:5 }}
              cover={<Image alt={image._id} src={image.imageUrl} />}
              actions={[
                <LikeOutlined key="like" />,
                <DeleteOutlined key="delete" onClick={()=>handleDelete(image._id)} />
              ]}
              bodyStyle={{padding:0}}
            />
          )
        }
        return (
          <Card
            key={image._id}
            hoverable
            style={{ width: 300, margin:5 }}
            cover={<Image alt={image._id} src={image.imageUrl} />}
            actions={[
              <LikeOutlined key="like" />,
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