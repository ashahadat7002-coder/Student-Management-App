import { useEffect, useState } from "react";

import API from "./services/api";
import Navbar from "./components/Navbar";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/");

      const studentsData = Array.isArray(response.data?.data)
        ? response.data.data
        : [];

setStudents(studentsData);
    } catch (error) {
      console.error("Failed to fetch students:", error);
      setError("Unable to load students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await API.delete(`/${id}`);

      alert("Student deleted successfully!");

      if (selectedStudent?._id === id) {
        setSelectedStudent(null);
      }

      await getStudents();
    } catch (error) {
      console.error("Failed to delete student:", error);
      alert(
        error.response?.data?.message ||
          "Unable to delete the student. Please try again."
      );
    }
  };

  const editStudent = (student) => {
    setSelectedStudent(student);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="app">
      <Navbar />

      <StudentForm
        selectedStudent={selectedStudent}
        getStudents={getStudents}
        setSelectedStudent={setSelectedStudent}
      />

      {loading && <p className="status-message">Loading students...</p>}

      {error && <p className="status-message error-message">{error}</p>}

      {!loading && !error && (
        <StudentTable
          students={students}
          deleteStudent={deleteStudent}
          editStudent={editStudent}
        />
      )}
    </div>
  );
}

export default App;