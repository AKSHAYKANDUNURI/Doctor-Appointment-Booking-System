import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const user = await response.json();
        if (username === 'doctor1') {
          navigate('/doctorslot');
        } else {
          navigate('/appointmentform');
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again later.');
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    navigate('/register');
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: `url('https://t4.ftcdn.net/jpg/05/79/48/43/360_F_579484323_waaeF98BnKROG1Ez3iMVbkavZrPToMut.jpg') no-repeat`, // Background image with no repeat
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    form: {
      maxWidth: '400px',
      width: '100%',
      padding: '40px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.3)', // Transparent background color
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
    registerButton: {
      marginLeft: '5px',
      padding: '5px 10px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#28a745',
      color: 'white',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
        <p style={{ marginTop: '15px', textAlign: 'center' }}>Are you a new user?
          <button onClick={handleRegister} style={styles.registerButton}>Register</button>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
