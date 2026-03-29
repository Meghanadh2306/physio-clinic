import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 🔐 Auth
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const linkClass = (path) =>
    location.pathname === path
      ? "text-green-700 font-semibold border-b-2 border-green-600 pb-1"
      : "text-gray-700 hover:text-green-600 transition";

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-6 md:px-20 py-4">

        {/* LOGO */}
<div className="flex items-center gap-2">
  <img
  src={logo}
  alt="logo"
  className="w-10 h-10 rounded-full object-cover"
/>
  <span className="font-semibold text-green-700">
    Sri Physiotherapy
  </span>
</div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/services" className={linkClass("/services")}>Services</Link>
          <Link to="/about" className={linkClass("/about")}>About</Link>
          <Link to="/gallery" className={linkClass("/gallery")}>Gallery</Link>
          <Link to="/reviews" className={linkClass("/reviews")}>Reviews</Link>
          <Link to="/faq" className={linkClass("/faq")}>FAQ</Link>
          <Link to="/contact" className={linkClass("/contact")}>Contact</Link>

          {/* 🔥 AUTH */}
          {!token ? (
            <Link to="/admin-login" className="hover:text-green-600">
              Login
            </Link>
          ) : (
            <>
              {role === "admin" && (
                <Link to="/admin" className="text-green-700 font-semibold">
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}

          {/* CTA */}
          <Link to="/appointment">
            <button className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800 transition">
              Book Appointment
            </button>
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white shadow-md p-4 flex flex-col gap-4 items-center">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/gallery" onClick={() => setOpen(false)}>Gallery</Link>
          <Link to="/reviews" onClick={() => setOpen(false)}>Reviews</Link>
          <Link to="/faq" onClick={() => setOpen(false)}>FAQ</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

          {/* 🔥 MOBILE AUTH */}
          {!token ? (
            <Link to="/admin-login" onClick={() => setOpen(false)}>
              Login
            </Link>
          ) : (
            <>
              {role === "admin" && (
                <Link to="/admin" onClick={() => setOpen(false)}>
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}

          <Link to="/appointment" onClick={() => setOpen(false)}>
            <button className="bg-green-700 text-white px-6 py-3 rounded-full">
              📅 Book Appointment
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;