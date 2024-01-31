'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation'
import Link from 'next/link'
import React from 'react'
import App from './App'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '@/app/globals.css';
import Login from './auth/login/page'

function HomePage()
{
    return(
        <html>
            <body>
                <Login />
            </body>
        </html>
    )
}

export default HomePage;