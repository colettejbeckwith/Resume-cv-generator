// StartPage.jsx

import '../../styles/sections.css'

function StartPage({ setStep, setFurthestStepReached }) {
    return (
        <section className='content-pane start-pane'>
            <h2>Add your information and we will generate a resume for you!</h2>
            <button 
                className='start-button' 
                onClick={() => {
                    setStep(1);
                    setFurthestStepReached((prev) => Math.max(prev, 1));
                }}>Start
            </button>
        </section>
    )
}

export default StartPage
