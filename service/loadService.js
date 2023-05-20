const Model =require('../model/loads.model')
async function getLoadById(id) {
    const user = await Model.findById(id);
    return user;
}


async function getAllLoad() {
    const Load = await Model.find();
    return Load;
}

async function createLoad(body) {
    const loadModel = await Model.create(body);
    console.log('load model ===', loadModel)
    return loadModel;
}


module.exports = {createLoad , getLoadById, getAllLoad};
