'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation'
import Link from 'next/link'
import React from 'react'
import App from './App'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '@/app/globals.css';

function HomePage()
{
    return(
        <html>
            <body>
                <div>
                    <Link href='/GestioneAppelli/VisualizzaAppelli'>Test Gestione appelli</Link>
                    <br />
                    <Link href='/GestioneLibretto/VisualizzaLibretto'>Test Gestione Libretto</Link>
                    <br />
                    <Link href='auth\login'>Clicca qui per eseguire l'accesso</Link>
                </div>
            </body>
        </html>
    )
}

export default HomePage;