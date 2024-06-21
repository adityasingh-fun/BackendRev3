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
    text:String
},{timestamps:true});

const comment = mongoose.model("comment",commentSchema);

// Post schema
const postSchema = new mongoose.Schema({
    title:String,
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
    ]
});
const post = mongoose.model("post",postSchema);

// create post

// const createPost = async ()=>{
//     try{
//         const newPost = await post.create({
//             title:"Fullstack course"
//         });
//         console.log(newPost);
//     }
//     catch(error){
//         console.log(error.message);
//     }
// }
// createPost();

const createComment = async ()=>{
    try{
        // Find the post
        const postFound = await post.findById("667538a71f9ae6dfa6973c2f");
        // console.log(postFound);

        // create comment
        const newComment = await comment.create({
            text:"Cpoied content"
        });

        // push the comment into the post
        postFound.comments.push(newComment);
        postFound.save();
        console.log(postFound);
    }
    catch(error){
        console.log(error.message);
    }
}
// createComment();

// fetch Posts
const fetchComments = async ()=>{
    try{
        const posts = await post.find().populate("comments");
        console.log(posts);
    }
    catch(error){
        console.log(error.message);
    }
}

fetchComments();

const PORT = 8082;

app.listen(PORT, () => {
  console.log(`Express App running on PORT, ${PORT}`);
});
