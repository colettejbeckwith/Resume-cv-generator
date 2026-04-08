// NavButtons.jsx

import '../styles/NavButtons.css'

function NavButtons({ step, setStep, isNextDisabled, setFurthestStepReached }) {

    const handleNext = () => {
        if (step === 5 || isNextDisabled) return;
        const nextStep = step + 1;
        setStep(nextStep);
        setFurthestStepReached((prev) => Math.max(prev, nextStep));
    };

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
            <section className='nav-buttons'>
                <button onClick={() => setStep(step - 1)} disabled={step === 0} >Previous</button>
                <button type='submit'>Generate</button>
            </section>
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