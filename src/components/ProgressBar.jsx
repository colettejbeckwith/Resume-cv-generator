// ProgressBar.jsx

import '../styles/ProgressBar.css'

function ProgressBar({ step, setStep, furthestStepReached, isNextDisabled }) {


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

                const isFutureStep = stepNumber > step;
                const shouldDisable = !isUnlocked || (isFutureStep && isNextDisabled)

                return (
                    <button
                        key={index}
                        type="button"
                        disabled={shouldDisable}
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