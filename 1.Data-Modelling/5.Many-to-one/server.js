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

// comment schema
const commentSchema = new mongoose.Schema({
    text:String,
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    }
},{timestamps:true});

const comment = mongoose.model("comment",commentSchema);

// student schema
const postSchema = new mongoose.Schema({
    title:String
},{timestamps:true});

const post = mongoose.model("post",postSchema);

// create post
const createPost = async ()=>{
    try{
        const newPost = await post.create({
            name:"Awesome fullstack Project"
        });
        console.log(newPost);
    }
    catch(error){
        console.log(error.message);
    }
}

// createPost();

const createComment = async ()=>{
    try{
        const newCourse = await comment.create({
            text:"Comment 1",
            postId:"667544f226f58763fb59c212"
        })
        console.log(newCourse);
    }
    catch(error){
        console.log(error.message);
    }
}

// createComment();

// fetch documents
const fetchData = async ()=>{
    try{
        const fetchedDoc = await comment.find().populate("postId");
        console.log(fetchedDoc);
    }
    catch(error){
        console.log(error.message);
    }
}

fetchData();

const PORT = 8082;

app.listen(PORT, () => {
  console.log(`Express App running on PORT, ${PORT}`);
});
