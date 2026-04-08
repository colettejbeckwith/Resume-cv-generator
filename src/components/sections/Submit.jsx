// Submit.jsx

import '../../styles/sections.css'

function Submit({ formData }) {
    
    return (
        <section className='content-pane form-content submit-pane'>
            <h2>Review</h2>
            <section className='label-field-box'>

                <h3>Personal Info</h3>
                <p>Name: {formData.personal.name}</p>
                <p>Phone: {formData.personal.phone}</p>
                <p>e-Mail: {formData.personal.email}</p>
                <p>Location: {formData.personal.city}</p>
                <p>Job Title: {formData.personal.title}</p>

                <h3>Education</h3>
                {formData.education.map((edu, index) => (
                    <div key={index}>
                        <p>School: {edu.school}</p>
                        <p>Degree: {edu.degree}</p>
                        <p>Major: {edu.major}</p>
                        <p>Minor: {edu.minor}</p>
                        <p>GPA: {edu.gpa}</p>
                        <p>Start Date: {edu.startDate}</p>
                        {/* conditional needed */}
                        <p>End Date: {edu.endDate}</p>
                        <p>Degree Completed: {edu.degreeCompleted}</p>
                        <p>Still Attending: {edu.stillAttending}</p>
                    </div>
                ))}

                <h3>Work History</h3>
                {formData.work.map((job, index) => (
                    <div key={index}>
                        <p>Company: {job.company}</p>
                        <p>Position: {job.position}</p>
                        <p>Start Date: {job.startDate}</p>
                        {/* conditional needed */}
                        <p>End Date: {job.endDate}</p>
                        <p>{job.stillEmployed}</p>
                        <p>Responsibility 1: {job.responsibility1}</p>
                        {/* conditional needed */}
                        <p>Responsibility 2: {job.responsibility2}</p>
                        <p>Responsibility 3: {job.responsibility3}</p>
                    </div>
                ))}

                <h3>Other Skills</h3>
                {/* turn comma separated list into list */}

                <button className='start-button'>Generate Resume</button>
            </section>
            
        </section>
    )
}

export default Submit

// conditional needed for all non-required fields
// Other skills needs to turn a csv into a discrete list
// layout issues