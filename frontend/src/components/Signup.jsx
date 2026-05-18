import { useState } from "react";
import API from "../api";

function Signup({ setPage }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", form);

      alert("Signup successful. Now login.");
      setPage("login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSignup}>
        <h2>Signup</h2>

        <input
          type="text"
          placeholder="Enter name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        <input
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button type="submit">Signup</button>

        <p>
          Already have an account?{" "}
          <span onClick={() => setPage("login")}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default Signup;