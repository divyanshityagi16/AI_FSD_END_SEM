import API from "../api";

function EmployeeList({ employees, fetchEmployees }) {
  const handleDelete = async (id) => {
    try {
      await API.delete(`/employees/${id}`);

      alert("Employee deleted successfully");

      fetchEmployees();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <section className="card">
      <h2>Employee List</h2>

      {employees.length === 0 ? (
        <p className="empty-text">No employees found.</p>
      ) : (
        <div className="employee-grid">
          {employees.map((emp) => (
            <div className="employee-card" key={emp._id}>
              <h3>{emp.name}</h3>

              <p>
                <b>Email:</b> {emp.email}
              </p>

              <p>
                <b>Department:</b> {emp.department}
              </p>

              <p>
                <b>Skills:</b> {emp.skills?.join(", ")}
              </p>

              <p>
                <b>Performance:</b> {emp.performanceScore}
              </p>

              <p>
                <b>Experience:</b> {emp.experience} years
              </p>

              <button
                className="delete-btn"
                onClick={() => handleDelete(emp._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default EmployeeList;