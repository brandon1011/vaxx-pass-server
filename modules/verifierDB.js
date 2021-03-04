const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const verifierSchema = new Schema({
    first_name: String,
    last_name: String,
    verifier_id: String,
    location: [Number]
});

module.exports = class VerifierDB{
    constructor(connectionString){
        this.connectionString = connectionString;
        this.Verifier = null;
    }

    initialize(){
        return new Promise((resolve, reject) => {
            let db = mongoose.createConnection(this.connectionString, { useNewUrlParser: true, useUnifiedTopology: true});
            db.on('error', () => {
                reject();
            });
            db.once('open', () => {
                this.Verifier = db.model("verifiers", verifierSchema);
                resolve();
            });
        });
    }

    async addNewVerifier(data){
        let newVerifier = new this.Verifier(data);
        await newVerifier.save();
        return `new verifier: ${newVerifier.verifier_id} (${newVerifier.first_name} ${newVerifier.last_name}) successfully added`;
    }

    getVerifierById(id){
        return this.Verifier.findOne({verifier_id: id}).exec();
    }

    async updateVerifierById(data, id){
        await this.Verifier.updateOne({verifier_id: id}, {$set: data}).exec();
        return `verifier ${id} successfully updated`;
    }

    async deleteVerifierById(id){
        await this.Verifier.deleteOne({verifier_id: id}).exec();
        return `verifier ${id} successfully deleted`;
    }
}