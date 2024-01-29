import React, {useState, useEffect} from 'react';
import '@/app/globals.css';

interface corso{
    name: String,
    docente: String,
    crediti: number
};

interface CorsoProps {
  corsoID: number;
  nome: string;
  docente: string;
  crediti: number;
}

function Corso(props: CorsoProps): React.ReactElement {
  const { corsoID, nome, docente, crediti } = props;

  return (
    <div key={corsoID} className = 'grid grid-cols-2 contDiv'>
      <div className='fl'>
        <p>Identificativo corso: {corsoID}</p>
        <p>Nome del docente: {docente}</p>
      </div>

      <div className = 'fr'>
        <p>Nome del corso: {nome}</p>
        <p>Peso in crediti: {crediti}</p>
      </div>

    </div>
  );
}

{/*
function Corso(corsoID:  number, nome: string, docente: string, crediti: number)
{
    return (
        <div key={corsoID}>
            <p>Identificativo corso: {corsoID}</p> 
            <p>Nome del corso: {nome}</p>
            <p>Nome del docente: {docente}</p> 
            <p>Peso in crediti: {crediti}</p>
        </div>
    )
}
*/}

const MyComponent = () => {
    const [corsiData, setCorsiData] = useState<any[]>([]);;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/corsi.json');
  
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
    {corsiData.map((corso, index) => (
      <Corso key={index} corsoID ={index} nome={corso.nome} docente={corso.docente} crediti = {corso.crediti}/>

    ))}
  </div>
)
};

export default MyComponent