const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200'
}));

const PORT = 5000;

let generator = null;

async function loadModel() {
    if (!generator) {

        const { pipeline } = await import('@huggingface/transformers');

        console.log('Loading model...');

        generator = await pipeline('text-generation', 'HuggingFaceTB/SmolLM2-1.7B-Instruct');

        console.log('Model loaded');
    }

    return generator;
}

app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/get-response', async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                error: 'Question is required'
            });
        }

        const model = await loadModel();

        const messages = [
            {
                role: 'system',
        
                content: '  .'
            },
            {
                role: 'user',
                content: question
            }
        ];

        const output = await model(messages);
        const answer = output[0].generated_text.at(-1).content;

        res.json({
            answer
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Failed to generate response'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});