// Misc.jsx

import { useState } from 'react'
import '../../styles/sections.css'

function Misc({ formData, setFormData }) {

    const [skillInput, setSkillInput] = useState('');

    const addSkill = () => {
        const trimmedSkill = skillInput.trim();

        if (!trimmedSkill) return

        const alreadyExists = formData.otherSkills.some(
            (skill) => skill.toLowerCase() === trimmedSkill.toLowerCase()
        )

        if (alreadyExists) {
            setSkillInput('')
            return
        }

        setFormData((prev) => ({
            ...prev,
            misc: {
                ...prev.misc,
                otherSkills: [...prev.misc.otherSkills, trimmedSkill]
            }
        }))

        setSkillInput('');
    }

    const removeSkill = (skillToRemove) => {
        setFormData((prev) => ({
            ...prev,
            misc: {
                ...prev.misc,
                otherSkills: prev.misc.otherSkills.filter((skill) => skill !== skillToRemove)
            }
        }))
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addSkill()
        }
    }

    const clearAllSkills = () => {
    setFormData((prev) => ({
        ...prev,
        misc: {
            ...prev.misc,
            otherSkills: []
        }
    }))
    setSkillInput('');
}

    return (
        <section className='content-pane form-content'>

            <h2>Other Skills</h2>
            <section className='label-field-box misc-fields'>
                <div className='skills-input-row'>
                    <input
                        type='text'
                        id='other-skills'
                        className='skill-input'
                        value={skillInput}
                        placeholder='Type a skill'
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        type='button'
                        className='add-skill-button'
                        onClick={addSkill}
                    >
                        Add Skill
                    </button>
                </div>
                <div>
                    {formData.otherSkills.length > 0 && (
                        <button
                            type='button'
                            className='clear-skills-button'
                            onClick={clearAllSkills}
                        >
                            Clear All
                        </button>
                    )}
                </div>
                <section className='skills-list'>
                    {formData.otherSkills.map((skill, index) => (
                        <div key={`${skill}-${index}`} className='skill-pill'>
                            <span>{skill}</span>
                            <button
                                type='button'
                                className='remove-skill-button'
                                onClick={() => removeSkill(skill)}
                                aria-label={`Remove ${skill}`}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </section>
            </section>
            <footer>Add skills one at a time.</footer>
        </section>
    )


    // return (
    //     <section className='content-pane form-content'>
    //         <h2><label htmlFor='other-skills'>Other Skills</label></h2>
    //         <section className='label-field-box misc-fields'>
    //             <textarea 
    //                 className="other-skills" 
    //                 id="other-skills" 
    //                 value={formData.otherSkills} 
    //                 onChange={(e) => 
    //                     setFormData((prev) => ({
    //                         ...prev, 
    //                         misc: {
    //                             ...prev.misc, 
    //                             otherSkills: e.target.value
    //                         }
    //                     }))
    //                 }
    //             />
    //         </section>
    //         <footer>List your skills. Separate them with a comma.</footer>
    //     </section>
    // )
}

export default Misc