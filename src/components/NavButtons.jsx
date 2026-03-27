// NavButtons.jsx

import '../styles/NavButtons.css'

function NavButtons({ step, setStep }) {

    if (step === 0) {

        return (
            <section className='nav-buttons'>
                <button onClick={() => setStep(step - 1)} disabled={step === 0} className='hidden-button'>Previous</button>
                <button onClick={() => setStep(step + 1)} disabled={step === 5} >Next</button>
            </section>
        )
    }

    if (step === 5) {
        return (
            <section className='nav-buttons'>
                <button onClick={() => setStep(step - 1)} disabled={step === 0} >Previous</button>
                <button onClick={() => setStep(step + 1)} disabled={step === 5} className='hidden-button'>Next</button>
            </section>
        )

    }

    return (
        <section className='nav-buttons'>
            <button onClick={() => setStep(step - 1)} disabled={step === 0}>Previous</button>
            <button onClick={() => setStep(step + 1)} disabled={step === 5}>Next</button>
        </section>
    )
}

export default NavButtons