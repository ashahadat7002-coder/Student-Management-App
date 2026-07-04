const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        
    },
    rollNumber:{
        type: String,
        required: true,
        unique: true,
    },

    age:{
        type: String,
        required: true,
    },
    gender:{
        type:  String,
        required: true,
    },
    department:{
        type: String,
        required: true,
        
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phone:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,

    },
});
const Student = mongoose.model("Student",studentSchema);
module.exports = Student;