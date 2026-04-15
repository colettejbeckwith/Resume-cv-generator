// App.jsx

import { useState } from 'react'
import './styles/App.css'

import ProgressBar from './components/ProgressBar'
import NavButtons from './components/NavButtons'
import ContentBlock from './components/ContentBlock'


function App() {

  const [step, setStep] = useState(0);
  const [furthestStepReached, setFurthestStepReached] = useState(0);

  const [formData, setFormData] = useState({
    personal: {
      name: '',
      phone: '',
      email: '',
      city: '',
      title: ''
    },
    education: [
      {
        id: crypto.randomUUID(),
        school: '',
        degree: '',
        major: '',
        minor: '',
        gpa: '',
        startDate: '',
        endDate: '',
        degreeCompleted: false,
        stillAttending: false,
      }
    ],
    work: [
      {
        id: crypto.randomUUID(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        stillEmployed: false,
        responsibility1: '',
        responsibility2: '',
        responsibility3: ''
      }
    ],
    misc: {
      otherSkills: [],
    }
  });

  const invalidEmail =
  formData.personal.email !== '' &&
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personal.email);

  const invalidPhone =
    formData.personal.phone !== '' &&
    !/^\(\d{3}\)\s\d{3}-\d{4}$/.test(formData.personal.phone);

  const personalStepHasErrors = invalidEmail || invalidPhone || !formData.personal.name || !formData.personal.phone || !formData.personal.email;

  const educationStepHasErrors = formData.education.some((edu) => {
    const today = new Date().toISOString().split('T')[0];
    const startAfterToday = edu.startDate && edu.startDate >= today;
    const endBeforeStartDate = edu.startDate && edu.endDate && edu.endDate < edu.startDate;
    const missingRequiredFields = !edu.school || !edu.degree || !edu.major || !edu.startDate || (!edu.stillAttending && !edu.endDate);
    return (missingRequiredFields || startAfterToday || endBeforeStartDate)
  });

  const workHistoryStepHasErrors = formData.work.some((work) => {
    const today = new Date().toISOString().split('T')[0];
    const startAfterToday = work.startDate && work.startDate >= today;
    const endBeforeStartDate = work.startDate && work.endDate && work.endDate < work.startDate;
    const missingRequiredFields = !work.startDate || (!work.endDate && !work.stillEmployed) || !work.company || !work.position || !work.responsibility1;
    return (startAfterToday || endBeforeStartDate || missingRequiredFields)
  });

  const isNextDisabled = (() => {
    switch (step) {
      case 1:
        return personalStepHasErrors;
      case 2:
        return educationStepHasErrors;
      case 3:
        return workHistoryStepHasErrors;
      default:
        return false;
    }
  })();

  return (
      <div className="app-container">
        <header><h1>Resume/CV Generator</h1></header>
        <main>
          <ProgressBar step={step} setStep={setStep} furthestStepReached={furthestStepReached} isNextDisabled={isNextDisabled} />
          <ContentBlock step={step} setStep={setStep} formData={formData} setFormData={setFormData} setFurthestStepReached={setFurthestStepReached} />
          {step !== 0 && (<NavButtons step={step} setStep={setStep} isNextDisabled={isNextDisabled} setFurthestStepReached={setFurthestStepReached} formData={formData} />)}
        </main>
        <footer>© Beckwith Software Production</footer>
      </div>)
}

export default App