"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@/app/globals.css';

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

  return (
    <div>
      <h1>Appelli Disponibili</h1>
      <table>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Data Inizio Iscrizione</th>
            <th>Data Fine Iscrizione</th>
            <th>Aula</th>
          </tr>
        </thead>
        <tbody>
          {appelli.map((appello: Appello) => (
            <tr key={appello.id}>
              <td>{appello.id}</td>
              <td>{appello.data}</td>
              <td>{appello.data_inizio_iscrizione}</td>
              <td>{appello.data_fine_iscrizione}</td>
              <td>{appello.aula}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </table>
    </div>
  );
};


export default AppelliList;

//Link cors proxy: https://corsproxy.io/?https%3A%2F%2Fci4.pesaventofilippo.com%2Fapi%2Fv1%2Fappelli
//Link per pubblicazione: https://ci4.pesaventofilippo.com/api/v1/appelli