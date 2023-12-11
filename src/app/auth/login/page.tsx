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
        <html>
            <div className = 'mainDiv'>
                <h1 className = 'width: 631px; height: 141px; flex-shrink: 0;'>Ci4</h1>
                <hr />
                <br />
                <LoginForm />
            </div>
        </html>

    )
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