const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();

class Vegetable {
    constructor(name, description, nutrition, latinName) {
        this.name = name;
        this.description = description;
        this.nutrition = nutrition;
        this.latinName = latinName;
    }
}

async function getVegetableByName(name) {
    const vegetableRef = firestore.collection('vegetables').doc(name);
    const doc = await vegetableRef.get();

    if (!doc.exists) {
        throw new Error('Vegetable not found');
    }

    const data = doc.data();
    return new Vegetable(data.name, data.description, data.nutrition, data.latinName);
}

module.exports = {
    getVegetableByName
};
