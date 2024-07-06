// import { connect, connection } from "mongoose";
const m = require('mongoose');

const mongoURI = "mongodb://localhost:27017/iNotebook";
const connectToMongo = () => {
    // m.connect(mongoURI, () => {
    //     console.log("connect to mongoose");
    // })
    m.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
 
    const db = m.connection;

    db.on("error", (error) => {
        console.error("Error connecting to MongoDB:", error);
    });

    db.once("open", () => {
        console.log("Connected to MongoDB");
    });
   
};
module.exports = connectToMongo;
// export default connectToMongo;
 