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

const addressSchema = new mongoose.Schema(
  {
    street: String,
    city: String,
    state: String,
    pinCode: Number,
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    address: addressSchema, // embedded approach
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);

const createUser = async () => {
  try {
    const userCreated = await user.create({
      name: "Aditya Singh",
      email: "chaudhary@gmail.com",
      address: {
        street: "263 Nasirpur",
        city: "Ghaziabad",
        state: "Uttar Pradesh",
        pincode: 201001,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

createUser();

const PORT = 8082;

app.listen(PORT, () => {
  console.log(`Express App running on PORT, ${PORT}`);
});
