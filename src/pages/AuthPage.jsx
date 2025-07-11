import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/auth.css";

function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const isFullNameValid = (name) => /^[A-Za-z\s]+$/.test(name);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("role", data.role);
      navigate(data.role === "admin" ? "/admin" : "/dashboard");

    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isFullNameValid(fullName)) {
      setError("Full Name must contain only letters and spaces.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("role", data.role);
      navigate(data.role === "admin" ? "/admin" : "/dashboard");

    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="auth-page" style={{ maxWidth: "400px", margin: "50px auto" }}>
      <div className="auth-toggle" style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
        <button
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
          <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
            Login
          </button>
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
          <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}

export default AuthPage;
