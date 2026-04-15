// Submit.jsx

import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import ResumeDocument from '../ResumeDocument';

import '../../styles/sections.css'

function Submit({ formData }) {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(`${dateString}T00:00:00`);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
        });
    };

    const sortedEducation = [...formData.education].sort((a, b) => {
        if (!a.startDate && !b.startDate) return 0;
        if (!a.startDate) return 1;
        if (!b.startDate) return -1;
        return new Date(a.startDate) - new Date(b.startDate);
    });

    const sortedWork = [...formData.work].sort((a, b) => {
        if (!a.startDate && !b.startDate) return 0;
        if (!a.startDate) return 1;
        if (!b.startDate) return -1;
        return new Date(a.startDate) - new Date(b.startDate);
    });

    const formatDateRange = (startDate, endDate, isCurrent = false) => {
        const formattedStart = formatDate(startDate);
        const formattedEnd = isCurrent ? 'Current' : formatDate(endDate);

        if (!formattedStart && !formattedEnd) return '';
        if (!formattedStart) return formattedEnd;
        if (!formattedEnd) return formattedStart;

        return `${formattedStart} - ${formattedEnd}`;
    };

    const printRef = useRef(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `${formData.personal.name || 'resume'}-resume`,
    })

    return (
        <section className='content-pane form-content'>
            <h2>Review</h2>
            <section className='label-field-box review-pane'>
                <section className="review-section review-section-personal">
                    <h3 className='personal-heading'>{formData.personal.name}</h3>

                    <div className='review-details-personal'>
                        {formData.personal.title && (
                            <p className="personal-detail-line">{formData.personal.title}</p>
                        )}
                        {formData.personal.city && (
                            <p className="personal-detail-line">{formData.personal.city}</p>
                        )}
                        {formData.personal.phone && (
                            <p className="personal-detail-line">{formData.personal.phone}</p>
                        )}
                        {formData.personal.email && (
                            <p className="personal-detail-line">{formData.personal.email}</p>
                        )}
                        
                        
                    </div>
                </section>
                <section className="review-section">
                    <h3>Education</h3>
                    {sortedEducation.map((edu, index) => (
                        <section key={edu.id || index} className="review-entry">
                            <h4>{edu.school}</h4>
                            {edu.degree && <p className="review-subheading">{edu.degree} in {edu.major}</p>}
                            {edu.minor && <p className='review-subheading'>Minor in {edu.minor}</p>}
                            <p className="review-date-range">
                                {formatDateRange(edu.startDate, edu.endDate, edu.stillAttending)}
                            </p>

                            <div className='review-details'>
                                {/* {renderField('Minor in', edu.minor)} */}
                                {edu.degreeCompleted && 'Degree Obtained'}
                            </div>
                        </section>
                    ))}
                </section>

                <section className="review-section">
                    <h3>Work History</h3>
                    {sortedWork.map((job, index) => (
                        <section key={job.id || index} className="review-entry">
                            <h4>{job.company}</h4>
                            {job.position && <p className="review-subheading">{job.position}</p>}
                            <p className="review-date-range">
                                {formatDateRange(job.startDate, job.endDate, job.stillEmployed)}
                            </p>

                            <div className="review-responsibilities">
                                {job.responsibility1 && (
                                    <div className="review-responsibility-block">
                                        <p className="review-responsibility-label">Responsibility 1</p>
                                        <p className="review-responsibility-text">{job.responsibility1}</p>
                                    </div>
                                )}

                                {job.responsibility2 && (
                                    <div className="review-responsibility-block">
                                        <p className="review-responsibility-label">Responsibility 2</p>
                                        <p className="review-responsibility-text">{job.responsibility2}</p>
                                    </div>
                                )}

                                {job.responsibility3 && (
                                    <div className="review-responsibility-block">
                                        <p className="review-responsibility-label">Responsibility 3</p>
                                        <p className="review-responsibility-text">{job.responsibility3}</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    ))}
                </section>

                {formData.misc.otherSkills.length > 0 && (
                    <section className="review-section review-skills">
                        <h3>Other Skills</h3>
                        <ul className="review-skills-list">
                            {formData.misc.otherSkills.map((skill, index) => (
                                <li key={`${skill}-${index}`}>{skill}</li>
                            ))}
                        </ul>
                    </section>
                )}

                <section className="review-generate-row">
                    <button className='start-button' type="button" onClick={handlePrint}>
                        Generate Resume
                    </button>
                </section>
                <div className='print-only-wrapper'>
                    <div ref={printRef}>
                        <ResumeDocument formData={formData} />
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Submit