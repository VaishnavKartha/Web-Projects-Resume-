import mongoose from 'mongoose'

const connectDb=async()=>{
    try {
        mongoose.connection.on('connected',()=>console.log("Connection successful"))
        await mongoose.connect(`${process.env.MONGODB_URI}/chatDb`)
        
    } catch (error) {
        console.log(error.message)
    }
    
}

export default connectDb