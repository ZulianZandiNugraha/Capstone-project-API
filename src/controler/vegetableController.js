const axios = require('axios');
const VegetableModel = require('../model/vegetableModel');
require('dotenv').config();

async function scanVegetable(req, h) {
    try {
        const image = req.payload.image;

        // Memanggil endpoint model machine learning
        const mlResponse = await axios.post(
            `https://ml.googleapis.com/v1/projects/${process.env.PROJECT_ID}/models/your-model:predict`,
            {
                instances: [image] // Format ini bergantung pada model Anda
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`
                }
            }
        );

        const scannedVegetableName = mlResponse.data.predictions[0].className; // Adjust this based on your model's response

        // Mendapatkan data sayuran dari Firestore
        const vegetable = await VegetableModel.getVegetableByName(scannedVegetableName);
        return vegetable;
    } catch (error) {
        return h.response({ message: error.message }).code(404);
    }
}

module.exports = {
    scanVegetable
};
