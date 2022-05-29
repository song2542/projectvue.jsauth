const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    studentID: {
        type: String
    },
    email:{
        type: String
    },
    firstChoice:{
        type: String
    },
    secondChoice:{
        type: String
    },
    thirdChoice:{
        type: String
    },
    gpm:{
        type: Number
    },
    mvcStatus:{
        type:String
    }

}, {
    collection: 'students'
})

module.exports = mongoose.model('Student', studentSchema);