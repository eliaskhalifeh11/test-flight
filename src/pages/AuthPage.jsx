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

  // Password visibility
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const navigate = useNavigate();

  const isFullNameValid = (name) => /^[A-Za-z\s]+$/.test(name);
  const isUsernameValid = (username) => {
  return /[a-zA-Z]/.test(username); // must contain at least one letter
};


  const handleLogin = async (e) => {
    e.preventDefault();
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


        localStorage.setItem("user", JSON.stringify({
          id: data.user_id,           // <== this line added
          username: data.username,
          role: data.role,
          token: data.token
        }));



      localStorage.setItem("loggedIn", "true");
      navigate("/");


    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

 const handleSignup = async (e) => {
  e.preventDefault();

  if (!isFullNameValid(signupFullName)) {
    setError("Full Name must contain only letters and spaces.");
    return;
  }

  if (!isUsernameValid(signupUsername)) {
    setError("Username must contain at least one letter.");
    return;
  }

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

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", data.role);
    navigate("/");
  } catch (err) {
    setError("Server error. Try again later.");
  }
};


  return (
    <div className="auth-page">
      <div className="auth-toggle">
        <button
          onClick={() => {
            setIsLoginMode(true);
            setError("");
          }}
          className={isLoginMode ? "active" : ""}
        >
          Login
        </button>
        <button
          onClick={() => {
            setIsLoginMode(false);
            setError("");
          }}
          className={!isLoginMode ? "active" : ""}
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
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            required
          />
          <div className="password-field">
            <input
              type={showLoginPassword ? "text" : "password"}
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-pass"
              onClick={() => setShowLoginPassword((prev) => !prev)}
            >
              {showLoginPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit">Login</button>
        </form>
      ) : (
        <form onSubmit={handleSignup}>
          <h2>Sign Up</h2>
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
          <div className="password-field">
            <input
              type={showSignupPassword ? "text" : "password"}
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-pass"
              onClick={() => setShowSignupPassword((prev) => !prev)}
            >
              {showSignupPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
}

export default AuthPage;
