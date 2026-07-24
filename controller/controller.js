const { loadModel } = require('../model/smol-360M-model')

const hello = async (req, res) => {
    return res.send("hello")
}

const get360MModel = async (req, res) => {
    try {
        const { question } = req.body;

        const cleanQuestion = question.replace(/^\s*[\r\n]/gm, '');

        if (!cleanQuestion) {
            return res.status(400).json({
                error: 'Question is required'
            });
        }

        const model = await loadModel();
        console.log("\nquestion: ", cleanQuestion)

        const messages = [
            {
                role: 'system',

                content: 'you are BitBlogger, an AI assistant in a blog website. you can summarize blogs, help the users their favourite categories of blogs types, and many more in a blog site. you are build specifically to help people in the blog website to create, write blogs and help people in blog writing, summarizing, creating etc.'
            },
            {
                role: 'user',
                content: cleanQuestion
            }
        ];

        const output = await model(messages);
        console.log("output: ", output[0].generated_text.at(-1))
        const answer = output[0].generated_text.at(-1).content;

        console.log("answere: ", answer)
        res.json({
            answer
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Failed to generate response'
        });
    }
}

module.exports = { hello, get360MModel }