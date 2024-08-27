
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

    app.post('/addSchool' , async (req , res) => {
        const data = req.body ;
        const result = await schoolsCollection.insertOne(data) ;
        res.send(result) ;
    })

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
      const isAxist = await addmissionsCollection.findOne({ $and : [ {studentEmail : addmissionData?.studentEmail} , {schoolId : addmissionData?.schoolId} , {grade : addmissionData?.grade} ] }) ;
      
      if(!isAxist?.studentEmail){
        const result = await addmissionsCollection.insertOne(addmissionData) ;
        return res.send(result) ;
      }
      else{
        return res.send({message : "You Are Already Applied , on this school or grade !" , success : false}) ;
      }
    })

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
