import { useState } from "react";
import API from "../api";

function EmployeeForm({ fetchEmployees }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    skills: "",
    performanceScore: "",
    experience: "",
  });

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    const employeeData = {
      name: form.name,
      email: form.email,
      department: form.department,
      skills: form.skills.split(",").map((skill) => skill.trim()),
      performanceScore: Number(form.performanceScore),
      experience: Number(form.experience),
    };

    try {
      await API.post("/employees", employeeData);

      alert("Employee added successfully");

      setForm({
        name: "",
        email: "",
        department: "",
        skills: "",
        performanceScore: "",
        experience: "",
      });

      fetchEmployees();
    } catch (error) {
      alert(error.response?.data?.message || "Employee not added");
    }
  };

  return (
    <section className="card">
      <h2>Employee Registration Form</h2>

      <form className="employee-form" onSubmit={handleAddEmployee}>
        <input
          type="text"
          placeholder="Employee Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Department"
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Skills comma separated"
          value={form.skills}
          onChange={(e) =>
            setForm({ ...form, skills: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Performance Score"
          value={form.performanceScore}
          onChange={(e) =>
            setForm({ ...form, performanceScore: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Years of Experience"
          value={form.experience}
          onChange={(e) =>
            setForm({ ...form, experience: e.target.value })
          }
          required
        />

        <button type="submit">Add Employee</button>
      </form>
    </section>
  );
}

export default EmployeeForm;