import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Image, Card, Badge } from 'antd';
import { LikeFilled, LikeOutlined, DeleteOutlined } from '@ant-design/icons';


function Likes ({image, currentUser, handleDelete}) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(0)
  
  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:5000/api/v1/images/${image._id}/likes`,
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
    })
    .then(result => {
      setLikes(result.data.likes.length)
      setLiked(result.data.liked)
    })
    .catch(error => {
      console.log('ERROR: ', error)
    })
  }, [])

  const handleLike = (id) => {
    axios({
      method: 'POST',
      url: `http://localhost:5000/api/v1/images/${id}/toggle_like`,
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
    })
    .then(result => {
      setLiked(result.data.liked)
      setLikes(result.data.liked ? likes+1 : likes-1)
    })
    .catch(error => {
      console.log('ERROR: ', error.response.data)
    })
  } 
  return (
    <>
     <Card
        key={image._id}
        hoverable
        style={{ width: 300, margin:5 }}
        cover={<Image alt={image._id} src={image.imageUrl} />}
        actions={
          currentUser.id === image.userId ?
            liked ? 
              [<Badge count={likes} size="small" >
                <LikeFilled style={{color:'#08c'}} key="like" onClick={()=>handleLike(image._id)} />
              </Badge>,
              <DeleteOutlined key="delete" onClick={()=>handleDelete(image._id)} />]
              :
              [<Badge count={likes} size="small" >
                <LikeOutlined key="like" onClick={()=>handleLike(image._id)} />
              </Badge>,
              <DeleteOutlined key="delete" onClick={()=>handleDelete(image._id)} />]
          :
            liked ? 
              [<Badge count={likes} size="small" >
                <LikeFilled style={{color:'#08c'}} onClick={()=>handleLike(image._id)} />
              </Badge>]
              :
              [<Badge count={likes} size="small" >
                <LikeOutlined key="like" onClick={()=>handleLike(image._id)} />
              </Badge>]
        }
        bodyStyle={{padding:0}}
      />
    </>
  )
}
export default Likes;