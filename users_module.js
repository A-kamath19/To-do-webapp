//Step 1: Database connection
const mongoose = require("mongoose");
const dotenv = require("dotenv")

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected successfully..."))
.catch( (error) => console.log(error) );


//Step 2: Create Schema (Java Class)
const userSchema = new mongoose.Schema({
    task: String,
    description: String
})


//Step 3: Create collection Object (model)
// MAPPING
const userObject = new mongoose.model("tasks", userSchema);
exports.User = userObject;