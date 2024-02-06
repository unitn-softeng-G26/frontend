'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation'
import Link from 'next/link'
import React from 'react'
import ReactDOM from 'react-dom';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';
import Image from 'next/image';
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
                <div className='mainDiv'>
                    <Image src="/ci4_logo_homepage.png" alt='logo ci4' width={128} height={69} /><br />
                    <h1>Ci4{'>'}HomePage{'>'}GestioneLibretto</h1><br />
                    <Link href="GestioneLibretto/VisualizzaLibretto">Clicca qui per visualizzare il tuo bretto</Link>
                    <br />
                    <Link href="GestioneLibretto/CompilazioneLibretto">Compila ora il tuo libretto</Link>
                    <br />
                    <div>
                        <button className="commonButton" onClick={handleGoBack}>Torna Indietro</button>
                    </div>
                </div>
            </body>
        </html>
    );
}

export default testLibretto;

