import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const id = localStorage.getItem("userId");

  useEffect(() => {
    if (!id) {
      setError("User is not logged in.");
      setLoading(false);
       navigate("/login");
      return;
    }
    
    fetch(`https://localhost:7162/api/User/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
 }, [id, navigate]);

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-profile-container">
      <img
        src={user.avatar_url || "https://www.w3schools.com/howto/img_avatar.png"}
        alt="Avatar"
        className="user-avatar"
      />
      <h2>{user.full_name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}

export default UserProfilePage;
