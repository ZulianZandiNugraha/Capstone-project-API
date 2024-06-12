const VegetableController = require('../controler/vegetableController');

const routes = [
    {
        method: 'POST',
        path: '/scan',
        handler: VegetableController.scanVegetable
    }
];

module.exports = routes;
