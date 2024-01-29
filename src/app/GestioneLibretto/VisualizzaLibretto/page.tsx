'use client'
import React from 'react'
import Link from 'next/link'
import {useState, useEffect} from 'react';
import MyComponent from '@/app/api/MyComponent';
import '@/app/globals.css';

function ViewLibretto()
{
  const oggetto = MyComponent();

    return (
        <html>
            <body>
            <h1>Sono la Gestione Libretti alla sezione di visualizzazione libretto</h1> <br/>
            {oggetto}
            <br />
            <Link href='/'>Torna all'home page</Link>
            </body>
        </html>
    )
}
export default ViewLibretto


{/*
 
    const MyComponent = () => {
        const [corsiData, setCorsiData] = useState<any[]>([]);;
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch('/dati.json');
      
              if (!response.ok) {
                throw new Error('Errore nella richiesta');
              }
      
              const jsonData = await response.json();
              setCorsiData(jsonData);
            } catch (error) {
              console.error('Si è verificato un errore:', error);
            }
          };
      
          fetchData();
        }, []);

    return (
      <div>
        <h1>Elenco Persone:</h1>
        {corsiData ? (
          <ul>
            {corsiData.map((corso, index) => (
              <li key={index}>
                <p>Nome corso: {corso.nome}</p>
                <p>Docente: {corso.docente}</p>
                <p>Crediti: {corso.crediti}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Caricamento...</p>
        )}
      </div>
    )
    };
  */}