// Education.jsx

import '../../styles/sections.css'

function Education({ formData, setFormData }) {
    return (
        <section className='content-pane form-content'>
            <h2>Education</h2>
            {formData.map((edu, index) => {
                const today = new Date().toISOString().split('T')[0];
                const startAfterToday = edu.startDate && edu.startDate >= today;
                const endBeforeStart = edu.startDate && edu.endDate && edu.endDate < edu.startDate;
                const invalidGpa = edu.gpa !== '' && (Number(edu.gpa) < 0 || Number(edu.gpa) > 4);
                return (
                    <section key={index} className='label-field-box education-fields'>

                        <label htmlFor="school-name"><b className='required-star'>*</b>School Name: </label>
                        <input
                            type="text" 
                            id='school-name' 
                            required 
                            value={edu.school} 
                            onChange={(e) => 
                                setFormData((prev) => ({
                                    ...prev,
                                    education: prev.education.map((item, i) =>
                                        i === index ? { ...item, school: e.target.value } : item
                                    )
                                }))
                            }
                        />
                        
                        <label htmlFor="degree"><b className='required-star'>*</b>Degree Type:</label>
                        <input 
                            type="text" 
                            id="degree" 
                            required 
                            value={edu.degree} 
                            onChange={(e) => 
                                setFormData((prev) => ({
                                    ...prev,
                                    education: prev.education.map((item, i) =>
                                        i === index ? { ...item, degree: e.target.value } : item
                                    )
                                }))
                            }
                        />

                        <label htmlFor="major"><b className='required-star'>*</b>Major:</label>
                        <input 
                            type="text" 
                            id='major'
                            required
                            value={edu.major} 
                            onChange={(e) => 
                                setFormData((prev) => ({
                                    ...prev,
                                    education: prev.education.map((item, i) =>
                                        i === index ? { ...item, major: e.target.value } : item
                                    )
                                }))
                            }
                        />

                        <label htmlFor="gpa">GPA:</label>
                        <div className="field-with-error">
                            <input
                                className={invalidGpa ? 'input-error' : ''}
                                type="number"
                                id='gpa'
                                min="0.0"
                                max="4.0"
                                step="0.1"
                                value={edu.gpa}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        education: prev.education.map((item, i) =>
                                            i === index ? { ...item, gpa: e.target.value } : item
                                        )
                                    }))
                                }
                            />
                            {invalidGpa && (
                            <p className="field-error">GPA must be between 0.0 and 4.0.</p>
                            )}
                        </div>

                        

                        <label htmlFor="minor">Minor:</label>
                        <input 
                            type="text" 
                            id='minor' 
                            value={edu.minor} 
                            onChange={(e) => 
                                setFormData((prev) => ({
                                    ...prev,
                                    education: prev.education.map((item, i) =>
                                        i === index ? { ...item, minor: e.target.value } : item
                                    )
                                }))
                            }
                        />

                        <label htmlFor="start-date"><b className='required-star'>*</b>Start Date:</label>
                        <div className="field-with-error">
                            <input
                                className={startAfterToday ? 'input-error' : ''}
                                type="date"
                                id='start-date'
                                required
                                value={edu.startDate}
                                max={today}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        education: prev.education.map((item, i) =>
                                            i === index ? { ...item, startDate: e.target.value } : item
                                        )
                                    }))
                                }
                            />
                            {startAfterToday && (
                                <p className="field-error">Start date must be before today.</p>
                            )}
                        </div>


                        <label htmlFor="still-attending">Still attending?</label>
                        <input 
                            className='checkbox-style' 
                            type="checkbox" 
                            id='still-attending' 
                            checked={edu.stillAttending} 
                            onChange={(e) => 
                                setFormData((prev) => ({
                                    ...prev,
                                    education: prev.education.map((item, i) =>
                                        i === index ? { ...item, stillAttending: e.target.checked, endDate: e.target.checked ? '' : item.endDate, degreeCompleted: e.target.checked ? false : item.degreeCompleted, } : item
                                    )
                                }))
                            }
                        />

                        <label htmlFor="end-date"><b className='required-star'>*</b>End date:</label>
                        <div className="field-with-error">
                            <input
                                className={endBeforeStart && !edu.stillAttending ? 'input-error' : ''}
                                type="date"
                                id='end-date'
                                value={edu.endDate}
                                required={!edu.stillAttending}
                                min={edu.startDate || undefined}
                                disabled={edu.stillAttending}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        education: prev.education.map((item, i) =>
                                            i === index ? { ...item, endDate: e.target.value } : item
                                        )
                                    }))
                                }
                            />
                            {endBeforeStart && !edu.stillAttending && (
                                <p className="field-error">End date must be after start date.</p>
                            )}
                        </div>

                        <label htmlFor="degree-completed">Degree Obtained?</label>
                        <input 
                            className='checkbox-style' 
                            type="checkbox" 
                            id='degree-completed' 
                            checked={edu.degreeCompleted} 
                            onChange={(e) => 
                                setFormData((prev) => ({
                                    ...prev,
                                    education: prev.education.map((item, i) =>
                                        i === index ? { ...item, degreeCompleted: e.target.checked, stillAttending: e.target.checked ? false : item.stillAttending } : item
                                    )
                                }))
                            }
                        />


                        <section></section>
                        <button className='add-another-button'>+ Add Another</button>
                    </section>
                );
            })}
            <footer><b className='required-star'>*</b> - required fields</footer>
        </section>
    )
}

export default Education

// school, degree, major, minor, gpa, startDate, endDate, degreeCompleted, stillAttending