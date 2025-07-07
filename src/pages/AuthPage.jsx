import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/auth.css";

function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Common states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  // Signup-specific states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  // Validate full name - only letters and spaces allowed
  const isFullNameValid = (name) => /^[A-Za-z\s]+$/.test(name);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    const storedRole = localStorage.getItem("role");

    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem("loggedIn", "true");
      setError("");
      navigate(storedRole === "admin" ? "/admin" : "/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  // Handle Signup
  const handleSignup = (e) => {
    e.preventDefault();

    if (!isFullNameValid(fullName)) {
      setError("Full Name must contain only letters and spaces, no numbers.");
      return;
    }

    // Optional: you can add email format validation here

    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("role", role);
    localStorage.setItem("loggedIn", "true");

    setError("");
    navigate(role === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <div className="auth-page" style={{ maxWidth: "400px", margin: "50px auto" }}>
      <div className="auth-toggle" style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
        <button
          className={isLoginMode ? "active" : ""}
          onClick={() => {
            setIsLoginMode(true);
            setError("");
          }}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: isLoginMode ? "#007bff" : "#ddd",
            color: isLoginMode ? "white" : "black",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Login
        </button>
        <button
          className={!isLoginMode ? "active" : ""}
          onClick={() => {
            setIsLoginMode(false);
            setError("");
          }}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: !isLoginMode ? "#007bff" : "#ddd",
            color: !isLoginMode ? "white" : "black",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Sign Up
        </button>
      </div>

      {isLoginMode ? (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>Login</button>
        </form>
      ) : (
        <form onSubmit={handleSignup}>
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>Sign Up</button>
        </form>
      )}
    </div>
  );
}

export default AuthPage;
