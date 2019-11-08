import mongoose = require('mongoose');

/**
 * Definition of subject schema
 */
let subjectSchema = mongoose.Schema({
    name: {type: String, required: true},
    students: [{type: mongoose.Types.ObjectId, ref: 'Student'}]
});

/**
 * Export the student schema
 * @type {Model}
 */
module.exports = mongoose.model('Subject', subjectSchema);
