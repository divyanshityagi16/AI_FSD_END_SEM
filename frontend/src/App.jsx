import { useEffect, useState } from "react";
import API from "./api";

import Login from "./components/Login";
import Signup from "./components/Signup";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import SearchFilter from "./components/SearchFilter";
import Recommendation from "./components/Recommendation";

import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      fetchEmployees();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setPage("login");
  };

  if (!isLoggedIn) {
    if (page === "signup") {
      return <Signup setPage={setPage} />;
    }

    return (
      <Login
        setPage={setPage}
        setIsLoggedIn={setIsLoggedIn}
        fetchEmployees={fetchEmployees}
      />
    );
  }

  return (
    <div className="main-container">
      <nav className="navbar">
        <h1>AI-Based Employee Performance Analytics System</h1>
        <button onClick={logout}>Logout</button>
      </nav>

      <EmployeeForm fetchEmployees={fetchEmployees} />

      <SearchFilter
        setEmployees={setEmployees}
        fetchEmployees={fetchEmployees}
      />

      <EmployeeList
        employees={employees}
        fetchEmployees={fetchEmployees}
      />

      <Recommendation />
    </div>
  );
}

export default App;