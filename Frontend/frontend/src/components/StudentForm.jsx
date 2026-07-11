import { useEffect, useState } from "react";

import API from "../services/api";
import "./StudentForm.css";

function StudentForm({
  selectedStudent,
  getStudents,
  setSelectedStudent,
}) {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (selectedStudent) {
      setName(selectedStudent.name);
      setRollNumber(selectedStudent.rollNumber);
      setAge(selectedStudent.age);
      setGender(selectedStudent.gender);
      setDepartment(selectedStudent.department);
      setEmail(selectedStudent.email);
      setPhone(selectedStudent.phone);
      setAddress(selectedStudent.address);
    }
  }, [selectedStudent]);

  const clearForm = () => {
    setName("");
    setRollNumber("");
    setAge("");
    setGender("");
    setDepartment("");
    setEmail("");
    setPhone("");
    setAddress("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setMessage("");
      setError("");

      const studentData = {
        name,
        rollNumber,
        age: Number(age),
        gender,
        department,
        email,
        phone,
        address,
      };

      if (selectedStudent) {
        await API.put(`/${selectedStudent._id}`, studentData);
        setMessage("Student updated successfully.");
      } else {
        await API.post("/", studentData);
        setMessage("Student added successfully.");
      }

      clearForm();
      setSelectedStudent(null);
      await getStudents();

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Student form error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to save the student. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    clearForm();
    setSelectedStudent(null);
    setMessage("");
    setError("");
  };

  return (
    <section className="student-form">
      <h2>{selectedStudent ? "Update Student" : "Add Student"}</h2>

      {message && <p className="form-message success-message">{message}</p>}

      {error && <p className="form-message error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Student Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter student name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number</label>
            <input
              id="rollNumber"
              type="text"
              placeholder="Enter roll number"
              value={rollNumber}
              onChange={(event) => setRollNumber(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              min="1"
              max="100"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              id="department"
              type="text"
              placeholder="Enter department"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              pattern="[0-9]{10}"
              title="Phone number must contain exactly 10 digits"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={submitting}>
            {submitting
              ? "Saving..."
              : selectedStudent
                ? "Update Student"
                : "Add Student"}
          </button>

          {selectedStudent && (
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default StudentForm;