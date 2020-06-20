var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const users = new Schema('users', {

    uid: {
        type: ObjectId,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: String,
        allowNull: false
    },

    email_id: {
        type: String,
        allowNull: false
    },

    profile_pic: {
        type: String,
        allowNull: false
    }

}, {
    timestamps: false
});

module.exports = users;
