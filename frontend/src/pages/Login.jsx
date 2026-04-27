
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:4000/api/auth/login", form);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80 space-y-3">
        <h2 className="text-xl font-bold text-center">Login</h2>

        <input className="w-full border p-2"
          placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input type="password" className="w-full border p-2"
          placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <button onClick={handleLogin}
          className="w-full bg-green-600 text-white p-2 rounded">
          Login
        </button>

        <p className="text-sm text-center">
          No account? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </div>
    </div>
  );
}