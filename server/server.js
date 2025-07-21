import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoute from './routes/authRoute.js'
import messageRoute from './routes/messageRoute.js'
import connectDb from './config/db.js';
import { app,server } from './lib/socket.js'
const PORT=process.env.pORT;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true
}));


app.use('/api/auth',authRoute);
app.use('/api/message',messageRoute);
server.listen(PORT,()=>{
    connectDb();
    console.log(`Server Listening to port ${PORT}`)
    
})
