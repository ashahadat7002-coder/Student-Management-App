import API from "./services/api";
import "./App.css";
import Navbar from "./components/Navbar";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import { useState,useEffect } from "react";


function App(){
  const[students,setStudents] = useState([]);
  const[selectedStudent,setSelectedStudent] = useState(null);
  const getStudents = async() => {
    try{
      const response = await API.get("/");
      setStudents(response.data.data);

    }catch(error){
      console.log(error);

    }
  };
  const deleteStudent = async(id) => {
    try{
      await API.delete(`/${id}`);
      alert("Student deleted successfully!")
      getStudents();
    }catch(error){
      console.log(error);
    }
  };
  const editStudent = (student) => {
    setSelectedStudent(student);
  };
  useEffect(()=>{
    getStudents();
  },[])

  console.log(students);
  return(
    <div className="app">
      <Navbar/>
      <StudentForm selectedStudent={selectedStudent} getStudent={getStudents} setSelectedStudent={setSelectedStudent}/>
      <StudentTable students={students} deleteStudent={deleteStudent} editStudent={editStudent}/>

    </div>
  );
}
export default App;