const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('OpenAI');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{role: "user", content: message}],
        });

        //console.log(response.choices[0].message);
        res.json(response.choices[0].message);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error communicating with OpenAI API');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
