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

// student schema
const studentSchema = new mongoose.Schema({
    name:String,
    age:Number,
    grade:String
});

const student = mongoose.model("Student",studentSchema);

const classroomSchema = new mongoose.Schema({
    className:String,
    students:[studentSchema]
});

const classroom = mongoose.model("Class",classroomSchema);

const createClassroom = async ()=>{
    try{
        const newClassroom = await classroom.create({
            className:"History 101",
            students:[
                {name:"Aditya Singh",age:28,grade:"B"},
                {name:"Kanika Chaudhary",age:22,grade:"A"},
                {name:"Vaishali Chaudhary",age:25,grade:"A+"},
            ]
        });
        console.log(newClassroom);
    }
    catch(error){
        console.log(error.message);
    }
}

// createClassroom();

const addStudentToClassroom = async ()=>{
    try{
        // Find classroom and update
        const classromUpdated = await classroom.findByIdAndUpdate(
            "66747c046bcdfcc5265b3d19",
            {$addToSet:{students:{name:"Vishal Chaudhary",age:30,grade:"A"}}},
            {new:true}
        );
        console.log(classromUpdated);
    }
    catch(error){
        console.log(error.message);
    }
}
addStudentToClassroom();

const PORT = 8082;

app.listen(PORT, () => {
  console.log(`Express App running on PORT, ${PORT}`);
});
