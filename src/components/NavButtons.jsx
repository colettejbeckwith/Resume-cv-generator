// NavButtons.jsx

import '../styles/NavButtons.css'

import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'; 
import ResumeDocument from './ResumeDocument';

function NavButtons({ step, setStep, isNextDisabled, setFurthestStepReached, formData }) {

    const handleNext = () => {
        if (step === 5 || isNextDisabled) return;
        const nextStep = step + 1;
        setStep(nextStep);
        setFurthestStepReached((prev) => Math.max(prev, nextStep));
    };

    const printRef = useRef(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `${formData.personal.name || 'resume'}-resume`,
    });

    if (step === 0) {

        return (
            <section className='nav-buttons'>
                <button onClick={() => setStep(step - 1)} disabled={step === 0} className='hidden-button'>Previous</button>
                <button onClick={handleNext} disabled={step === 5 || isNextDisabled} >Next</button>
            </section>
        )
    }

    if (step === 5) {
        return (
            <>
            <section className='nav-buttons'>
                <button onClick={() => setStep(step - 1)} disabled={step === 0} >Previous</button>
                <button type='submit' onClick={handlePrint}>Generate</button>
            </section>
            <div className='print-only-wrapper'>
                    <div ref={printRef}>
                        <ResumeDocument formData={formData} />
                    </div>
            </div>
            </>
        )

    }

    return (
        <section className='nav-buttons'>
            <button onClick={() => setStep(step - 1)} disabled={step === 0}>Previous</button>
            <button onClick={handleNext} disabled={step === 5 || isNextDisabled}>Next</button>
        </section>
    )
}

export default NavButtons