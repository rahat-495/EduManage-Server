
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5555 ;
const app = express() ;

app.use(cors({
  origin : [
    'http://localhost:5173',
    'https://school-management-de5a5.web.app',
    'https://school-management-de5a5.firebaseapp.com'
  ],
  credentials : true ,
})) ;
app.use(express.json()) ;
require("dotenv").config() ;


const uri = `mongodb+srv://rahat495:${process.env.DB_PASS}@cluster0.w0yjihf.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const usersCollection = client.db("EduManage").collection("users") ;
    const schoolsCollection = client.db("EduManage").collection("schools") ;
    const classesCollection = client.db("EduManage").collection("classes") ;
    const addmissionsCollection = client.db("EduManage").collection("addmissions") ;
    const studentsCollection = client.db("EduManage").collection("students") ;

    app.get('/yourSchools' , async (req , res) => {
      const {email} = req.query ;
      const result = await schoolsCollection.find({email}).toArray() ;
      res.send(result) ;
    })

    app.get('/yourClasses' , async (req , res) => {
      const {email} = req.query ;
      const result = await classesCollection.find({email}).toArray() ;
      res.send(result) ;
    })

    app.get('/schoolsDetails' , async (req , res) => {
      const {id} = req.query ;
      const result = await schoolsCollection.findOne({_id : new ObjectId(id)}) ;
      res.send(result) ;
    })

    app.get('/subjects' , async (req , res) => {
      const {id} = req.query ;
      const result = await classesCollection.findOne({_id : new ObjectId(id)}) ;
      res.send(result) ;
    })

    // to get user data for useing profile -------------
    app.get('/userData' , async (req , res) => {
      const {email} = req.query ;
      const result = await usersCollection.findOne({email}) ;
      res.send(result) ;
    })

    // to get classes for use school -------------
    app.get('/viewClasses' , async (req , res) => {
      const {id} = req.query ;
      const school = await schoolsCollection.findOne({_id : new ObjectId(id)}) ;
      const classes = school?.classes?.map((classId) => new ObjectId(classId))
      const result = await classesCollection.find({_id : {$in : classes}}).toArray() ;
      res.send(result) ;
    })

    // to get the user role ----------------------
    app.get('/userRole' , async (req , res) => {
      const {email} = req.query ;
      const userData = await usersCollection.findOne({email}) ;
      res.send({role : userData?.role}) ;
    })

    // to get the all schools data for show schools -----------
    app.get('/allSchools' , async (req , res) => {
      const result = await schoolsCollection.find().toArray() ;
      res.send(result) ;
    })

    // to get the classes names -------------------
    app.get('/classesData' , async (req , res) => {
      const {schoolId} = req.query ;
      if(schoolId){
        const school  = await schoolsCollection.findOne({_id : new ObjectId(schoolId)}) ;
        const classesId = school?.classes?.map((id) => new ObjectId(id)) ;
        const classes = await classesCollection.find({ _id : { $in : classesId } }).toArray() ;
        res.send(classes) ;
      }
    })

    // to get the single school data --------------
    app.get('/schoolData' , async (req , res) => {
      const {id} = req.query ;
      const result = await schoolsCollection.findOne({_id : new ObjectId(id)}) ;
      res.send(result) ;
    })

    // to get the selected schools grades ---------
    app.get('/gradesInfo' , async (req , res) => {
      const {schoolId} = req.query ;
      const schooldata = await schoolsCollection.findOne({_id : new ObjectId(schoolId)}) ;
      const gradesId = schooldata?.classes?.map((id) => new ObjectId(id)) ;
      const gradesData = await classesCollection.find({_id : { $in : gradesId }}).sort({ gradeNumber : -1 }).toArray() ;
      res.send(gradesData) ;
    })

    // to get the all personal addmissions --------
    app.get('/addmissionsData' , async (req , res) => {
      const {uid} = req.query ;
      const result = await addmissionsCollection.find({studentUid : uid}).toArray() ;
      res.send(result) ;
    })

    // to get the current Addissional form data -------
    app.get('/currentAddissionFormData' , async (req , res) => {
      const {id} = req.query ;
      const result = await addmissionsCollection.findOne({_id : new ObjectId(id)}) ;
      res.send(result) ;
    })

    // to get the all schools and grades addmissions reqs ----
    app.get('/schoolsAndGradesAddReqs' , async (req , res) => {
      const {email} = req.query ;
      const schoolData = await schoolsCollection.find({email}).toArray() ;
      const gradesData = await classesCollection.find({email}).toArray() ;
      const schoolId = schoolData.map((data) => data?._id.toString()) ;
      // const gradesId = gradesData.map((data) => data?._id.toString()) ;
      const school = await addmissionsCollection.find({ schoolId: { $in: schoolId } }).toArray() ;
      // const grades = await addmissionsCollection.find({ grade: { $in: gradesId } }).toArray() ;
      res.send(school) ;
    })

    // to get the details a addmission info ---------
    app.get('/studentAddmissionInfo' , async (req , res) => {
      const {id} = req.query ;
      const result = await addmissionsCollection.findOne({_id : new ObjectId(id)}) ;
      const gradeData = await classesCollection.findOne({_id : new ObjectId(result?.grade)}) ;
      res.send({...result , gradeNumber : gradeData?.gradeNumber}) ;
    })

    // to get the all students info -----------
    app.get('/allStudents' , async (req , res) => {
      const {email} = req.query ;
      const schoolsData = await schoolsCollection.find({email}).toArray() ;
      const schoolsId = schoolsData?.map((school) => school?._id.toHexString()) ;
      const allStudents = await studentsCollection.find({ schoolId : { $in : schoolsId } }).toArray() ;
      res.send(allStudents) ;
    })

    // to adding schools ----------------------
    app.post('/addSchool' , async (req , res) => {
        const data = req.body ;
        const result = await schoolsCollection.insertOne(data) ;
        res.send(result) ;
    })

    // to adding grades / classes -------------
    app.post('/addClass' , async (req , res) => {
      const classData = req.body ;
      const addClass = await classesCollection.insertOne(classData) ;
      const classId = addClass.insertedId.toHexString() ;
      const updatedSchool = await schoolsCollection.findOne({_id : new  ObjectId(classData?.schoolId)})
      updatedSchool?.classes?.push(classId) ;
      updatedSchool?.availableGrades?.push(classData?.gradeNumber) ;
      await schoolsCollection.updateOne({_id : new  ObjectId(classData?.schoolId)} , { $set : { classes :  updatedSchool?.classes , availableGrades : updatedSchool?.availableGrades } })
      res.send(addClass) ;
    })

    // to post the addmission request --------------
    app.post('/reqForAddmission' , async (req , res) => {
      const addmissionData = req.body ;
      const {gradeNumber} = await classesCollection.findOne({_id : new ObjectId(addmissionData?.grade)}) ;
      addmissionData.gradeNumber = gradeNumber ;
      const isAxist = await addmissionsCollection.findOne({studentEmail : addmissionData?.studentEmail}) ;
      if(addmissionData?.schoolId !== isAxist?.schoolId){
        const result = await addmissionsCollection.insertOne(addmissionData) ;
        return res.send(result) ;
      }
      else{
        return res.send({message : "You Are Already Applied , on this school or grade !" , success : false}) ;
      }
    })

    // to update the addmission data ---------------
    app.post('/updateAddmission' , async (req , res) => {
      const {id} = req.query ;
      const data = req.body ;
      const result = await addmissionsCollection.updateOne({_id : new ObjectId(id)} , { $set : { ...data } })
      res.send(result) ;
    })

    // to update the school Info -------------------
    app.put('/updateSchool' , async (req , res) => {
      const {id} = req.query ;
      const updatedData = req.body ;
      const result = await schoolsCollection.updateOne({_id : new ObjectId(id)} , { $set : { ...updatedData } }) ;
      res.send(result)
    })

    // to Create a user and save to db -------------
    app.put('/createUser' , async (req , res) => {
      const data = req.body ;
      const isAxist = await usersCollection.findOne({email : data?.email}) ;
      if(!isAxist){
        const user = await usersCollection.insertOne(data) ;
        return res.send(user) ;
      }
      else{
        return res.send({message : "Already Axist"}) ;
      }
    })

    // update user device info or data -------------
    app.put('/updateDevice' , async (req , res) => {
      const data = req.body ;
      const userData = await usersCollection.findOne({email : data?.email}) ;

      if(userData?.email){
        
        const os = userData?.devicesInfo?.find((os) => os?.deviceName === data?.devicesInfo?.deviceName && os) ;
        const date = userData?.devicesInfo?.find((os) => os?.loginDate?.includes(data?.devicesInfo?.loginDate) && os) ;

        if(date?.loginDate !== data?.devicesInfo?.loginDate){
          if(os?.deviceName === data?.devicesInfo?.deviceName){
            os.loginDate = data?.devicesInfo?.loginDate ;
            const result = await usersCollection.updateOne({email : data?.email} , { $set : { devicesInfo : userData?.devicesInfo } }) ;
            res.send(result) ;
          }
          else{
            userData?.devicesInfo?.push(data?.devicesInfo)
            const result = await usersCollection.updateOne({email : data?.email} , { $set : { devicesInfo : userData?.devicesInfo } }) ;
            res.send(result) ;
          }
        }
      }
    })

    // to update the schoolJoining Status ----------
    app.patch('/updateSchoolJoinStatus' , async (req , res) => {
      const {id , schoolJoiningStatus} = req.body ;
      const addmissionData = await addmissionsCollection.findOne({_id : new ObjectId(id)}) ;
      const isStudentAxist = await studentsCollection.findOne({studentEmail : addmissionData?.studentEmail}) ;
      if(!addmissionData?.isjoined){
        if(schoolJoiningStatus === 'accepted' && addmissionData?.gradeJoiningStatus === 'accepted'){
          await addmissionsCollection.updateOne({_id : new ObjectId(id)} , { $set : { isjoined : true } }) ;
          if(!isStudentAxist?.studentEmail){
            await studentsCollection.insertOne({ ...addmissionData , schoolJoiningStatus : true , gradeJoiningStatus : true , isjoined : true , date : new Date().toDateString() , filteringDate : new Date().toLocaleDateString() })
          }
        }
        if(addmissionData?.gradeJoiningStatus === 'rejected' && addmissionData?.schoolJoiningStatus === 'rejected'){
          await addmissionsCollection.updateOne({_id : new ObjectId(id)} , { $set : { isjoined : false } }) ;
        }
        const result = await addmissionsCollection.updateOne({_id : new ObjectId(id)} , { $set : { schoolJoiningStatus } }) ;
        return res.send(result) ;
      }
      else if(schoolJoiningStatus === addmissionData?.schoolJoiningStatus){
        return res.send({message : "You Already Accept Him !" , status : 'warning'}) ;
      }
      else{
        return res.send({message : "You Can't Accept Now !" , status : 'error'}) ;
      }
    })
    
    // to update the gradeJoining Status ----------
    app.patch('/updateGradeJoinStatus' , async (req , res) => {
      const {id , gradeJoiningStatus} = req.body ;
      const addmissionData = await addmissionsCollection.findOne({_id : new ObjectId(id)}) ;
      const isStudentAxist = await studentsCollection.findOne({studentEmail : addmissionData?.studentEmail}) ;
      if(!addmissionData?.isjoined){
        if(gradeJoiningStatus === 'accepted' && addmissionData?.schoolJoiningStatus === 'accepted'){
          await addmissionsCollection.updateOne({_id : new ObjectId(id)} , { $set : { isjoined : true } }) ;
          if(!isStudentAxist?.studentEmail){
            await studentsCollection.insertOne({ ...addmissionData , schoolJoiningStatus : true , gradeJoiningStatus : true , isjoined : true , date : new Date().toDateString() , filteringDate : new Date().toLocaleDateString() })
          }
        }
        if(addmissionData?.gradeJoiningStatus === 'rejected' && addmissionData?.schoolJoiningStatus === 'rejected'){
          await addmissionsCollection.updateOne({_id : new ObjectId(id)} , { $set : { isjoined : false } }) ;
        }
        const result = await addmissionsCollection.updateOne({_id : new ObjectId(id)} , { $set : { gradeJoiningStatus } }) ;
        return res.send(result) ;
      }
      else if(gradeJoiningStatus === addmissionData?.gradeJoiningStatus){
        return res.send({message : "You Already Accept Him !" , status : 'warning'}) ;
      }
      else{
        return res.send({message : "Hi already joined one !" , status : 'error'}) ;
      }
    })

    // to changed the all status to pending ----------
    app.patch('/changeAllJoinStatusP' , async (req , res) => {
      const {id} = req.body ;
      const result = await addmissionsCollection.updateOne({_id : new ObjectId(id)} , { $set : { schoolJoiningStatus : 'pending' , gradeJoiningStatus : 'pending' , isjoined : false } }) ;
      res.send(result) ;
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/' , (req , res) => {
    res.send("school server is running !")
})

app.listen(port , () => {
    console.log(`the server is running at port ${port}`);
})
