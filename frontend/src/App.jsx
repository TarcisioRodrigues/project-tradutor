import { useState } from 'react'
import './App.css'
import api from './service/api';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
 
  const askAssistant = async () => {
     try {
       const response = await api.post('/chat', { question });
       setAnswer(response.data.content);
       console.log("Awui",answer)
     } catch (error) {
       console.error(error);
     }
  };
  const [text, setText] = useState('');
 const [audioUrl, setAudioUrl] = useState('');

 const generateSpeech = async () => {
    try {
      const response = await api.post('/speak', { text });
      setAudioUrl(URL.createObjectURL(new Blob([response.data])));
    } catch (error) {
      console.error(error);
    }
 };
const [audioFile, setAudioFile] = useState(null);
 const [transcription, setTranscription] = useState('');

 const handleFileChange = (event) => {
    setAudioFile(event.target.files[0]);
 };

 const transcribeAudio = async () => {
  try {
    const formData = new FormData();
    formData.append('file', audioFile);
    const response = await api.post('/transcribe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setTranscription(response.data.text);
  } catch (error) {
    console.error(error);
  }
};
 
  return (
     <div className='container'>
      <h1>ChaTradutor de idiomas por voz </h1>
        <input type="text" value={question} onChange={e => setQuestion(e.target.value)} />
       <button onClick={askAssistant}>Pergunte ao Assistente</button>
       <p>{answer}</p>
       

        
       <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={generateSpeech}>Gere Fala</button>
      <audio controls src={audioUrl}></audio>
       
      
      <input type="file" accept=".mp3" onChange={handleFileChange} />
      <button onClick={transcribeAudio}>Transcreva Áudio</button>
      <p>{transcription}</p>
    
     </div> 
  );

}

export default App

