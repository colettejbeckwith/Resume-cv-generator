// Education.jsx
import { useEffect, useRef, useState } from 'react'
import '../../styles/sections.css'

function Education({ formData, setFormData }) {

    const scrollContainerRef = useRef(null);
    const entryRefs = useRef([]);

    const [deletingIds, setDeletingIds] = useState([]);
    const prevLengthRef = useRef(formData.length);

    const pendingDeleteIndexRef = useRef(null);
    const pendingActionRef = useRef(null);

    const handleDelete = (id, index) => {
        pendingActionRef.current = 'delete';
        pendingDeleteIndexRef.current = index;
        setDeletingIds((prev) => [...prev, id]);

        setTimeout(() => {
            setFormData((prev) => ({
                ...prev,
                education: prev.education.filter((item) => item.id !== id)
            }));
            setDeletingIds((prev) => prev.filter((itemId) => itemId !== id));
        }, 300);
    };

    useEffect(() => {
        if (formData.length > prevLengthRef.current && pendingActionRef.current === 'add') {
            const lastEntry = entryRefs.current[formData.length - 1];
            if (lastEntry) {
                lastEntry.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

        if (formData.length < prevLengthRef.current && pendingActionRef.current === 'delete') {
            const targetIndex = Math.max(0, pendingDeleteIndexRef.current - 1);
            const targetEntry = entryRefs.current[targetIndex];

            if (targetEntry) {
                targetEntry.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

        prevLengthRef.current = formData.length;
        pendingActionRef.current = null;
        pendingDeleteIndexRef.current = null;
    }, [formData.length]);


    return (
        <section className='content-pane form-content'>
            <div className='sub-page-header'>
                <p></p>
                <h2>Education</h2>
                <p><b className='required-star'>*</b> - required fields</p>
            </div>

            <section className='multi-entry-scroll' ref={scrollContainerRef}>
                {formData.map((edu, index) => {

                    const today = new Date().toISOString().split('T')[0];
                    const startAfterToday = edu.startDate && edu.startDate >= today;
                    const endBeforeStart = edu.startDate && edu.endDate && edu.endDate < edu.startDate;
                    const invalidGpa = edu.gpa !== '' && (Number(edu.gpa) < 0 || Number(edu.gpa) > 4);

                    return (
                        <section key={edu.id} ref={(el) => entryRefs.current[index] = el} className={`multi-entry-page label-field-box work-history-fields ${deletingIds.includes(edu.id) ? 'deleting-entry' : ''}`}>

                            <div className="entry-header-row">
                                <h3 className="entry-title">School {index + 1}</h3>
                                {formData.length > 1 && (
                                    <button
                                        type="button"
                                        className="delete-entry-button"
                                        onClick={() => handleDelete(edu.id, index)}
                                    >
                                        Delete School
                                    </button>
                                )}
                            </div>

                            <label htmlFor={`school-name-${index}`}><b className='required-star'>*</b>School Name: </label>
                            <input
                                type="text" 
                                id={`school-name-${index}`} 
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
                            
                            <label htmlFor={`degree-${index}`}><b className='required-star'>*</b>Degree Type:</label>
                            <input 
                                type="text" 
                                id={`degree-${index}`} 
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

                            <label htmlFor={`major-${index}`}><b className='required-star'>*</b>Major:</label>
                            <input 
                                type="text" 
                                id={`major-${index}`}
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

                            <label htmlFor={`gpa-${index}`}>GPA:</label>
                            <div className="field-with-error">
                                <input
                                    className={invalidGpa ? 'input-error' : ''}
                                    type="number"
                                    id={`gpa-${index}`}
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

                            

                            <label htmlFor={`minor-${index}`}>Minor:</label>
                            <input 
                                type="text" 
                                id={`minor-${index}`} 
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

                            <label htmlFor={`start-date-${index}`}><b className='required-star'>*</b>Start Date:</label>
                            <div className="field-with-error">
                                <input
                                    className={startAfterToday ? 'input-error' : ''}
                                    type="date"
                                    id={`start-date-${index}`}
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


                            <label htmlFor={`still-attending-${index}`}>Still attending?</label>
                            <input 
                                className='checkbox-style' 
                                type="checkbox" 
                                id={`still-attending-${index}`}
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

                            <label htmlFor={`end-date-${index}`}><b className='required-star'>*</b>End date:</label>
                            <div className="field-with-error">
                                <input
                                    className={endBeforeStart && !edu.stillAttending ? 'input-error' : ''}
                                    type="date"
                                    id={`end-date-${index}`}
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

                            <label htmlFor={`degree-completed-${index}`}>Degree Obtained?</label>
                            <input 
                                className='checkbox-style' 
                                type="checkbox" 
                                id={`degree-completed-${index}`}
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

                        </section>
                    );
                })}
                <section className='add-another-row'>
                    <button
                        type='button'
                        className='add-another-button'
                        onClick={() => {
                            pendingActionRef.current = 'add';
                            setFormData((prev) => ({
                                ...prev,
                                education: [
                                    ...prev.education,
                                    {
                                        id: crypto.randomUUID(),
                                        school: '',
                                        degree: '',
                                        major: '',
                                        minor: '',
                                        gpa: '',
                                        startDate: '',
                                        endDate: '',
                                        degreeCompleted: false,
                                        stillAttending: false,
                                    }
                                ]
                            }))
                        }}
                    >
                        + Add Another School
                    </button>
                </section>
            </section>
        </section>
    )
}

export default Education