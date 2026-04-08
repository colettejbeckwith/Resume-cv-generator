// WorkHistory.jsx

import '../../styles/sections.css'

function WorkHistory({ formData, setFormData }) {
    return (
        <section className='content-pane form-content'>
            <h2>Work History</h2>
            {formData.map((workHistory, index) => {
                const today = new Date().toISOString().split('T')[0];
                const startAfterToday = workHistory.startDate && workHistory.startDate >= today;
                const endBeforeStart = workHistory.startDate && workHistory.endDate && workHistory.endDate < workHistory.startDate;
                // const missingRequiredFields = !workHistory.startDate || !workHistory.endDate || !workHistory.company || !workHistory.position || !workHistory.responsibility1;


                return (
                    <section key={index} className='label-field-box work-history-fields'>

                        <label htmlFor="company-name"><b className='required-star'>*</b>Company Name:</label>
                        <input 
                            type="text" 
                            id='company-name' 
                            required 
                            value={workHistory.company} 
                            onChange={(e) => 
                                setFormData((prev) => ({
                                    ...prev,
                                    work: prev.work.map((item, i) =>
                                        i === index ? { ...item, company: e.target.value } : item
                                    ) 
                                }))
                            }
                        />

                        <label htmlFor="position"><b className='required-star'>*</b>Position:</label>
                        <input 
                            type="text" 
                            id='position' 
                            required 
                            value={workHistory.position} 
                            onChange={(e) => 
                                setFormData((prev) => ({
                                    ...prev,
                                    work: prev.work.map((item, i) =>
                                        i === index ? { ...item, position: e.target.value } : item
                                    ) 
                                }))
                            }
                        />

                        <label htmlFor="work-start-date">
                            <b className='required-star'>*</b>Start Date:
                        </label>
                        <div className="field-with-error">
                            <input 
                                className={startAfterToday ? 'input-error' : ''}
                                type="date"
                                id='work-start-date' 
                                required 
                                value={workHistory.startDate} 
                                max={today}
                                onChange={(e) => 
                                    setFormData((prev) => ({
                                        ...prev,
                                        work: prev.work.map((item, i) =>
                                            i === index ? { ...item, startDate: e.target.value } : item
                                        ) 
                                    }))
                                } 
                            />

                            {startAfterToday && (
                                <p className="field-error">
                                    Start date must be before today.
                                </p>
                            )}
                        </div>

                        <label htmlFor="responsibility1"><b className='required-star'>*</b>Responsibility 1:</label>
                        <textarea
                            value={workHistory.responsibility1}
                            id='responsibility1'
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    work: prev.work.map((item, i) =>
                                        i === index ? { ...item, responsibility1: e.target.value } : item
                                    )
                                }))
                            }
                        />

                        <label htmlFor="work-end-date">
                            <b className='required-star'>*</b>End Date:
                        </label>
                        <div className="field-with-error">
                            <input 
                                className={endBeforeStart && !workHistory.stillEmployed ? 'input-error' : ''}
                                type="date" 
                                id='work-end-date' 
                                value={workHistory.endDate}
                                required={!workHistory.stillEmployed}
                                min={workHistory.startDate || undefined}
                                disabled={workHistory.stillEmployed}
                                onChange={(e) => 
                                    setFormData((prev) => ({
                                        ...prev,
                                        work: prev.work.map((item, i) =>
                                            i === index ? { ...item, endDate: e.target.value } : item
                                        ) 
                                    }))
                                } 
                            />

                            {endBeforeStart && !workHistory.stillEmployed && (
                                <p className="field-error">
                                    End date must be after start date.
                                </p>
                            )}
                        </div>

                        <label htmlFor="responsibility2">Responsibility 2:</label>
                        <textarea
                            value={workHistory.responsibility2}
                            id='responsibility2'
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    work: prev.work.map((item, i) =>
                                        i === index ? { ...item, responsibility2: e.target.value } : item
                                    )
                                }))
                            }
                        />

                        <label htmlFor="still-employed">Still Employed?</label>
                        <input
                            className='checkbox-style'
                            type="checkbox" 
                            id='still-employed' 
                            checked={workHistory.stillEmployed} 
                            onChange={(e) => 
                                setFormData((prev) => ({
                                    ...prev,
                                    work: prev.work.map((item, i) =>
                                        i === index ? { ...item, stillEmployed: e.target.checked, endDate: e.target.checked ? '' : item.endDate} : item
                                    ) 
                                }))
                            } 
                        />

                        <label htmlFor="responsibility3">Responsibility 3:</label>
                        <textarea
                            value={workHistory.responsibility3}
                            id='responsibility3'
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    work: prev.work.map((item, i) =>
                                        i === index ? { ...item, responsibility3: e.target.value } : item
                                    )
                                }))
                            }
                        />

                    
                        <section></section>
                        <section></section>

                    
                        <section></section>
                        <button className='add-another-button'>+ Add Another Job</button>

                    </section>
                );
            })}
            <footer><b className='required-star'>*</b> - required fields</footer>
        </section>
    )
}

export default WorkHistory

// company, position, startDate, endDate, stillEmployed, responsibilities[]