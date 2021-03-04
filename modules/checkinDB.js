import User from './userDB';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkinSchema = new Schema({
    datetime: Date,
    visitor: User,
    verifier: User
});