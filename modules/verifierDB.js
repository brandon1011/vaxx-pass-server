const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    user_id: String,
    address: {
        building: String,
        coord: [Number],
        street: String,
        postal_code: String
    }
});