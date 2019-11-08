import mongoose = require('mongoose');

/**
 * Definition of student schema
 */
let studentSchema = mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    phones: [{
        key: String,
        value: String
    }]
});

/**
 * Export the student schema
 * @type {Model}
 */
module.exports = mongoose.model('Student', studentSchema);


