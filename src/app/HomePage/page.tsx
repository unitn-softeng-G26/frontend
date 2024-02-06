'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation'
import Link from 'next/link'
import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '@/app/globals.css';

function HomePage()
{
    const [displayName, setDisplayName] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://ci4.pesaventofilippo.com/api/v1/utente');
        setDisplayName(response.data.displayName);
      } catch (error) {
        console.error('Errore durante il recupero dei dati utente:', error);
      }
    };

    fetchUserData();
  }, []);    

    return(
        <html>
            <body>
                <div>
                    <Image src="/ci4_logo_homepage.png" alt='logo ci4' width={128} height={69} />
                    <h1>Ci4{'>'}HomePage</h1>
                    <p>Benvenuto/a {displayName}</p>
                    <Link href='/GestioneLibretto'>Gestione Libretto</Link>
                    <br />
                    <Link href='/VisualizzazioneAppelli'>Visualizza gli appelli</Link>
                </div>
            </body>
        </html>
    );
}

export default HomePage;