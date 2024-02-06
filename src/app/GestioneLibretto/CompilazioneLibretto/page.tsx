"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '@/app/globals.css';
import Router, { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Corso {
    id: number;
    nome: string;
    crediti: number;
  }

const LibCompiler: React.FC = () => {
  const [corsiDisponibili, setCorsiDisponibili] = useState<Corso[]>([]);
  const [corsiNelLibretto, setCorsiNelLibretto] = useState<Corso[]>([]);
  const [totalCrediti, setTotalCrediti] = useState<number>(0);
  const router = useRouter();
    const handleGoBack = () => {
        router.back(); // Torna indietro nella cronologia di navigazione
      };

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
      const statusMsgElement = document.getElementById('statusMsg');

      if (statusMsgElement) {
          statusMsgElement.style.color = 'red';
        statusMsgElement.innerText = 'Il libretto è stato salvato correttamente!';
      } else {
        console.error('Elemento non trovato con id "statusMsg"');
      }
      const idCorsiNelLibretto = corsiNelLibretto.map((corso) => corso.id);

      try {
        // Effettua la chiamata POST all'API con l'array di ID dei corsi nel libretto
        const response = await axios.post(
          'https://ci4.pesaventofilippo.com/api/v1/libretto',
          { corsi: idCorsiNelLibretto }
        );

        console.log('Chiamata POST effettuata con successo:', response.data);
        // Puoi gestire ulteriori azioni qui se necessario
        router.back();
      } catch (error) {
        console.error('Errore nella chiamata POST:', error);
      }
    } else {
      console.log('Il totale dei crediti non è uguale a 180. Impossibile confermare il libretto.');
      const statusMsgElement = document.getElementById('statusMsg');

      if (statusMsgElement) {
          statusMsgElement.style.color = 'red';
        statusMsgElement.innerText = 'Il totale dei crediti non è uguale a 180. Impossibile confermare il libretto!';
      } else {
        console.error('Elemento non trovato con id "statusMsg"');
      }
      const idCorsiNelLibretto = corsiNelLibretto.map((corso) => corso.id);
    }
  };

  return (
    <html>
      <body>
        <div className='mainDiv'>
        <Image src="/ci4_logo_homepage.png" alt='logo ci4' width={128} height={69} /><br />
      <h1>Ci4{'>'}HomePage{'>'}GestioneLibretto{'>'}CompilazioneLibretto</h1>
          <p>Attenzione: la somma dei crediti data dai corsi presenti nel libretto deve essere uguale a 180</p>
    <div>
      <div style={{ float: 'left', marginRight: '20px', backgroundColor: 'lightslategray', color: 'black', padding: '5px'}}>
        <h2>Corsi Disponibili</h2>
        <div className='mainDiv'>
        <ul>
          {corsiDisponibili.map((corso) => (
            <li key={corso.id}>
              {corso.nome} - Crediti: {corso.crediti}<br/>
              <button className="insertBtn" onClick={() => handleInserisci(corso)}>Inserisci</button>
            </li>
          ))}
        </ul>
        </div>
      </div>

      <div style={{ float: 'left', marginRight: '20px', backgroundColor: 'lightslategray', color: 'black' }}>
        <h2>Corsi nel Libretto</h2>
        <p>Total Crediti: {totalCrediti}</p>
        <div className='mainDiv'>
        <ul>
          {corsiNelLibretto.map((corso) => (
            <li key={corso.id}>
              {corso.nome} - Crediti: {corso.crediti}
              <button onClick={() => handleRimuovi(corso)}>Rimuovi</button>
            </li>
          ))}
        </ul>
        </div>
      </div>
      
      <div style={{ clear: 'both', marginTop: '20px' }}>
        <button className="commonButton" onClick={handleConfermaLibretto}>Conferma Libretto</button>
      </div>

    </div>
    <div>
       <button className="commonButton" onClick={handleGoBack}>Torna Indietro</button>
    </div>
    <p id="statusMsg"></p>
    </div>
    </body>
    </html>
  );
};

export default LibCompiler;

//Link da usare per quando si pubblica il sit

//link per i corsi: https://ci4.pesaventofilippo.com/api/v1/corsi

//link per il libretto: https://ci4.pesaventofilippo.com/api/v1/libretto

//_________

//lik per le modifiche locali: 

//Link per i corsi: https://corsproxy.io/?https%3A%2F%2Fci4.pesaventofilippo.com%2Fapi%2Fv1%2Fcorsi

//link per il libretto: https://corsproxy.io/?https%3A%2F%2Fci4.pesaventofilippo.com%2Fapi%2Fv1%2Flibretto