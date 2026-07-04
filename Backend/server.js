const express = require("express");
const cors = require("cors");
const dotenv =  require("dotenv")
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");


dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/students",studentRoutes);

app.get("/",(req,res) =>{
    res.send("Welcome to Student Management API");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});