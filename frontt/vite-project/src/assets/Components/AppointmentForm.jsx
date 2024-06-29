import React, { useState, useEffect } from 'react';

const doctors = [
    'Dr. John Doe',
    'Dr. Jane Smith',
    'Dr. Emily Johnson',
    'Dr. Michael Brown',
];

const healthIssues = [
    'General Checkup',
    'Dental',
    'Cardiology',
    'Dermatology',
    'Neurology',
];

const AppointmentForm = () => {
    const [doctor, setDoctor] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [healthIssue, setHealthIssue] = useState('');
    const [patientName, setPatientName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [aadhaarNumber, setAadhaarNumber] = useState('');

    useEffect(() => {
        document.body.style.backgroundImage = "url('https://t4.ftcdn.net/jpg/05/79/48/43/360_F_579484323_waaeF98BnKROG1Ez3iMVbkavZrPToMut.jpg')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundPosition = 'center';
        document.body.style.height = '100vh';
        document.body.style.margin = '0';

        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundRepeat = '';
            document.body.style.backgroundPosition = '';
            document.body.style.height = '';
            document.body.style.margin = '';
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ doctor, date, time, healthIssue, patientName, mobileNumber, aadhaarNumber }),
            });
            if (response.ok) {
                alert('Appointment booked successfully!');
                setDoctor('');
                setDate('');
                setTime('');
                setHealthIssue('');
                setPatientName('');
                setMobileNumber('');
                setAadhaarNumber('');
            } else {
                alert('Failed to book appointment');
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
        }
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        let hours = now.getHours();
        let minutes = now.getMinutes();

        // Ensure two-digit format
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;

        const currentDate = `${year}-${month}-${day}`;
        const currentTime = `${hours}:${minutes}`;

        return { currentDate, currentTime };
    };

    const { currentDate, currentTime } = getCurrentDateTime();

    return (
        <div style={{
            maxWidth: '500px',
            margin: '50px auto',
            padding: '30px',
            border: '2px solid #4CAF50',
            borderRadius: '15px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#4CAF50' }}>Book Your Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Doctor:</label>
                    <select
                        value={doctor}
                        onChange={(e) => setDoctor(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #4CAF50', fontSize: '16px' }}
                    >
                        <option value="">Select a doctor</option>
                        {doctors.map((doc) => (
                            <option key={doc} value={doc}>{doc}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={currentDate}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #4CAF50', fontSize: '16px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Time:</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        min={currentTime}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #4CAF50', fontSize: '16px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Health Issue:</label>
                    <select
                        value={healthIssue}
                        onChange={(e) => setHealthIssue(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #4CAF50', fontSize: '16px' }}
                    >
                        <option value="">Select a health issue</option>
                        {healthIssues.map((issue) => (
                            <option key={issue} value={issue}>{issue}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Patient Name:</label>
                    <input
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #4CAF50', fontSize: '16px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Mobile Number:</label>
                    <input
                        type="text"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #4CAF50', fontSize: '16px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Aadhaar Number:</label>
                    <input
                        type="text"
                        value={aadhaarNumber}
                        onChange={(e) => setAadhaarNumber(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #4CAF50', fontSize: '16px' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#4CAF50', color: 'white', fontSize: '18px', cursor: 'pointer' }}>Book Appointment</button>
            </form>
        </div>
    );
};

export default AppointmentForm;
