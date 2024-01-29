'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation'
import { Button, Form } from 'antd'
import React from 'react'
import Router from 'next/router';
import Image from 'next/image';
import '@/app/globals.css';

interface loginRequest
{
    email: string;
    password: string;
}

function Login() {
    return (
        <div className="mainDiv">
         
        <Image src="/ci4_logo_homepage.png" alt='logo ci4' width={128} height={69} />
        <br />
        <LoginForm />
      </div>
    );
  }
  


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
