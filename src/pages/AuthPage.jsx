import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/auth.css";

function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState("");

  // Login states
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup states
  const [signupFullName, setSignupFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://localhost:7162/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save to localStorage
      //localStorage.setItem("userId", data.userId);
      //localStorage.setItem("role", data.role);

      localStorage.setItem("user", JSON.stringify({
        id: data.userId,
        role: data.role,
        username: data.username || loginUsername, // fallback if username not returned from API
      }));

       localStorage.setItem("loggedIn", "true");


      // Redirect to profile or home page
      navigate("/");
    } catch (err) {
      setError("An error occurred. Try again.");
      console.error(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://localhost:7162/api/Auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: signupFullName,
          email: signupEmail,
          username: signupUsername,
          password: signupPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      alert("Signup successful. Please login.");
      setIsLoginMode(true);
    } catch (err) {
      setError("An error occurred. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLoginMode ? "Login" : "Sign Up"}</h2>

      <form onSubmit={isLoginMode ? handleLogin : handleSignup}>
        {!isLoginMode && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={signupFullName}
              onChange={(e) => setSignupFullName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />
          </>
        )}

        {isLoginMode && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
          </>
        )}

        {error && <p className="error">{error}</p>}
        <button type="submit">{isLoginMode ? "Login" : "Sign Up"}</button>
      </form>

      <p>
        {isLoginMode
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <button onClick={() => setIsLoginMode(!isLoginMode)}>
          {isLoginMode ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default AuthPage;
