import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { Card, Avatar } from 'antd';

const { Meta } = Card;

function HomePage() {
  const history = useHistory()

  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/users')
    .then(result => {
      setUsers(result.data)
      setIsLoading(!isLoading)
    })
    .catch(error => {
      console.log('ERROR: ', error)
    })
  }, [])
  return (
    <>
      {
        users.map((user,index)=>{
          return (
            <Card
              key={index}
              loading={isLoading}
              hoverable='true'
            >
              <Meta
                avatar={<Avatar src={user.profileImage} />}
                title={user.username}
                onClick={()=>history.push(`/users/${user.username}`)}
              />
            </Card>
          )
        })
      }
    </>
  );
}

export default HomePage;
