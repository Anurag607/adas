import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import multer from 'multer';
import dotenv from 'dotenv';

// const express = require('express');
// const mongoose = require('mongoose');
// const axios = require('axios');
// const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://maskeddeep:43OfEFAHOPXG0422@cluster0.nk7fl3p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

const entrySchema = new mongoose.Schema({
    image: String,
    message: String,
    date: { type: Date, default: Date.now }
});
const Entry = mongoose.model('Entry', entrySchema);

app.post('/create', upload.single('img'), async (req, res) => {
    const { file, body: { msg, date } } = req;
    if (!file) {
        return res.status(400).json({ msg: "No image uploaded" });
    }

    const formData = new FormData();
    formData.append('upload_preset', 'nextbit');
    formData.append('cloud_name', "dotwawzhk");
    formData.append('api_key', "431663952246561");
    formData.append('api_secret', "_qxJlxQnwC4ZiOBUB6Sl26jL6Qg");
    formData.append('file', file.buffer, { filename: file.originalname });

    try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dotwawzhk/image/upload', formData, {
            headers: formData.getHeaders(),
            onUploadProgress: progressEvent => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(percentCompleted);
            }
        });
        const { secure_url } = response.data;
        const newEntry = new Entry({
            image: secure_url,
            message: msg,
            date: date ? new Date(date) : new Date()
        });
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).json({ msg: `Cloudinary error: ${error.message}` });
    }
});

app.get('/read', async (req, res) => {
    try {
        const entries = await Entry.find();
        res.json(entries);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
