import User from './userDB';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkinSchema = new Schema({
    datetime: Date,
    checkin_id: String,
    visitor_id: String,
    verifier_id: String
});