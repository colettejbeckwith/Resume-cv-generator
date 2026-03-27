// ContentBlock.jsx

import '../styles/ContentBlock.css'

import StartPage from './sections/StartPage'
import PersonalInfo from './sections/PersonalInfo'
import Education from './sections/Education'
import WorkHistory from './sections/WorkHistory'
import Misc from './sections/Misc'
import Submit from './sections/Submit'

function ContentBlock({ step, setStep, formData, setFormData }) {
    
    // start
    if (step === 0) return <StartPage setStep={setStep} />;

    // personal info
    if (step === 1) return <PersonalInfo formData={formData.personal} setFormData={setFormData} />;

    // education
    if (step === 2) return <Education formData={formData.education} setFormData={setFormData} />;

    // work history
    if (step === 3) return <WorkHistory formData={formData.work} setFormData={setFormData} />;

    // misc
    if (step === 4) return <Misc formData={formData.misc} setFormData={setFormData}/>;

    // submit
    if (step === 5) return <Submit formData={formData}/>;
}

export default ContentBlock