import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        form
      );

      // ✅ Store token + role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "admin");

      navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 px-4">
      
      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-xl"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Admin Login
          </h2>
          <p className="text-sm text-gray-500">
            Access your dashboard
          </p>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="text-sm text-gray-600 mb-1 block">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition duration-200"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center mt-5 text-sm text-gray-500">
          New user?{" "}
          <Link
            to="/register"
            className="text-green-700 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;