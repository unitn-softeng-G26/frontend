'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation'
import { Button, Form } from 'antd'
import React, { ChangeEvent } from 'react'
import Router from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import {useState} from 'react';
import Input from 'antd/es/input/Input';

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
    //newAdds
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    
    const handleLogin = async () => {
        try{
            const response = await axios.post('https://ci4.pesaventofilippo.com/api/v1/login', {    username: username,
            password: password
            
        });
        console.log("Risposta del server: ",response.data);
        }catch(error)
        {
            console.error("Errore durante il login: ",error);
        }
        console.log('username: ',username, " e password: ", password);
    };

    //const onLog = (values: loginRequest) => {console.log(values)};
    return (
        <Form className = 'gap-5' itemID = 'loginForm' layout = 'vertical' /*onFinish={onLog}*/>
            <Form.Item name = 'email'  label = 'mail' rules = {[{required: true, message: 'inserire email'}]}>
                <Input type = 'email' onChange={handleUsernameChange} />
            </Form.Item>

            <Form.Item name = 'password' label = 'password' rules = {[{required: true, message: 'inserire password'}]}>
                <Input type = 'password' onChange={handlePasswordChange} />
            </Form.Item>

            <Button className ='loginBtn' type = 'primary' htmlType = 'submit' onClick={handleLogin} block>
                Login
            </Button>
        </Form>
    )


}
/*
function LoggingIn()
{
        const onLog = async (values: loginRequest) => {
            try{
                const response = await axios.post('https://ci4.pesaventofilippo.com/api/v1/login', {    username: values.email,
                password: values.password
                
            });
            console.log('username: ',values.email, " e password: ", values.password, " ", response.data.token);
            }catch(error)
            {
                console.error(error);
            }
        };
}*/
export default Login;