import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-blue-600 text-white flex justify-between p-4">
      <h1 className="font-bold text-lg">Hospital System</h1>
      <button onClick={logout} className="bg-red-500 px-4 py-1 rounded">
        Logout
      </button>
    </div>
  );
}