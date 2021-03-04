const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkInSchema = new Schema({
    datetime: Date,
    checkin_id: String,
    visitor_id: String,
    verifier_id: String,
    location: [Number]
});

module.exports = class CheckInDB{
    constructor(connectionString){
        this.connectionString = connectionString;
        this.CheckIn = null;
    }

    initialize(){
        return new Promise((resolve, reject) => {
            let db = mongoose.createConnection(this.connectionString, { useNewUrlParser: true, useUnifiedTopology: true});
            db.on('error', () => {
                reject();
            });
            db.once('open', () => {
                this.CheckIn = db.model("checkins", checkInSchema);
                resolve();
            });
        });
    }

    async addNewCheckIn(data){
        let newCheckIn = new this.CheckIn(data);
        await newCheckIn.save();
        return `new check-in: ${newCheckIn.checkin_id} recorded at ${newCheckIn.datetime}`;
    }

    getCheckInById(id){
        return this.CheckIn.findOne({checkin_id: id}).exec();
    }

    async updateCheckInById(data, id){
        await this.CheckIn.updateOne({checkin_id: id}, {$set: data}).exec();
        return `check-in record ${id} successfully updated`;
    }

    async deleteCheckInById(id){
        await this.CheckIn.deleteOne({checkin_id: id}).exec();
        return `record of check-in ${id} successfully deleted`;
    }
}