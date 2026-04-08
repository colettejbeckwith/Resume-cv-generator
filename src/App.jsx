// App.jsx

import { useState } from 'react'
import './styles/App.css'

import ProgressBar from './components/ProgressBar'
import NavButtons from './components/NavButtons'
import ContentBlock from './components/ContentBlock'
// import WorkHistory from './components/sections/WorkHistory'


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
      otherSkills: [''],
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
    const invalidGpa = edu.gpa !== '' && (Number(edu.gpa) < 0 || Number(edu.gpa) > 4);
    const startAfterToday = edu.startDate && edu.startDate >= today;
    const endBeforeStartDate = edu.startDate && edu.endDate && edu.endDate < edu.startDate;
    const missingRequiredFields = !edu.school || !edu.degree || !edu.major || !edu.startDate || (!edu.stillAttending && !edu.endDate);
    return (missingRequiredFields || invalidGpa || startAfterToday || endBeforeStartDate)
  });

  const workHistoryStepHasErrors = formData.work.some((work) => {
    const today = new Date().toISOString().split('T')[0];
    const startAfterToday = work.startDate && work.startDate >= today;
    const endBeforeStartDate = work.startDate && work.endDate && work.endDate < work.startDate;
    const missingRequiredFields = !work.startDate || !work.endDate || !work.company || !work.position || !work.responsibility1;
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
          <ProgressBar step={step} setStep={setStep} furthestStepReached={furthestStepReached} />
          <ContentBlock step={step} setStep={setStep} formData={formData} setFormData={setFormData} setFurthestStepReached={setFurthestStepReached} />
          <NavButtons step={step} setStep={setStep} isNextDisabled={isNextDisabled} setFurthestStepReached={setFurthestStepReached} />
        </main>
        <footer>© Beckwith Software Production</footer>
      </div>)
}

export default App

// TODO: add pages to education and work history sections, add review page, generate resume

//text area expands outside the bounds of the page
