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
      ? "text-medical-700 font-bold border-b-2 border-medical-600 pb-1"
      : "text-gray-600 font-medium hover:text-medical-600 transition-colors";

  return (
    <>


      <nav className="bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">

        {/* TOP BAR */}
        <div className="flex justify-between items-center px-6 md:px-12 lg:px-16 py-4 w-full">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src={logo}
              alt="logo"
              className="w-14 h-14 rounded-full object-cover shadow-sm border border-gray-100 shrink-0"
            />
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-extrabold text-medical-900 tracking-tight leading-none mb-1 whitespace-nowrap">
                Sri Physiotherapy
              </span>
              <span className="text-xs text-medical-600 uppercase font-bold tracking-widest leading-none whitespace-nowrap">
                Advanced Care Clinic
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden xl:flex gap-5 items-center">
            <Link to="/" className={linkClass("/")}>Home</Link>
            <Link to="/services" className={linkClass("/services")}>Services</Link>
            <Link to="/about" className={linkClass("/about")}>About</Link>
            <Link to="/gallery" className={linkClass("/gallery")}>Gallery</Link>
            <Link to="/reviews" className={linkClass("/reviews")}>Reviews</Link>
            <Link to="/faq" className={linkClass("/faq")}>FAQ</Link>
            <Link to="/contact" className={linkClass("/contact")}>Contact</Link>

            {/* 🔥 AUTH */}
            {!token ? (
              <Link to="/admin-login" className="text-gray-500 font-medium hover:text-medical-600 transition-colors ml-2 text-sm">
                Login
              </Link>
            ) : (
              <>
                {role === "admin" && (
                  <Link to="/admin" className="text-medical-700 font-bold ml-2">
                    Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full font-medium hover:bg-red-100 transition shadow-sm border border-red-100 ml-2 text-sm"
                >
                  Logout
                </button>
              </>
            )}

            {/* CTA */}
            <Link to="/appointment" className="ml-2">
              <button className="btn-primary shadow-lg shadow-medical-500/30">
                Book Appointment
              </button>
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="xl:hidden text-3xl text-medical-900 shrink-0 ml-4"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="xl:hidden bg-white shadow-2xl absolute w-full left-0 border-t border-gray-100 p-6 flex flex-col gap-5 items-center z-40">
            <Link to="/" onClick={() => setOpen(false)} className="text-gray-800 font-bold text-lg hover:text-medical-600 w-full text-center border-b border-gray-50 pb-2">Home</Link>
            <Link to="/services" onClick={() => setOpen(false)} className="text-gray-800 font-bold text-lg hover:text-medical-600 w-full text-center border-b border-gray-50 pb-2">Services</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="text-gray-800 font-bold text-lg hover:text-medical-600 w-full text-center border-b border-gray-50 pb-2">About</Link>
            <Link to="/gallery" onClick={() => setOpen(false)} className="text-gray-800 font-bold text-lg hover:text-medical-600 w-full text-center border-b border-gray-50 pb-2">Gallery</Link>
            <Link to="/reviews" onClick={() => setOpen(false)} className="text-gray-800 font-bold text-lg hover:text-medical-600 w-full text-center border-b border-gray-50 pb-2">Reviews</Link>
            <Link to="/faq" onClick={() => setOpen(false)} className="text-gray-800 font-bold text-lg hover:text-medical-600 w-full text-center border-b border-gray-50 pb-2">FAQ</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="text-gray-800 font-bold text-lg hover:text-medical-600 w-full text-center pb-2">Contact</Link>

            {/* 🔥 MOBILE AUTH */}
            {!token ? (
              <Link to="/admin-login" onClick={() => setOpen(false)} className="text-medical-600 font-semibold text-lg mt-2">
                Admin Login
              </Link>
            ) : (
              <>
                {role === "admin" && (
                  <Link to="/admin" onClick={() => setOpen(false)} className="text-medical-700 font-bold text-lg mt-2">
                    Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 border border-red-100 px-8 py-2 rounded-full font-bold mt-2"
                >
                  Logout
                </button>
              </>
            )}

            <Link to="/appointment" onClick={() => setOpen(false)} className="w-full mt-4">
              <button className="btn-primary w-full shadow-md text-lg py-3.5">
                📅 Book Appointment
              </button>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;