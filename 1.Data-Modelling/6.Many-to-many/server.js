const express = require("express");
const mongoose = require("mongoose");

const app = express();
const mongodbURL =
  "mongodb+srv://chaudharyaditya41:xIIaFbMscNbxbMOG@fullstack-cluster.ahasqgz.mongodb.net/?retryWrites=true&w=majority&appName=fullstack-cluster";
const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};

connectDB();

// course schema
const courseSchema = new mongoose.Schema({
    name:String,
    enrolledStudents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"student"
        }
    ]
},{timestamps:true});

const course = mongoose.model("course",courseSchema);

const studentSchema = new mongoose.Schema({
    name:String,
    cousersEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course"
    }]
},{timestamps:true})

const student = mongoose.model("student",studentSchema);

// create course
const createCourse = async ()=>{
    try{
        const newCourse = await course.create([
            {
                name:"Maths 101",
            },
            {
                name:"History 102"
            }
        ]);
        console.log(newCourse);
    }
    catch(error){
        console.log(error.message)
    }
}

// createCourse();

const createStudent = async ()=>{
    try{
        const newStudent = await student.create([
            {name:"Aditya Singh"},
            {name:"Kanika Chaudhary"}
        ]);
        console.log(newStudent);
    }
    catch(error){
        console.log(error.message);
    }
}
// createStudent();

// students applying to courses
const applyToCourse = async ()=>{
    try{
        // 1.FInd student
        const studentFound = await student.findById("66757019958dc2c9681019dc");
        console.log(studentFound);
        // 2.Find the course
        const courseFound = await course.findById("66756cc09d8ea26a2aac7d71");
        console.log(courseFound);

        studentFound.cousersEnrolled.push(courseFound);
        courseFound.enrolledStudents.push(studentFound);
        console.log(studentFound);
        console.log(courseFound);

        studentFound.save();
        courseFound.save();

    }
    catch(error){
        console.log(error.message)
    }
}

// applyToCourse();

// fetch data
const fetchData = async ()=>{
    try{
        const getStudents = await student.find().populate("cousersEnrolled");
        console.log(getStudents);
        const getCourses = await course.find().populate("enrolledStudents");
        console.log(getCourses);
    }catch(error){
        console.log(error.message)
    }
}
fetchData();
const PORT = 8082;

app.listen(PORT, () => {
  console.log(`Express App running on PORT, ${PORT}`);
});
