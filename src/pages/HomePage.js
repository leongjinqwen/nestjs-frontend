import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { Card, Avatar, Row, Col, Typography } from 'antd';
import UserImages from '../containers/UserImages';

const { Title } = Typography;

function HomePage({ currentUser }) {
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
              <Row>
                <Col span={4} style={{textAlign:'center'}}>
                  <Avatar size={80} src={user.profileImage}/>
                  <Title level={5} onClick={()=>history.push(`/users/${user.username}`)}>@{user.username}</Title>
                </Col>
                <Col span={20}>
                  <UserImages userid={user.id} currentUser={currentUser} />
                </Col>
              </Row>
            </Card>
          )
        })
      }
    </>
  );
}

export default HomePage;
