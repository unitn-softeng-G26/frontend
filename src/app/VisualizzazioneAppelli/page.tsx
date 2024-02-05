"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@/app/globals.css';
import Router, { useRouter } from 'next/navigation';

interface Appello {
  id: number;
  data: string;
  data_inizio_iscrizione: string;
  data_fine_iscrizione: string;
  aula: string;
}

interface Corso {
  id: number;
  nome: string;
  crediti: number;
}

const AppelliList: React.FC = () => {
  const [appelli, setAppelli] = useState<Appello[]>([]);
  const [corsi, setCorsi] = useState<Corso[]>([]);
  const [messaggiIscrizione, setMessaggiIscrizione] = useState<{ [key: string]: string }>({});

  const router = useRouter();
    const handleGoBack = () => {
        router.back(); // Torna indietro nella cronologia di navigazione
      };

  let idProgressivo = 0;

  const fetchData = async () => {
    try {
      const responseCorsi = await axios.get('https://corsproxy.io/?https%3A%2F%2Fci4.pesaventofilippo.com%2Fapi%2Fv1%2Flibretto');
      setCorsi(responseCorsi.data.corsi);

      const appelliPerCorsi = await Promise.all(
        responseCorsi.data.corsi.map(async (corso: Corso) => {
          try {
            const responseAppelli = await axios.get(`https://ci4.pesaventofilippo.com/api/v1/appelli?corso=${corso.id}`);
            return responseAppelli.data.appelli;
          } catch (error) {
            console.error(`Errore nel recupero degli appelli per il corso ${corso.id}:`, error);
            return [];
          }
        })
      );

      const tuttiGliAppelli = appelliPerCorsi.flat();
      setAppelli(tuttiGliAppelli);
    } catch (error) {
      console.error('Errore nel recupero dei corsi dal libretto:', error);
    }
  };

  useEffect(() => {
    // Funzione per ottenere i corsi dal libretto
    const getCorsiDalLibretto = async () => {
      try {
        const response = await axios.get('https://ci4.pesaventofilippo.com/api/v1/libretto');
        setCorsi(response.data.corsi);
      } catch (error) {
        console.error('Errore nel recupero dei corsi dal libretto:', error);
      }
    };

    // Chiamata alla funzione per ottenere i corsi dal libretto
    getCorsiDalLibretto();
  }, []); // L'array vuoto come secondo argomento assicura che useEffect venga eseguito solo al mount

  useEffect(() => {
    // Funzione per ottenere gli appelli per ogni corso nel libretto
    const fetchAppelliPerCorsi = async () => {
      const appelliPerCorsi = await Promise.all(
        corsi.map(async (corso) => {
          try {
            const response = await axios.get(`https://ci4.pesaventofilippo.com/api/v1/appelli?corso=${corso.id}`);
            return response.data.appelli;
          } catch (error) {
            console.error(`Errore nel recupero degli appelli per il corso ${corso.id}:`, error);
            return [];
          }
        })
      );

      // Unisci tutti gli appelli ottenuti in un unico array
      const tuttiGliAppelli = appelliPerCorsi.flat();
      setAppelli(tuttiGliAppelli);
    };

    // Chiamata alla funzione per ottenere gli appelli per ogni corso nel libretto
    if (corsi.length > 0) {
      fetchAppelliPerCorsi();
    }
  }, [corsi]);

  const iscrivitiAdAppello = async (appelloId: number, messageId: string) => {
    try {
      const response = await axios.post(
        'https://ci4.pesaventofilippo.com/api/v1/appelli/iscrizione',
        { id: appelloId },
        { headers: { 'Content-Type': 'application/json' } }
      );
      // Aggiorna la lista degli appelli dopo l'iscrizione
      fetchData();
      const nuovoMessaggioIscrizione = { ...messaggiIscrizione, [messageId]: response.data.message };
      setMessaggiIscrizione(nuovoMessaggioIscrizione);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response = error.response;
        if (response?.status === 400) {
          console.error('Errore 400 - Dettagli:', response.data || response.statusText);
        } else {
          console.error('Errore durante la richiesta:', response?.data || error.message);
        }
      } else {
        console.error('Errore generico:', error);
      }
      const nuovoMessaggioIscrizione = { ...messaggiIscrizione, [messageId]: 'Errore durante l\'iscrizione' };
      setMessaggiIscrizione(nuovoMessaggioIscrizione);
    }
  };

  const cancellaIscrizioneAdAppello = async (appelloId: number, messageId: string) => {
    try {
      const response = await axios.delete(
        'https://ci4.pesaventofilippo.com/api/v1/appelli/iscrizione',
        { data: { id: appelloId }}
      );
      // Aggiorna la lista degli appelli dopo la cancellazione dell'iscrizione
      fetchData();
      const nuovoMessaggioIscrizione = { ...messaggiIscrizione, [messageId]: response.data.message };
      setMessaggiIscrizione(nuovoMessaggioIscrizione);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response = error.response;
        if (response?.status === 400) {
          console.error('Errore 400 - Dettagli:', response.data || response.statusText);
        } else {
          console.error('Errore durante la richiesta:', response?.data || error.message);
        }
      } else {
        console.error('Errore generico:', error);
      }
      const nuovoMessaggioIscrizione = { ...messaggiIscrizione, [messageId]: 'Errore durante la cancellazione dell\'iscrizione' };
      setMessaggiIscrizione(nuovoMessaggioIscrizione);
    }
  };

  const isDataCorrenteCompresaTraDate = (dataInizio: string, dataFine: string): boolean => {
    const now = new Date();
    const dataInizioIscrizione = new Date(dataInizio);
    const dataFineIscrizione = new Date(dataFine);
    return now >= dataInizioIscrizione && now <= dataFineIscrizione;
  };

  return (
    <html>
    <body>
    <div>
    <h1>Appelli Disponibili</h1>
    <table>
      {/* ... */}
      <tbody>
        {appelli.map((appello) => (
          <tr key={appello.id}>
            {/* ... */}
            <td>
            {isDataCorrenteCompresaTraDate(appello.data_inizio_iscrizione, appello.data_fine_iscrizione) && (
                  <>
                    <button onClick={() => iscrivitiAdAppello(appello.id, `messaggio-${idProgressivo}`)}>Iscriviti</button>
                    <button onClick={() => cancellaIscrizioneAdAppello(appello.id, `messaggio-${idProgressivo}`)}>Cancella Iscrizione</button>
                    <p id={`messaggio-${idProgressivo}`}>{messaggiIscrizione[idProgressivo.toString()]}</p>
                    {idProgressivo++}
                  </>
                )}
            </td>
            {/* ... */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div>
    <button onClick={handleGoBack}>Torna Indietro</button>
  </div>
  </body>
  </html>
  );
};


export default AppelliList;

//Link cors proxy: https://corsproxy.io/?https%3A%2F%2Fci4.pesaventofilippo.com%2Fapi%2Fv1%2Fappelli
//Link per pubblicazione: https://ci4.pesaventofilippo.com/api/v1/appelli
//Link per le iscrizioni/ disiscrizioni: https://ci4.pesaventofilippo.com/api/v1/appelli/iscrizione