const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let companySchema = new Schema({
    thaiName: {
        type: String
    },
    engName: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String 
    },
    managerName: {
        type: String
    },
    managerPosition: {
        type: String
    },
    managerDepartment: {
        type: String
    },
    managerPhone: {
        type: String
    },
    managerEmail: {
        type: String
    },
    contact: {
        type: String
    },
    coordinatorDetails: {
        type: String
    },
    projectName: {
        type: String
    },
    projectObjective: {
        type: String
    },
    projectPeriod: {
        type: String
    },
    studentQuantityRequire: {
        type: String
    },
    projectDescription: {
        type: String
    },
    projectSkill: {
        type: String
    },
    projectSalary: {
        type: String
    },
    projectMentor: {
        type: String
    },
    workLocation: {
        type: String
    },
    projectInformantName: {
        type: String
    },
    projectInformantPosition: {
        type: String
    },
    companyApprove: {
        type: Boolean,
        default: false
    }



}, {
    collection: 'companys'
})

module.exports = mongoose.model('Company', companySchema);