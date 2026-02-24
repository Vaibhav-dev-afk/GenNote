require('dotenv').config();
const express= require('express');
const cors = require('cors');
const {GoogleGenerativeAI} = require('@google/generative-ai');

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
        const {topic} = req.body; 
        if(!topic){
            return res.status(400).json({error: "please enter the topic"});
        }
        const model = genAI.getGenerativeModel({model: "gemini-pro"});
        const prompt = `You are an expert tutor. Create a concise, bulleted study guide for the following topic: ${topic}. Structure it with a clear Introduction, Key Concepts, and a Summary.`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({result: text});
    }
    catch(error){
        console.error("AI Error:",error);
        res.status(500).json({error: "something went wrong with the ai generation"});

    }
});
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});