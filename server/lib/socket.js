import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app=express();
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:['http://localhost:5174'],
        credentials: true
    }
})
const userSocketMap={};
export function getSocketId(userId){
    return userSocketMap[userId];
}
io.on('connection',(socket)=>{
    console.log("A user connected",socket.id);
    const userId=socket.handshake.query.userId;
    console.log(userId)
    if(userId){
        userSocketMap[userId]=socket.id;
    }

    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on('disconnect',()=>{
        console.log("A user disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("DeleteUser",Object.keys(userSocketMap));
    })
})

export {io,server,app};