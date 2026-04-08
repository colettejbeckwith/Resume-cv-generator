// ProgressBar.jsx

import '../styles/ProgressBar.css'

function ProgressBar({ step, setStep, furthestStepReached }) {


    const steps = [
        'Personal',
        'Education',
        'Work History',
        'Other Skills',
        'Review'
    ];
    
    return (
        <section className="progress-bar">
            {steps.map((label, index) => {
                const stepNumber = index + 1;
                const isUnlocked = stepNumber <= furthestStepReached;
                const isActive = stepNumber === step;

                return (
                    <button
                        key={index}
                        type="button"
                        disabled={!isUnlocked}
                        className={isActive ? 'active-step tab' : 'tab'}
                        onClick={() => {
                            if (isUnlocked) setStep(stepNumber);
                        }}
                    >
                        {label}
                    </button>
                );
            })}
        </section>
    );
}

export default ProgressBar