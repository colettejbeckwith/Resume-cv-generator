// StartPage.jsx

import '../../styles/sections.css'

function StartPage({ setStep }) {
    return (
        <section className='content-pane'>
            <button onClick={() => setStep(1)}>Start Page</button>
        </section>
    )
}

export default StartPage
