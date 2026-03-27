// ProgressBar.jsx

import '../styles/ProgressBar.css'

function ProgressBar({ step, setStep }) {

    return (
        <nav>
            <button onClick={() => setStep(1)} className={step === 1 ? 'tab active' : 'tab'}>Personal Info</button>
            <button onClick={() => setStep(2)} className={step === 2 ? 'tab active' : 'tab'}>Education</button>
            <button onClick={() => setStep(3)} className={step === 3 ? 'tab active' : 'tab'}>Work History</button>
            <button onClick={() => setStep(4)} className={step === 4 ? 'tab active' : 'tab'}>Misc.</button>
            <button onClick={() => setStep(5)} className={step === 5 ? 'tab active' : 'tab'}>Submit</button>
        </nav>
    )
}

export default ProgressBar