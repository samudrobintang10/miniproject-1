import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://10.50.0.13:3001/login", {
        email: formData.email,
        password: formData.password,
      });
      toast("Selamat datang " + formData.email);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("userId", response.data.user.id);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    // Pastikan container utama di-set "relative" agar posisi absolute emoji bisa diatur
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      {/* Emoji di kiri */}
      <div className="absolute left-120 top-1/2 transform -translate-y-1/2 text-4xl">
        😊
      </div>
      {/* Emoji di kanan */}
      <div className="absolute right-120 top-1/2 transform -translate-y-1/2 text-4xl">
        😊
      </div>

      {/* Card/form login */}
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <InputField
              type="email"
              value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
              label="Email"
            />
          </div>
          <div className="mb-4">
            <InputField
              type="password"
              value={formData.password}
              onChange={(event) =>
                setFormData({ ...formData, password: event.target.value })
              }
              label="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-5 flex justify-center items-center gap-x-1">
          <p>Kamu belum punya akun?</p>
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

