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
  const [appelli, setAppelli] = useState([]);

  useEffect(() => {
    // Funzione per ottenere i corsi dal libretto
    const getCorsiDalLibretto = async () => {
      try {
        const response = await axios.get('https://ci4.pesaventofilippo.com/api/v1/libretto');
        const corsiIds : number[] = response.data.corsi.map((corso: Corso) => corso.id);
        // Ora puoi utilizzare gli ID dei corsi per ottenere gli appelli
        fetchAppelli(corsiIds);
      } catch (error) {
        console.error('Errore nel recupero dei corsi dal libretto:', error);
      }
    };

    // Funzione per ottenere gli appelli in base agli ID dei corsi
    const fetchAppelli = async (corsiIds: number[]) => {
      try {
        const queryParams = corsiIds.map(id => `corsi[]=${id}`).join('&');
        const apiUrl = `https://ci4.pesaventofilippo.com/api/v1/appelli?${queryParams}`;
        const response = await axios.get(apiUrl);
        setAppelli(response.data.appelli);
      } catch (error) {
        console.error('Errore nel recupero degli appelli:', error);
      }
    };

    // Chiamata alla funzione per ottenere i corsi dal libretto
    getCorsiDalLibretto();
  }, []); // L'array vuoto come secondo argomento assicura che useEffect venga eseguito solo al mount

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

/*
const AppelliList: React.FC = () => {
  const [appelli, setAppelli] = useState([]);

  useEffect(() => {
    const [appelli, setAppelli] = useState([]);

  useEffect(() => {
    // Funzione per ottenere i corsi dal libretto
    const getCorsiDalLibretto = async () => {
      try {
        const response = await axios.get('https://corsproxy.io/?https%3A%2F%2Fci4.pesaventofilippo.com%2Fapi%2Fv1%2Flibretto');
        const corsiIds = response.data.corsi.map((corso) => corso.id);
        // Ora puoi utilizzare gli ID dei corsi per ottenere gli appelli
        fetchAppelli(corsiIds);
      } catch (error) {
        console.error('Errore nel recupero dei corsi dal libretto:', error);
      }
    };

    // Funzione per ottenere gli appelli in base agli ID dei corsi
    const fetchAppelli = async (corsiIds) => {
      try {
        const queryParams = corsiIds.map(id => `corsi[]=${id}`).join('&');
        const apiUrl = `https://ci4.pesaventofilippo.com/api/v1/appelli?${queryParams}`;
        const response = await axios.get(apiUrl);
        setAppelli(response.data.appelli);
      } catch (error) {
        console.error('Errore nel recupero degli appelli:', error);
      }
    };

    // Chiamata alla funzione per ottenere i corsi dal libretto
    getCorsiDalLibretto();
  }, []);

  return (
    <div>
      <h1>Appelli Disponibili</h1>
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
          {appelli.map((appello) => (
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
    </div>
  );
  
};

export default AppelliList;
*/
//Link cors proxy: https://corsproxy.io/?https%3A%2F%2Fci4.pesaventofilippo.com%2Fapi%2Fv1%2Fappelli
//Link per pubblicazione: https://ci4.pesaventofilippo.com/api/v1/appelli