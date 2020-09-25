import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { Avatar, Row, Col, Typography, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import UploadAvatar from '../components/UploadAvatar';
import UserImages from '../containers/UserImages';
import { PORT } from '../configuration';

const { Title } = Typography;

function ProfilePage({currentUser}) {
  const params = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.get(`${PORT}/api/v1/users/${params.username}`)
    .then(result => {
      setUser(result.data)
    })
    .catch(error => {
      console.log('ERROR: ', error)
    })
  }, [])
  return (
    <>
      <Row>
        <Col span={24} style={{textAlign:'center'}}>
          {
            user ? 
            <>
              <div style={{position:'relative'}}>
                <Avatar size={128} src={user.profileImage} />
                {
                  user.id === currentUser.id ?
                  <UploadAvatar />
                  : null
                }
              </div>
              <Title level={2}>
                @{user.username} 
                <Button shape="circle" type="ghost" icon={<EditOutlined />} style={{verticalAlign:'middle', margin:'0 5px'}} />
                {/* click to show edit modal */}
              </Title>
              <UserImages userid={user.id} currentUser={currentUser}/>
            </>
            :
            null
          }
        </Col>
      </Row>
    </>
  );
}

export default ProfilePage;
