import { useState } from "react";
import API from "../api";

function SearchFilter({ setEmployees, fetchEmployees }) {
  const [department, setDepartment] = useState("");

  const handleSearch = async () => {
    try {
      const res = await API.get(
        `/employees/search?department=${department}`
      );

      setEmployees(res.data);
    } catch (error) {
      alert("Search failed");
    }
  };

  return (
    <section className="card">
      <h2>Search & Filter Section</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
        <button onClick={fetchEmployees}>Reset</button>
      </div>
    </section>
  );
}

export default SearchFilter;