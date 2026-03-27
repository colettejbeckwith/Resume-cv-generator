// App.jsx

import { useState } from 'react'
import './styles/App.css'

import ProgressBar from './components/ProgressBar'
import NavButtons from './components/NavButtons'
import ContentBlock from './components/ContentBlock'


function App() {

  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    personal: {},
    education: {},
    work: {},
    misc: {}
  });

  return (
      <div className="app-container">
        <header><h1>Resume/CV Generator</h1></header>
        <main>
          <ProgressBar step={step} setStep={setStep} />
          <ContentBlock step={step} setStep={setStep} formData={formData} setFormData={setFormData} />
          <NavButtons step={step} setStep={setStep} />
        </main>
        <footer>© Beckwith Software Production</footer>
      </div>)
}

export default App
