import React, { useState, useEffect } from "react";

const App = () => {
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await fetch(`http://localhost:5001/slots`);
                if (!response.ok) {
                    throw new Error('Failed to fetch slots');
                }
                const data = await response.json();
                setSlots(data);
            } catch (error) {
                console.error('Error fetching slots:', error);
            }
        };

        fetchSlots();
    }, []);

    const styles = {
        container: {
            padding: '30px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f0f0f0',
            maxWidth: '800px',
            margin: '0 auto',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            backgroundImage: `url('/path/to/your/background-image.jpg')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        th: {
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '15px',
            border: '1px solid #ddd',
            textAlign: 'center',
            fontSize: '16px',
        },
        td: {
            padding: '15px',
            border: '1px solid #ddd',
            textAlign: 'center',
            fontSize: '16px',
        },
        h2: {
            color: '#333',
            textAlign: 'center',
            marginBottom: '20px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.h2}>All Appointments</h2>
            <table style={styles.table} id="list">
                <thead>
                    <tr>
                        <th style={styles.th}>Doctor</th>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Time</th>
                        <th style={styles.th}>Health Issue</th>
                        <th style={styles.th}>Patient Name</th>
                        <th style={styles.th}>Mobile Number</th>
                        <th style={styles.th}>Aadhaar Number</th>
                    </tr>
                </thead>
                <tbody>
                    {slots.map((slot, index) => (
                        <tr key={index}>
                            <td style={styles.td}>{slot.doctor}</td>
                            <td style={styles.td}>{slot.date}</td>
                            <td style={styles.td}>{slot.time}</td>
                            <td style={styles.td}>{slot.healthIssue}</td>
                            <td style={styles.td}>{slot.patientName}</td>
                            <td style={styles.td}>{slot.mobileNumber}</td>
                            <td style={styles.td}>{slot.aadhaarNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;
