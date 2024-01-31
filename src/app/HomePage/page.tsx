'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation'
import Link from 'next/link'
import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '@/app/globals.css';

function HomePage()
{
    return(
        <html>
            <body>
                <div>
                    <Link href='/GestioneLibretto'>Test Gestione Libretto</Link>
                </div>
            </body>
        </html>
    );
}

export default HomePage;