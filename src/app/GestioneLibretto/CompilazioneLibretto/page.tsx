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

const LibCompiler: React.FC = () => {
  const [corsiDisponibili, setCorsiDisponibili] = useState<Corso[]>([]);
  const [corsiNelLibretto, setCorsiNelLibretto] = useState<Corso[]>([]);
  const [totalCrediti, setTotalCrediti] = useState<number>(0);

  useEffect(() => {
    const fetchCorsi = async () => {
      try {
        const response = await axios.get('https://ci4.pesaventofilippo.com/api/v1/corsi');
        
        // Verifica se la risposta contiene l'attributo "corsi"
        if (response.data.hasOwnProperty('corsi')) {
          setCorsiDisponibili(response.data.corsi);
        } else {
          console.error('La risposta non contiene l\'attributo "corsi".');
        }
      } catch (error) {
        console.error('Errore nel recupero dei corsi:', error);
      }
    };

    fetchCorsi();
  }, []);

  const handleInserisci = (corso: Corso) => {
    // Rimuovi il corso dall'array dei corsi disponibili
    const nuoviCorsiDisponibili = corsiDisponibili.filter(c => c.id !== corso.id);
    
    // Aggiungi il corso all'inizio dell'array dei corsi nel libretto
    const nuoviCorsiNelLibretto = [corso, ...corsiNelLibretto];

    // Aggiorna il totale dei crediti
    const nuovoTotaleCrediti = totalCrediti + corso.crediti;

    // Aggiorna gli stati
    setCorsiDisponibili(nuoviCorsiDisponibili);
    setCorsiNelLibretto(nuoviCorsiNelLibretto);
    setTotalCrediti(nuovoTotaleCrediti);
  };

  const handleRimuovi = (corso: Corso) => {
    // Rimuovi il corso dall'array dei corsi nel libretto
    const nuoviCorsiNelLibretto = corsiNelLibretto.filter(c => c.id !== corso.id);

    // Aggiungi il corso all'inizio dell'array dei corsi disponibili
    const nuoviCorsiDisponibili = [corso, ...corsiDisponibili];

    // Aggiorna il totale dei crediti
    const nuovoTotaleCrediti = totalCrediti - corso.crediti;

    // Aggiorna gli stati
    setCorsiDisponibili(nuoviCorsiDisponibili);
    setCorsiNelLibretto(nuoviCorsiNelLibretto);
    setTotalCrediti(nuovoTotaleCrediti);

    //codice per la verifica del libretto
  };

  const handleConfermaLibretto = async () => {
    // Verifica se il totale dei crediti è uguale a 180
    if (totalCrediti === 180) {
      // Estrai solo gli ID dei corsi nel libretto
      const idCorsiNelLibretto = corsiNelLibretto.map((corso) => corso.id);

      try {
        // Effettua la chiamata POST all'API con l'array di ID dei corsi nel libretto
        const response = await axios.post(
          'https://ci4.pesaventofilippo.com/api/v1/libretto',
          { corsi: idCorsiNelLibretto }
        );

        console.log('Chiamata POST effettuata con successo:', response.data);
        // Puoi gestire ulteriori azioni qui se necessario
      } catch (error) {
        console.error('Errore nella chiamata POST:', error);
      }
    } else {
      console.log('Il totale dei crediti non è uguale a 180. Impossibile confermare il libretto.');
    }
  };

  return (
    
    <div>
      <div style={{ float: 'left', marginRight: '20px' }}>
        <h2>Corsi Disponibili</h2>
        <ul>
          {corsiDisponibili.map((corso) => (
            <li key={corso.id}>
              {corso.nome} - Crediti: {corso.crediti}
              <button onClick={() => handleInserisci(corso)}>Inserisci</button>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ float: 'left' }}>
        <h2>Corsi nel Libretto</h2>
        <p>Total Crediti: {totalCrediti}</p>
        <ul>
          {corsiNelLibretto.map((corso) => (
            <li key={corso.id}>
              {corso.nome} - Crediti: {corso.crediti}
              <button onClick={() => handleRimuovi(corso)}>Rimuovi</button>
            </li>
          ))}
        </ul>
      </div>
      
      <div style={{ clear: 'both', marginTop: '20px' }}>
        <button onClick={handleConfermaLibretto}>Conferma Libretto</button>
      </div>

    </div>
    
  );
};

export default LibCompiler;

//Link da usare per quando si pubblica il sit

//link per i corsi: https://ci4.pesaventofilippo.com/api/v1/corsi

//link per il libretto: https://ci4.pesaventofilippo.com/api/v1/libretto