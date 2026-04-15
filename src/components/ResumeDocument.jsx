// ResumeDocument.jsx

import '../styles/ResumeDocument.css'

function ResumeDocument({ formData }) {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(`${dateString}T00:00:00`);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
        });
    };

    const formatDateRange = (startDate, endDate, isCurrent = false) => {
        const formattedStart = formatDate(startDate);
        const formattedEnd = isCurrent ? 'Present' : formatDate(endDate);

        if (!formattedStart && !formattedEnd) return '';
        if (!formattedStart) return formattedEnd;
        if (!formattedEnd) return formattedStart;

        return `${formattedStart} - ${formattedEnd}`;
    };

    const sortedEducation = [...formData.education].sort((a, b) => {
        if (!a.startDate && !b.startDate) return 0;
        if (!a.startDate) return 1;
        if (!b.startDate) return -1;
        return new Date(b.startDate) - new Date(a.startDate);
    });

    const sortedWork = [...formData.work].sort((a, b) => {
        if (!a.startDate && !b.startDate) return 0;
        if (!a.startDate) return 1;
        if (!b.startDate) return -1;
        return new Date(b.startDate) - new Date(a.startDate);
    });

    return (
        <section className="resume-document">
            <div className="resume-header">
                <h1>{formData.personal.name}</h1>

                {formData.personal.title && (
                    <p className="resume-header-title">{formData.personal.title}</p>
                )}

                <p className="resume-contact-line">
                    {[formData.personal.city, formData.personal.phone, formData.personal.email]
                        .filter(Boolean)
                        .join(' • ')}
                </p>
            </div>

            <div className='resume-body'>
                {sortedEducation.length > 0 && (
                    <section className="resume-section">
                        <h2>Education</h2>
                        {sortedEducation.map((edu) => (
                            <article key={edu.id} className="resume-entry">
                                <div className="resume-entry-topline">
                                    <h3>{edu.school}</h3>
                                    <p className="resume-entry-dates">
                                        {edu.degreeCompleted && edu.endDate
                                            ? `Graduated ${formatDate(edu.endDate)}`
                                            : formatDateRange(edu.startDate, edu.endDate, edu.stillAttending)}
                                    </p>
                                </div>
                                <p className="resume-entry-subline">
                                    {edu.degree}{edu.major ? ` in ${edu.major}` : ''}
                                </p>
                                {edu.minor && (
                                    <p className="resume-entry-detail">Minor in {edu.minor}</p>
                                )}
                            </article>
                        ))}
                    </section>
                )}
                {sortedWork.length > 0 && (
                    <section className="resume-section">
                        <h2>Work Experience</h2>
                        {sortedWork.map((job) => (
                            <article key={job.id} className="resume-entry">
                                <div className="resume-entry-topline">
                                    <h3>{job.company}</h3>
                                    <p className="resume-entry-dates">
                                        {formatDateRange(job.startDate, job.endDate, job.stillEmployed)}
                                    </p>
                                </div>
                                {job.position && (
                                    <p className="resume-entry-subline">{job.position}</p>
                                )}
                                <ul className="resume-bullets">
                                    {job.responsibility1 && <li>{job.responsibility1}</li>}
                                    {job.responsibility2 && <li>{job.responsibility2}</li>}
                                    {job.responsibility3 && <li>{job.responsibility3}</li>}
                                </ul>
                            </article>
                        ))}
                    </section>
                )}
                {formData.misc.otherSkills.length > 0 && (
                    <section className="resume-section">
                        <h2>Skills</h2>
                        <p className="resume-skills">
                            {formData.misc.otherSkills.join(', ')}
                        </p>
                    </section>
                )}
            </div>
        </section>
    )
}

export default ResumeDocument



