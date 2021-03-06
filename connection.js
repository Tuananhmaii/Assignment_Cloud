const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB connected`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB