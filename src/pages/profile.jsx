import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Profile.css";

function UserProfilePage() {
  const { id } = useParams(); // from URL /user/:id
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:5001/api/User/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div className="error">{error}</div>;

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="user-profile-container">
      <img
        src="https://www.w3schools.com/howto/img_avatar.png"
        alt="Avatar"
        className="user-avatar"
      />
      <h2>{user.fullName}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}

export default UserProfilePage;
