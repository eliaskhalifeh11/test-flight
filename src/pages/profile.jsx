import { useEffect, useState } from "react";
import "../css/Profile.css";

function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("userId");

    if (!id) {
      setError("Invalid or missing user ID.");
      return;
    }

    fetch(`https://localhost:7162/api/User/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        setError(err.message || "Error fetching user info.");
      });
  }, []);

  if (error) return <div className="error">{error}</div>;

  if (!user) return <div>Loading user profile...</div>;

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <p><strong>Full Name:</strong> {user.full_name}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}

export default UserProfilePage;
