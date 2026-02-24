require('dotenv').config();
const express= require('express');
const cors = require('cors');
const {GoogleGenerativeAI} = require('@google/generatie-ai');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get('/',(req,res)=>{
    res.send('Server is running and ready to learn!')
});

app.post('/generate-notes', async (req,res)=>{
    try{
        const {topic} = req.body(); 
    }
    catch{
        
    }
});