import express = require('express');

let api: express.Router = express.Router();

let studentScript = require('../controllers/studentScript');
let subjectScript = require('../controllers/subjectScript');

/**
 * API School Service
 */

/**
 * Students Service
 */
api.get('/student/:id', studentScript.getStudentById);
api.post('/student', studentScript.addStudent);
api.get('/student', studentScript.getStudents);
api.get('/student/studies/:id', studentScript.getStudentsByStudies);

/**
 * Subjects Service
 */
api.get('/subject', subjectScript.getSubjects);
api.post('/subject', subjectScript.addSubject);
api.post('/subject/addStudent', subjectScript.addStudentToSubject);

module.exports = api;
