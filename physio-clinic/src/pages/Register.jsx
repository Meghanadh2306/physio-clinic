import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);

      alert("Registration successful ✅");
      navigate("/admin-login"); // redirect to login
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 px-4">
      
      <form
        onSubmit={handleRegister}
        className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-xl"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Create Account
          </h2>
          <p className="text-sm text-gray-500">
            Register to get started
          </p>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="text-sm text-gray-600 mb-1 block">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            onChange={handleChange}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition duration-200"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        {/* 🔥 Return to Login */}
        <p className="text-center mt-5 text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/admin-login"
            className="text-green-700 font-semibold hover:underline"
          >
            Return to Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;