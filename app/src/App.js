//import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


function App() {
  const [utente, setUtente] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [partita, setPartita] = useState(false);
  const [nome, setNome] = useState("");
  const [inCaricamento, setInCaricamento] = useState(false);
  const [numero, setNumero] = useState("");
  const [result, setResult] = useState([]);

  async function name(){
    await fetch('http://localhost:8080/partita',
      {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome: nome})
      }
    );
    setShowForm(false);
  }

  async function invia(){
    const response = await fetch('http://localhost:8080/partita/${partita.id}',
      {
        method: "PUT" ,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({numero: Number}),
      });

      const r = await response.JSON();
      setResult(r);
  }

  async function start(){
    const response = await fetch('http://localhost:8080/partita',
    {
      method: "POST" ,
      headers: {'Content-Type': 'application/json'},

    });

    const r = await response.JSON();
    setPartita(r);
  }

  function gestisciCambioNome(e) {
    setNome(e.target.value);
  }

  return (
    <div className="App">
      <h1>GIOCO DELL'INDOVINA NUMERO</h1>
      <button onClick={() => setShowForm(true)}>Inserisci nome utente</button>
      { showForm &&
        <div>
          <h1>FORM DI INSERIMENTO</h1>
          <div>Nome: <input type='text' onChange={gestisciCambioNome} value={nome} placeholder="inserisci il nome"></input></div>
          <br></br>
          <button onClick={name}>SALVA</button>
          <br></br>
          <br></br>
        </div>  
      }      
      <button onClick={() => setShowForm(true)}>INIZIA LA PARTITA</button>
      { showForm &&
        <div>
          <p> ID: {partita.id}</p>
        </div>
      }
      { result.risultato === 0 &&
        <p>hai indovinato il numero</p>
      }
      { result.risultato === 1 &&
        <p>numero troppo grande</p>
      }
      { result.risultato === -1 &&
        <p>numero troppo piccolo</p>
      }
      
      
      
    </div>
  );
}

export default App;
