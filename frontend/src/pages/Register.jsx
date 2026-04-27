import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    await axios.post("http://localhost:4000/api/auth/register", form);
    alert("Registered Successfully");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80 space-y-3">
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input className="w-full border p-2"
          placeholder="Name"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input className="w-full border p-2"
          placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input type="password" className="w-full border p-2"
          placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <select className="w-full border p-2"
          onChange={(e)=>setForm({...form,role:e.target.value})}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        <button onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-2 rounded">
          Register
        </button>
           <p className="text-sm text-center">
          if you've an account? <Link to="/" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
}