import "./StudentTable.css";

function StudentTable({
  students = [],
  deleteStudent,
  editStudent,
})  {
  return (
    <section className="student-table">
      <div className="table-header">
        <h2>Student List</h2>
        <span className="student-count">
          Total Students: {students.length}
        </span>
      </div>

      {students.length === 0 ? (
        <p className="empty-message">
          No student records found. Add a student using the form above.
        </p>
      ) : (
        <div className="table-wrapper">
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
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="edit-button"
                        onClick={() => editStudent(student)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => deleteStudent(student._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default StudentTable;