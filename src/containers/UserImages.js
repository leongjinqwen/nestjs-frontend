import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row } from 'antd';
import Likes from './Likes';
import { PORT } from '../configuration';


function UserImages ({userid, currentUser}) {
  const [images, setImages] = useState([])
  
  const handleDelete = (id) => {
    axios({
      method: 'DELETE',
      url: `${PORT}/api/v1/images/${id}`,
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
    axios.get(`${PORT}/api/v1/images/${userid}`)
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
        return <Likes key={image._id} image={image} currentUser={currentUser} handleDelete={handleDelete} />
      })
    }
  </Row>
  )
}
export default UserImages;