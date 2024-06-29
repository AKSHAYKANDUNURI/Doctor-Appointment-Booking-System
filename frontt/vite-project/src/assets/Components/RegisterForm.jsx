import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [role, setRole] = useState('patient');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, username, password, aadhar, role }),
            });
            if (response.ok) {
                alert('Registration successful!');
                navigate('/'); // Redirect to login or home page after successful registration
            } else {
                alert('Failed to register');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again later.');
        }
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: `url('https://t4.ftcdn.net/jpg/05/79/48/43/360_F_579484323_waaeF98BnKROG1Ez3iMVbkavZrPToMut.jpg') no-repeat center center fixed`,
            backgroundSize: 'cover',
            padding: '20px', // Add padding to center the form
        },
        form: {
            maxWidth: '400px',
            width: '100%',
            padding: '40px',
            border: '1px solid #ccc',
            borderRadius: '10px', 
             backgroundColor: 'rgba(255, 255, 255, 0.3)', // Transparent background color
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
        },
        input: {
            width: '100%',
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            outline: 'none',
        },
        select: {
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            outline: 'none',
        },
        button: {
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007BFF',
            color: 'white',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="name" style={styles.label}>Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="username" style={styles.label}>Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="password" style={styles.label}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="aadhar" style={styles.label}>Aadhaar Number:</label>
                    <input
                        type="text"
                        id="aadhar"
                        value={aadhar}
                        onChange={(e) => setAadhar(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="role" style={styles.label}>Role:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        style={styles.select}
                    >
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                    </select>
                </div>
                <button type="submit" style={styles.button}>Register</button>
            </form>
        </div>
    );
}

export default RegisterForm;
