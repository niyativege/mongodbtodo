const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


var dbURL = 'mongodb://localhost:27017/test';

mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('MongDB Connected');
})
.catch(err => {
    console.error(err);
    console.log("Unable to connect to MongoDB");
});

var userSchema = new mongoose.Schema({

    uid: {
        type: ObjectId,
        unique: true
    },
    name: {
        type: String,
        required: true
    },

    email_id: {
        type: String,
        required: true,
        unique: true
    },

    profile_pic: {
        type: String
    }

});

var todoSchema =  new mongoose.Schema({

    tid: {
        type: String,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    uid: {
        type: String,
        allowNull: false
    },

    title: {
        type: String,
        allowNull: false
    },

    description: {
        type: String,
        allowNull: false
    },

    deleted: {
        type: Boolean,
        allowNull: false
    },

    completed: {
        type: Boolean,
        allowNull: false
    }

}, {
    timestamps: false
});




var Users = mongoose.model('Users', userSchema);
var Todo = mongoose.model('Users', todoSchema);


var db = {
    Users,
    Todo
};


module.exports = db;

// //require mongoose module
// var mongoose = require('mongoose');

// //require chalk module to give colors to console text
// var chalk = require('chalk');

// //require database URL from properties file
// var dbURL = require('./properties').DB;

// var connected = chalk.bold.cyan;
// var error = chalk.bold.yellow;
// var disconnected = chalk.bold.red;
// var termination = chalk.bold.magenta;

// //export this function and imported by server.js
// module.exports =function(){

//     mongoose.connect(dbURL);

//     mongoose.connection.on('connected', function(){
//         console.log(connected("Mongoose default connection is open to ", dbURL));
//     });

//     mongoose.connection.on('error', function(err){
//         console.log(error("Mongoose default connection has occured "+err+" error"));
//     });

//     mongoose.connection.on('disconnected', function(){
//         console.log(disconnected("Mongoose default connection is disconnected"));
//     });

//     process.on('SIGINT', function(){
//         mongoose.connection.close(function(){
//             console.log(termination("Mongoose default connection is disconnected due to application termination"));
//             process.exit(0)
//         });
//     });
// }