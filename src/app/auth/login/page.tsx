'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation'
import { Button, Form } from 'antd'
import React from 'react'
import Router from 'next/router';



interface loginRequest
{
    email: string;
    password: string;
}

function Login()
{
    return (
        <div className="mainDiv">
          <h1 style ={ci4Style}>Ci4</h1>
          <br />
          <LoginForm />
        </div>
      );
    }

    const ci4Style: React.CSSProperties = {
        width: '631px',
        height: '141px',
        flexShrink: 0,
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Do Hyeon',
        fontSize: '100px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
      };

function LoginForm()
{
    const onLog = (values: loginRequest) => {console.log(values)};
    return (
        <Form className = 'gap-5' itemID = 'loginForm' layout = 'vertical' onFinish={onLog}>
            <Form.Item name = 'mail' label = 'mail' rules = {[{required: true, message: 'inserire email'}]}>
                <input type = 'email' />
            </Form.Item>

            <Form.Item name = 'password' label = 'password' rules = {[{required: true, message: 'inserire password'}]}>
                <input type = 'password' />
            </Form.Item>

            <Button className ='loginBtn' type = 'primary' htmlType = 'submit' block>
                Login
            </Button>
        </Form>
    )
}
export default Login