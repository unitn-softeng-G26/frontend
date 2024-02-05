'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation'
import Link from 'next/link'
import React from 'react'
import ReactDOM from 'react-dom';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';
import axios from 'axios';

function testLibretto()
{

    const router = useRouter();
    const handleGoBack = () => {
        router.back(); // Torna indietro nella cronologia di navigazione
      };
    return(
        <html>
            <body>
                <Link href="GestioneLibretto/VisualizzaLibretto">Cliccami per visualizzare il libretto</Link>
                <br />
                <Link href="GestioneLibretto/CompilazioneLibretto">Cliccami per effettuare una nuova compilazione</Link>
                <br />
                <div>
                    <button onClick={handleGoBack}>Torna Indietro</button>
                </div>
            </body>
        </html>
    );
}

export default testLibretto;

