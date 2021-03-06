import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { Card, Avatar, Row, Col, Typography } from 'antd';
import UserImages from '../containers/UserImages';
import { PORT } from '../configuration';

const { Title } = Typography;

function HomePage({ currentUser }) {
  const history = useHistory()

  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(`${PORT}/api/v1/users/`)
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
              <Row>
                <Col sm={24} md={4} style={{textAlign:'center'}}>
                  <Avatar size={80} src={user.profileImage}/>
                  <Title level={5} onClick={()=>history.push(`/users/${user.username}`)}>@{user.username}</Title>
                </Col>
                {
                  currentUser ? 
                  <Col sm={24} md={20} >
                    <UserImages userid={user.id} currentUser={currentUser} />
                  </Col>
                  : null
                }
              </Row>
            </Card>
          )
        })
      }
    </>
  );
}

export default HomePage;
