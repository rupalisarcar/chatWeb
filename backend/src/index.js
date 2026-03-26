import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js';
import { ENV } from './lib/env.js';

dotenv.config();

const app = express();

const PORT = ENV.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
// console.log('ENV.CLIENT_URL',ENV.CLIENT_URL)
app.use(cors({origin:ENV.CLIENT_URL, credentials:true}))

app.use('/api/auth', authRouter)
app.use('/api/messages', messageRouter)

app.use('/uploads', express.static('uploads'))

mongoose.connect(ENV.MONGO_URI)
.then((conn)=>console.log('mongoose connected',conn.connection.host))
.catch((err)=>console.log(err))

app.listen(PORT,()=>{
    console.log("Server has started 3000 123")
})