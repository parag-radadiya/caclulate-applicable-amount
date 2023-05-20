const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    updatedAt: { type: Date },
    createdAt: { type: Date },
    type_of_load: { type: String },
    caller: { type: String },
    containerSize: { type: String },
    containerType: { type: String },
    containerOwner: { type: String },
    containerNo: { type: String },
    reference_number: { type: String },
    distance: { type: Number },
    genset: { type: Boolean },
    reefer: { type: Boolean },
    overWeight: { type: Boolean },
});

const Model = mongoose.model("Load", schema);

module.exports = Model;
