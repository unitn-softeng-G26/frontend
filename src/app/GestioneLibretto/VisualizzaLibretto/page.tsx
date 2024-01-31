"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface Corso {
    id: number;
    nome: string;
    crediti: number;
  }

function viewLibrettoComp()
{
    const [corsi, setCorsi] = useState<Corso[]>([]);

  useEffect(() => {
    // Funzione per ottenere i corsi dall'API
    const getCorsi = async () => {
      try {
        const response = await axios.get('https://ci4.pesaventofilippo.com/api/v1/libretto');
        setCorsi(response.data);
      } catch (error) {
        console.error('Errore nel recupero dei corsi:', error);
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