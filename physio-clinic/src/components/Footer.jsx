import {
  FaWhatsapp,
  FaInstagram,
  FaGoogle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0f3d3e] to-[#0b2e2f] text-white px-8 pt-12 pb-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

        {/* LEFT - Clinic Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Sri Physiotherapy Clinic</h2>
          <p className="text-gray-300 text-sm leading-6">
            Advanced physiotherapy care for pain relief, recovery, and mobility.
            Expert therapists, personalized treatments, and modern techniques —
            trusted by 100+ patients.
          </p>

          <div className="flex gap-4 mt-6">
  
  {/* Instagram */}
  <a
    href="https://www.instagram.com/sriphysioeluru?igsh=azhpZ2dtc2podjJ4"
    target="_blank"
    rel="noreferrer"
    className="bg-white/10 p-2 rounded-full hover:bg-pink-500 transition"
  >
    <FaInstagram />
  </a>

  {/* Google Reviews */}
  <a
    href="https://share.google/D2d74ha7CjrMlLFfL"
    target="_blank"
    rel="noreferrer"
    className="bg-white/10 p-2 rounded-full hover:bg-yellow-400 transition"
  >
    <FaGoogle />
  </a>

  {/* WhatsApp */}
  <a
    href="https://wa.me/919493800475?text=Hi%20I%20want%20to%20book%20an%20appointment"
    target="_blank"
    rel="noreferrer"
    className="bg-white/10 p-2 rounded-full hover:bg-green-500 transition"
  >
    <FaWhatsapp />
  </a>

</div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-4">QUICK LINKS</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/gallery" className="hover:text-white">Gallery</Link></li>
            <li><Link to="/reviews" className="hover:text-white">Reviews</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="font-semibold mb-4">SERVICES</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Pain Management Therapy</li>
            <li>Exercise Therapy</li>
            <li>Manual Therapy</li>
            <li>Electrotherapy</li>
            <li>Neurological Physiotherapy</li>
            <li>Orthopedic Physiotherapy</li>
            <li>Cardio & Respiratory Physiotherapy</li>
            <li>Sports Physiotherapy</li>
            <li>Home Physiotherapy Services</li>
            <li>Rehabilitation Programs</li>
            <li>Posture Correction & Ergonomic Training</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4">CONTACT</h3>

          {/* Address */}
          <p className="flex items-start gap-2 text-gray-300 text-sm">
            <FaMapMarkerAlt className="mt-1" />
            Eluru, Andhra Pradesh
          </p>

          {/* Phone 1 */}
          <p className="flex items-center gap-2 text-gray-300 text-sm mt-3">
            <FaPhoneAlt />
            <a href="tel:9493800475" className="hover:text-white">
              9493800475
            </a>
          </p>

          {/* Phone 2 */}
          <p className="flex items-center gap-2 text-gray-300 text-sm mt-2">
            <FaPhoneAlt />
            <a href="tel:9059804257" className="hover:text-white">
              9059804257
            </a>
          </p>

          {/* WhatsApp */}
          <p className="text-gray-300 text-sm mt-3">
            💬{" "}
            <a
              href="https://wa.me/919493800475?text=Hi%20I%20want%20to%20book%20an%20appointment"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-400"
            >
              WhatsApp Us
            </a>
          </p>

          {/* Timings */}
          <p className="flex items-center gap-2 text-gray-300 text-sm mt-3">
            <FaClock />
            Mon–Sat 9 AM – 9 PM
          </p>

          {/* Appointment Button */}
          <Link to="/appointment">
            <button className="mt-5 bg-teal-500 hover:bg-teal-600 px-5 py-2 rounded-full text-sm font-medium">
              Book Appointment
            </button>
          </Link>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 mt-10 pt-5 text-center text-gray-400 text-sm">
        © 2026 PhysioCare Clinic. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;