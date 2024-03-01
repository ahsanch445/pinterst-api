const mongoose = require("mongoose");
require("dotenv").config();

console.log(process.env.URL);

const dataBase = () => {


    
 mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true });

    
    mongoose.connection.on('connected', () => {
        console.log("Connected to MongoDB");
    });

    mongoose.connection.on('error', (err) => {
        console.error("Error connecting to MongoDB:", err);
    });
};
dataBase()

module.exports = mongoose;
