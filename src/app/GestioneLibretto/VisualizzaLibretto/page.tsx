"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '@/app/globals.css';
import Router, { useRouter } from 'next/navigation';

interface Corso {
    id: number;
    nome: string;
    crediti: number;
  }

function viewLibrettoComp()
{
    const router = useRouter();
    const [corsi, setCorsi] = useState<Corso[]>([]);

  useEffect(() => {
    // Funzione per ottenere i corsi dall'API
    const getCorsi = async () => {
      try {
        console.log("Vado via 4");
        const response = await axios.get('https://ci4.pesaventofilippo.com/api/v1/libretto');
        console.log("Vado via 1");
        setCorsi(response.data.corsi);
        console.log("Vado via 2 ");
        // Se il libretto è vuoto, reindirizza l'utente
        if (response.data.corsi.length === 0) {
          console.log("Vado via 3");
          router.push('/GestioneLibretto/CompilazioneLibretto');
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          router.replace('/GestioneLibretto/CompilazioneLibretto');
        } else {
          console.error('Errore nel recupero del libretto:', error);
        }
      }
    };

    // Chiamata alla funzione per ottenere i corsi quando il componente viene montato
    getCorsi();
  }, []); // L'array vuoto come secondo argomento assicura che useEffect venga eseguito solo al mount

  return (
    <div>
      <h1>Elenco Corsi</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome Corso</th>
            <th>Crediti</th>
          </tr>
        </thead>
        <tbody>
          {corsi.map((corso) => (
            <tr key={corso.id}>
              <td>{corso.id}</td>
              <td>{corso.nome}</td>
              <td>{corso.crediti}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default viewLibrettoComp;

//linl per prove locali: https://corsproxy.io/?https%3A%2F%2Fci4.pesaventofilippo.com%2Fapi%2Fv1%2Flibretto
//link per pubblicazione: https://ci4.pesaventofilippo.com/api/v1/libretto