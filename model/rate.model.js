const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    updatedAt: { type: Date },
    createdAt: { type: Date },
    rules: {
        AND: [{
            type_of_load: [{ type: String }],
            caller: { type: String },
            containerSize: { type: String },
            overWeight: { type: Boolean },
        }],
        OR: [{
            type_of_load: [{ type: String }],
            caller: { type: String },
            containerOwner: { type: String },
            overWeight: { type: Boolean },
        }],
    },
    amountWithRange: [{
        start: { type: Number },
        end: { type: Number },
        amount: { type: Number },
        type: { type: String, enum: ["fixed", "perunit"] },
    }],
});

const RateModel = mongoose.model("Rate", schema);
module.exports = RateModel;

