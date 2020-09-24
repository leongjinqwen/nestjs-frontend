import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { Modal, Button, message } from 'antd';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

function ShowModal({ visible, showModal, setCurrentUser }) {
  const history = useHistory()
  const [showLogin, setShowLogin] = useState(true)
  const [details, setDetails] = useState({})

  const toggleForm = () => {
    setShowLogin(!showLogin)
  }
  const handleSubmit = () => {
    if (!showLogin){
      // to sign up
      axios({
        method: 'POST',
        url: 'http://localhost:5000/api/v1/users/',
        data: {
          username: details.username,
          email: details.email,
          password: details.password
        }
      })
      .then(result => {
        setDetails({})
        toggleForm()
        message.success(result.data.message)
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      // to sign in
      axios({
        method: 'POST',
        url: 'http://localhost:5000/api/v1/auth/login',
        data: {
          username: details.username,
          password: details.password
        }
      })
      .then(result => {
        setDetails({})
        showModal()
        setCurrentUser(result.data.user)
        localStorage.setItem('token',result.data.access_token)
        localStorage.setItem('user',JSON.stringify(result.data.user))
        history.push(`/users/${result.data.user.username}`)
      })
      .catch(error => {
        console.log('ERROR: ', error.response.data)
      })
    }
  }
  
  const handleInput = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Modal
        title={showLogin ? "Sign In" : "Sign Up"}
        visible={visible}
        onCancel={showModal}
        footer={[
          <Button key="toggle" onClick={toggleForm}>
            {showLogin ? "Sign Up Now!" : "Sign In Now"}
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        {
          showLogin ? 
            <SignInForm handleInput={handleInput}/>
          :
            <SignUpForm handleInput={handleInput}/>
        }
      </Modal>
    </>
  );
}
export default ShowModal;
