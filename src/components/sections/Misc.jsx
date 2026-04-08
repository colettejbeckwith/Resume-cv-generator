// Misc.jsx

import '../../styles/sections.css'

function Misc({ formData, setFormData }) {
    return (
        <section className='content-pane form-content'>
            <h2>Other Skills</h2>
            <section className='label-field-box misc-fields'>
                {/* <label htmlFor="other-skills">Other Skills:</label> */}
                <textarea id="other-skills" value={formData.otherSkills} onChange={(e) => setFormData((prev) => ({...prev, misc: {...prev.misc, otherSkills: e.target.value}}))}></textarea>
            </section>
        </section>
    )
}

export default Misc

// otherRemarks