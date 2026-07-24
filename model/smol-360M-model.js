let generator = null;

async function loadModel() {
    if (!generator) {
        const { pipeline } = await import('@huggingface/transformers');
        console.log('Loading model...');
        generator = await pipeline('text-generation', 'HuggingFaceTB/SmolLM2-360M-Instruct');
        console.log('Model loaded');
    }
    return generator;
}

module.exports = { loadModel }