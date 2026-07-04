import "./StudentTable.css";

function StudentTable({students,deleteStudent,editStudent}){
    return(
        <div className="student-table">
            <h2>Student List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            
                            <td>{student.name}</td>
                            <td>{student.rollNumber}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>
                            <td>{student.department}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>{student.address}</td>
                            <td>
                                <button onClick={()=>editStudent(student)}>Edit</button>
                                <button onClick={()=>deleteStudent(student._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default StudentTable;