const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    user_id: String,
    address: {
        building: String,
        coord: [Number],
        street: String,
        postal_code: String
    }
});

module.exports = class UserDB{
    constructor(connectionString){
        this.connectionString = connectionString;
        this.User = null;
    }

    initialize(){
        return new Promise((resolve, reject) => {
            let db = mongoose.createConnection(this.connectionString, { useNewUrlParser: true, useUnifiedTopology: true});
            db.on('error', () => {
                reject();
            });
            db.once('open', () => {
                this.User = db.model("users", userSchema);
                resolve();
            });
        });
    }

    async addNewUser(data){
        let newUser = new this.User(data);
        await newUser.save();
        return `new user: ${newUser.user_id} (${newUser.first_name} ${newUser.last_name}) successfully added`;
    }

    getUserById(id){
        return this.User.findOne({user_id: id}).exec();
    }

    async updateUserById(data, id){
        await this.User.updateOne({user_id: id}, {$set: data}).exec();
        return `user ${id} successfully updated`;
    }

    async deleteUserById(id){
        await this.User.deleteOne({user_id: id}).exec();
        return `user ${id} successfully deleted`;
    }
}