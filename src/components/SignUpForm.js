import React from 'react'
import { Form, Input} from 'antd';

const SignUpForm = ({ handleInput }) => {
    const layout = {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 16,
        },
    };
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input name="email" onChange={handleInput} />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input name="username" onChange={handleInput} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password name="password" onChange={handleInput} />
      </Form.Item>

    </Form>
  );
};
export default SignUpForm;