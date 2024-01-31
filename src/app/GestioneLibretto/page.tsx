'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation'
import Link from 'next/link'
import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '@/app/globals.css';
import axios from 'axios';

function testLibretto()
{
    return(
        <html>
            <body>
                <Link href="GestioneLibretto/VisualizzaLibretto">Cliccami per visualizzare il libretto</Link>
                <br />
                <Link href="GestioneLibretto/CompilazioneLibretto">Cliccami per effettuare una nuova compilazione</Link>
            </body>
        </html>
    );
}

export default testLibretto;