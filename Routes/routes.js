
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
const addSchool = require('../Controllers/addSchool');
const addGrades = require('../Controllers/addGrades');
const reqForAddmission = require('../Controllers/reqForAddmission');
const updateAddmission = require('../Controllers/updateAddmission');
const updateSchool = require('../Controllers/updateSchool');
const createUser = require('../Controllers/createUser');
const updateDevice = require('../Controllers/updateDevice');
const updateSchoolJoinStatus = require('../Controllers/updateSchoolJoinStatus');
const updateGradeJoinStatus = require('../Controllers/updateGradeJoinStatus');
const changeAllJoinStatusP = require('../Controllers/changeAllJoinStatusP');
const updateIsSeenModal = require('../Controllers/updateIsSeenModal');
const getMyClassMates = require('../Controllers/getMyClassMates');
const createJwt = require('../Controllers/createJwt');
const getStudentsForConversation = require('../Controllers/getStudentsForConversation');
const createConversation = require('../Controllers/createConversation');
const getConversations = require('../Controllers/getConversations');
const getReceiverDetails = require('../Controllers/getReceiverDetails');
const getMessages = require('../Controllers/getMessages');
const createMessage = require('../Controllers/createMessage');
const getMyClasses = require('../Controllers/getMyClasses');
const getGradeStudents = require('../Controllers/getGradeStudents');
const createModule = require('../Controllers/createModule');
const createAssignment = require('../Controllers/createAssignment');
const getUploadedModulesList = require('../Controllers/getUploadedModulesList');
const getModuleDetails = require('../Controllers/getModuleDetails');
const getModuleImage = require('../Controllers/getModuleImage');
const getModuleVideo = require('../Controllers/getModuleVideo');
const getMyClassModules = require('../Controllers/getMyClassModules');
const getGoToNextLink = require('../Controllers/getGoToNextLink');
const getGoToPrevLink = require('../Controllers/getGoToPrevLink');
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
router.get('/myClassMates' , getMyClassMates) // to get the joined student info ----------
router.get('/studentsForConversation' , getStudentsForConversation) // to get students info for conversation ----------
router.get('/conversations' , getConversations) // to get students conversations ----------
router.get('/receiverDetails' , getReceiverDetails) // to get receiver Details ----------
router.get('/messages' , getMessages) // to get messages ----------
router.get('/myClasses' , getMyClasses) // to get classes for students ----------
router.get('/gradeStudents' , getGradeStudents) // to get grades students ----------
router.get('/getUploadedModulesList' , getUploadedModulesList) // to get uploaded modules list for teacher ----------
router.get('/moduleDetails' , getModuleDetails) // to get module details ----------
router.get('/moduleImage' , getModuleImage) // to get module Image ----------
router.get('/moduleVideo' , getModuleVideo) // to get module video ----------
router.get('/myClassModules' , getMyClassModules) // to get uploaded modules list for student ----------
router.get('/goToNextLink' , getGoToNextLink) // to get last link for go there next => student ----------
router.get('/goToPrevLink' , getGoToPrevLink) // to get last link for go there next => student ----------

router.post('/addSchool' , addSchool) // to creating Schools ----------
router.post('/addClass' , addGrades) // to creating Grades ----------
router.post('/reqForAddmission' , reqForAddmission) // to create the addmission request ----------
router.post('/jwt' , createJwt) // to create json web token ----------
router.post('/conversation' , createConversation) // to create new conversation ----------
router.post('/createMessage' , createMessage) // to create new message ----------
router.post('/createModule' , createModule) // to create new module ----------
router.post('/createAssignment' , createAssignment) // to create new assignment ----------

router.put('/updateAddmission' , updateAddmission) // to update the addmission data ----------
router.put('/updateSchool' , updateSchool) // to update the school Info ----------
router.put('/createUser' , createUser) // to Create a user and save to db ----------
router.put('/updateDevice' , updateDevice) // update user device info or data ----------

router.patch('/updateSchoolJoinStatus' , updateSchoolJoinStatus) // to update the schoolJoining Status ----------
router.patch('/updateGradeJoinStatus' , updateGradeJoinStatus) // to update the gradeJoining Status ----------
router.patch('/changeAllJoinStatusP' , changeAllJoinStatusP) // to changed the all status to pending ----------
router.patch('/updateIsSeenModal' , updateIsSeenModal) // to update the user joining modal is seen true ----------

module.exports = router;
