const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected to Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

const Schema = mongoose.Schema;

// User schema
const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ username: user.username });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: error.message });
    }
});

// Slot schema
const slotSchema = new Schema({
    doctor: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    healthIssue: { type: String, required: true },
    patientName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    aadhaarNumber: { type: String, required: true },
});

slotSchema.index({ doctor: 1, date: 1, time: 1 }, { unique: true });

const Slot = mongoose.model('Slot', slotSchema);

app.post('/appointments', async (req, res) => {
    const { doctor, date, time, healthIssue, patientName, mobileNumber, aadhaarNumber } = req.body;
    console.log('Received appointment:', req.body);

    if (!doctor || !date || !time || !healthIssue || !patientName || !mobileNumber || !aadhaarNumber) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingSlot = await Slot.findOne({ doctor, date, time });
        if (existingSlot) {
            return res.status(409).json({ error: 'Appointment slot already exists' });
        }

        const newSlot = new Slot({ doctor, date, time, healthIssue, patientName, mobileNumber, aadhaarNumber });
        await newSlot.save();
        console.log('Appointment saved successfully:', newSlot);
        res.status(201).json(newSlot);
    } catch (error) {
        console.error('Error saving appointment:', error);
        res.status(500).json({ error: 'Failed to book appointment' });
    }
});

app.get('/slots', async (req, res) => {
    try {
        const slots = await Slot.find({});
        res.json(slots);
    } catch (error) {
        console.error('Error fetching slots:', error);
        res.status(500).json({ error: 'Failed to fetch slots' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
