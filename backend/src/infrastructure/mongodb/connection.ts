import mongoose from "mongoose";
import dotenv from  'dotenv';
dotenv.config();

//MongoDB  connection URI is set in the .env file
const mongoURI:string=process.env.MONGO_URL ||'';

mongoose.connect(mongoURI,{})

const db=mongoose.connection;

db.on('error',(error)=>{
    console.error('MongoDB connection Error',error);
})

db.once('open',()=>{
    console.log('Connected to MongoDB');
})

export default db;