import "./StudentForm.css"
import { useState, useEffect } from "react";
import API from "../services/api";

function StudentForm({selectedStudent,getStudent,setSelectedStudent,}) {
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[rollNumber,setRollNumber] = useState("");
    const[age,setAge]=useState("")
    const[gender,setGender] = useState("");
    const[department,setDepartment] = useState("");
    const[phone,setPhone] = useState("");
    const[address,setAddress] = useState("");
    const[message,setMessage] = useState("");
    useEffect(() =>{
        if(selectedStudent){
            setName(selectedStudent.name);
            setRollNumber(selectedStudent.rollNumber);
            setAge(selectedStudent.age);
            setGender(selectedStudent.gender);
            setDepartment(selectedStudent.department);
            setEmail(selectedStudent.email);
            setPhone(selectedStudent.phone);
            setAddress(selectedStudent.address);
        }
    },[selectedStudent]);
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            if (selectedStudent){
                await API.put(`/${selectedStudent._id}`,{
                name,rollNumber,age,gender,department,email,phone,address
            });
            alert("Student updated successfully!")
            }else{
            await API.post("/",{
                name,rollNumber,age,gender,department,email,phone,address
            });
            alert("Student added successfully!")
            
            };
            setName("");
            setEmail("");
            setRollNumber("");
            setAge("");
            setGender("");
            setDepartment("");
            setPhone("");
            setAddress("")
            getStudent();
            setSelectedStudent(null);

        }catch(error){
            console.log(error.response?.data);
        }
    };
    return(
        <div className="student-form">
            <h2>Add Student</h2>
            
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Student Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="text"placeholder="Enter RollNumber"value={rollNumber}onChange={(e)=>setRollNumber(e.target.value)} />
                <input type="number"placeholder="Enter Age" value={age}onChange={(e) => setAge(e.target.value)} />
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input type="text"placeholder="Enter department" value={department}onChange={(e)=>setDepartment(e.target.value)} />
                <input type="email" placeholder="Enter Email"value={email}onChange={(e)=>setEmail(e.target.value)} />
                <input type="text" placeholder="Enter phone number"value={phone}onChange={(e)=>setPhone(e.target.value)} />
                <input type="text" placeholder="Enter address" value={address}onChange={(e)=>setAddress(e.target.value)} />
                <button type="submit">{selectedStudent ?"Update Student":"Add Student"}</button>
            </form>
            
        </div>
    );
}
export default StudentForm;