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

// Author Schema
const authorSchema = new mongoose.Schema({
    name:String
},{timestamps:true});

const author = mongoose.model("author",authorSchema);

const bookSchema = new mongoose.Schema({
    title:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"author"
    }
});

const book = mongoose.model('Book',bookSchema);



const CreateAuthor = async ()=>{
    try{
        const authorCreated = await author.create({
            name:"Vishal Singh"
        })
        console.log(authorCreated)
    }
    catch(error){
        console.log(error.message);
    }
}

// CreateAuthor();

const createBook = async ()=>{
    try{
        const bookCreated = await book.create({
            title:"Introduction to Programming",
            author:"667486d17d9b046eb85b440f"
        })
        console.log(bookCreated);
    }
    catch(error){
        console.log(error.message);
    }
}

// createBook();

const fetchBooks = async ()=>{
    try{
        const books = await book.find().populate("author");
        console.log(books);
    }
    catch(error){
        console.log(error.message);
    }
}

fetchBooks();

const PORT = 8082;

app.listen(PORT, () => {
  console.log(`Express App running on PORT, ${PORT}`);
});
