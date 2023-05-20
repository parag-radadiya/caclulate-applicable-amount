const RateModel =require('../model/rate.model')
async function getRateById(id, options = {}) {
    const rate = await RateModel.findById(id, options.projection, options);
    return rate;
}


async function getAllRates() {
    const rate = await RateModel.find();
    return rate;
}

async function createRate(body) {
    const rate = await RateModel.create(body);
    console.log('load model ===', rate)
    return rate;
}


module.exports = {createRate , getAllRates, getRateById};
