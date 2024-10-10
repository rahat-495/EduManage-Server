
const express = require('express');
const getYourSchools = require('../Controllers/getYourSchools');
const getCurrentUserDetails = require('../Controllers/getCurrentUserDetails');
const getYourGrades = require('../Controllers/getYourGrades');
const getSchoolDetails = require('../Controllers/getSchoolDetails');
const getSubjects = require('../Controllers/getSubjects');
const viewGrades = require('../Controllers/viewGrades');
const getAllSchool = require('../Controllers/getAllSchool');
const getGradesData = require('../Controllers/getGradesData');
const getAddmissionsData = require('../Controllers/getAddmissionsData');
const getCurrentAddissionFormData = require('../Controllers/getCurrentAddissionFormData');
const getSchoolsAndGradesAddReqs = require('../Controllers/getSchoolsAndGradesAddReqs');
const getStudentAddmissionInfo = require('../Controllers/getStudentAddmissionInfo');
const getJoinedStudentInfo = require('../Controllers/getJoinedStudentInfo');
const getAllStudents = require('../Controllers/getAllStudents');
const router = express.Router() ;

router.get('/userDetails' , getCurrentUserDetails) // to get the current user details ----------
router.get('/yourSchools' , getYourSchools) // to get the current user created schools ----------
router.get('/yourClasses' , getYourGrades) // to get the current user created grades ----------
router.get('/schoolsDetails' , getSchoolDetails) // to get the school details ----------
router.get('/subjects' , getSubjects) // to get subjects ----------
router.get('/viewClasses' , viewGrades) // to get classes for use school ----------
router.get('/allSchools' , getAllSchool) // to get the all schools data for show schools ----------
router.get('/classesData' , getGradesData) // to get the classes names ----------
router.get('/addmissionsData' , getAddmissionsData) // to get the all personal addmissions ----------
router.get('/currentAddissionFormData' , getCurrentAddissionFormData) // to get the current Addmissional form data ----------
router.get('/schoolsAndGradesAddReqs' , getSchoolsAndGradesAddReqs) // to get the all schools and grades addmissions reqs ----------
router.get('/studentAddmissionInfo' , getStudentAddmissionInfo) // to get the details a addmission info ----------
router.get('/allStudents' , getAllStudents) // to get the all students info ----------
router.get('/joinedStudentInfo' , getJoinedStudentInfo) // to get the joined student info ----------

module.exports = router;