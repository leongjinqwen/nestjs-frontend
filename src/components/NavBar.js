import React, { useState } from 'react'
import { Menu } from 'antd';
import { UploadOutlined, AppstoreOutlined, UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import ShowModal from './Modal';

function NavBar ({ currentUser, setCurrentUser }) {
  const history = useHistory()
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(null)
  
  const showModal = () => {
    setVisible(!visible)
  };

  const handleClick = e => {
    setCurrent(e.key)
    if (e.key === 'item5'){
      showModal()
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setCurrentUser(null)
    history.push("/")
  };
  return (
    <>
      <Menu
        theme='dark'
        style={{ height: '100%' }}
        onClick={handleClick}
        selectedKeys={[current]}
        mode="inline"
      >
        <Menu.Item key='item1' icon={<AppstoreOutlined />} onClick={()=>history.push('/')} >Home</Menu.Item>
        <Menu.Item key='item2' icon={<UploadOutlined />} onClick={()=>history.push('/upload')} >Upload</Menu.Item>
        {
          currentUser ? 
          <>
            <Menu.Item key='item3' icon={<UserOutlined />} onClick={()=>history.push(`/users/${currentUser.username}`)} >Profile</Menu.Item>
            <Menu.Item key='item4' icon={<LogoutOutlined />} onClick={handleLogout} >Logout</Menu.Item>
          </>
          :
          <Menu.Item key='item5' icon={<LoginOutlined />} >Sign In</Menu.Item>
        }
      </Menu>
      <ShowModal showModal={showModal} visible={visible} setCurrentUser={setCurrentUser} />
    </>
  );
}
export default NavBar;
