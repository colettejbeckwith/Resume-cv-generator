// WorkHistory.jsx

import { useEffect, useRef, useState } from 'react'
import '../../styles/sections.css'

function WorkHistory({ formData, setFormData }) {


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
                work: prev.work.filter((item) => item.id !== id)
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
                <h2>Work History</h2>
                <p><b className='required-star'>*</b> - required fields</p>
            </div>


            <section className='multi-entry-scroll' ref={scrollContainerRef}>
                {formData.map((workHistory, index) => {

                    const today = new Date().toISOString().split('T')[0];
                    const startAfterToday = workHistory.startDate && workHistory.startDate >= today;
                    const endBeforeStart = workHistory.startDate && workHistory.endDate && workHistory.endDate < workHistory.startDate;

                    return (
                        <section key={workHistory.id} ref={(el) => entryRefs.current[index] = el} className={`multi-entry-page label-field-box work-history-fields ${deletingIds.includes(workHistory.id) ? 'deleting-entry' : ''}`}>
                            <div className="entry-header-row">
                                <h3 className="entry-title">Employer {index + 1}</h3>
                                {formData.length > 1 && (
                                    <button
                                        type="button"
                                        className="delete-entry-button"
                                        onClick={() => handleDelete(workHistory.id, index)}
                                    >
                                        Delete Employer
                                    </button>
                                )}
                            </div>

                            <label htmlFor={`company-name-${index}`}><b className='required-star'>*</b>Company Name:</label>
                            <input 
                                type="text" 
                                id={`company-name-${index}`}
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

                            <label htmlFor={`position-${index}`}><b className='required-star'>*</b>Position:</label>
                            <input 
                                type="text" 
                                id={`position-${index}`}
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

                            <label htmlFor={`work-start-date-${index}`}><b className='required-star'>*</b>Start Date:</label>
                            <div className="field-with-error">
                                <input 
                                    className={startAfterToday ? 'input-error' : ''}
                                    type="date"
                                    id={`work-start-date-${index}`}
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
                                        Select date before today.
                                    </p>
                                )}
                            </div>

                            <label htmlFor={`work-end-date-${index}`}>
                                <b className='required-star'>*</b>End Date:
                            </label>
                            <div className="field-with-error">
                                <input
                                    key={`work-end-${workHistory.id}-${workHistory.stillEmployed}`}
                                    className={endBeforeStart && !workHistory.stillEmployed ? 'input-error' : ''}
                                    type="date" 
                                    id={`work-end-date-${index}`}
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
                                        Select date after start date.
                                    </p>
                                )}
                            </div>

                            <label htmlFor={`still-employed-${index}`}>Still Employed?</label>
                            <input
                                className='checkbox-style'
                                type="checkbox" 
                                id={`still-employed-${index}`}
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

                            <label htmlFor={`responsibility1-${index}`}><b className='required-star'>*</b>Responsibility 1:</label>
                            <textarea
                                value={workHistory.responsibility1}
                                id={`responsibility1-${index}`}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        work: prev.work.map((item, i) =>
                                            i === index ? { ...item, responsibility1: e.target.value } : item
                                        )
                                    }))
                                }
                            />

                            

                            <label htmlFor={`responsibility2-${index}`}>Responsibility 2:</label>
                            <textarea
                                value={workHistory.responsibility2}
                                id={`responsibility2-${index}`}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        work: prev.work.map((item, i) =>
                                            i === index ? { ...item, responsibility2: e.target.value } : item
                                        )
                                    }))
                                }
                            />

                            <label htmlFor={`responsibility3-${index}`}>Responsibility 3:</label>
                            <textarea
                                value={workHistory.responsibility3}
                                id={`responsibility3-${index}`}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        work: prev.work.map((item, i) =>
                                            i === index ? { ...item, responsibility3: e.target.value } : item
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
                                work: [
                                    ...prev.work,
                                    {
                                        id: crypto.randomUUID(),
                                        company: '',
                                        position: '',
                                        startDate: '',
                                        endDate: '',
                                        stillEmployed: false,
                                        responsibility1: '',
                                        responsibility2: '',
                                        responsibility3: ''
                                    }
                                ]
                            }))
                        }}
                    >
                        + Add Another Employer
                    </button>
                </section>
            </section>
        </section>
    )
}

export default WorkHistory