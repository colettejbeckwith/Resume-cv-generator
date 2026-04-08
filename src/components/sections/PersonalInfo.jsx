// PersonalInfo.jsx
import { useState } from 'react';
import '../../styles/sections.css'

function PersonalInfo({ formData, setFormData }) {

    const invalidEmail =
        formData.email !== '' &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

    const invalidPhone =
        formData.phone !== '' &&
        !/^\(\d{3}\)\s\d{3}-\d{4}$/.test(formData.phone);;

    function formatPhoneNumber(value) {
        const digits = value.replace(/\D/g, '').slice(0, 10);

        if (digits.length <= 3) return digits;
        if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    const [touched, setTouched] = useState ({
        name: false,
        phone: false,
        email: false,
    });

    return (
        <section className='content-pane form-content'>

            
            <h2>Personal Info</h2>
            <section className='label-field-box personal-fields'>
                <label htmlFor="name"><b className='required-star'>*</b>Full Name:</label>
                <input 
                    type="text"
                    required 
                    id='name' 
                    value={formData.name} 
                    onChange={(e) => 
                        setFormData((prev) => (
                            {...prev, personal: {...prev.personal, name: e.target.value}}
                        )
                    )}
                />

                <label htmlFor="phone"><b className='required-star'>*</b>Phone Number:</label>
                <div className="field-with-error">
                    <input 
                        className={touched.phone && invalidPhone ? 'input-error' : ''}
                        type="tel" 
                        required 
                        id='phone' 
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                personal: {
                                    ...prev.personal,
                                    phone: formatPhoneNumber(e.target.value)
                                }
                            }))
                        }
                        onBlur={() =>
                            setTouched((prev) => ({ ...prev, phone: true }))
                        }
                    />

                    {touched.phone && invalidPhone && (
                        <p className="field-error">Enter a valid phone number.</p>
                    )}
                </div>

                <label htmlFor="email"><b className='required-star'>*</b>E-Mail:</label>
                <div className="field-with-error">
                    <input 
                        className={touched.email && invalidEmail ? 'input-error' : ''}
                        type="email" 
                        required 
                        id='email'
                        value={formData.email}
                        onChange={(e) => 
                            setFormData((prev) => ({
                                ...prev,
                                personal: { ...prev.personal, email: e.target.value }
                            }))
                        }
                        onBlur={() =>
                            setTouched((prev) => ({ ...prev, email: true }))
                        }
                    />

                    {touched.email && invalidEmail && (
                        <p className="field-error">Enter a valid email address.</p>
                    )}
                </div>
                
                <label htmlFor="city">Location:</label>
                <input 
                    type="text" 
                    id='city' 
                    value={formData.city} 
                    onChange={(e) => 
                        setFormData((prev) => (
                            {...prev, personal: {...prev.personal, city: e.target.value}}
                        )
                    )} 
                />
                
                <label htmlFor="title">Job Title:</label>
                <input 
                    type="text" 
                    id='title' 
                    value={formData.title} 
                    onChange={(e) => 
                        setFormData((prev) => (
                            {...prev, personal: {...prev.personal, title: e.target.value}}
                        )
                    )} 
                />

            </section>
            <footer><b className='required-star'>*</b> - required fields</footer>
        </section>
    )
}

export default PersonalInfo

// name, phone, email, city, title

// TODO: validate,autoformat phone number and email

