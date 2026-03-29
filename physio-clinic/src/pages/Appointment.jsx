import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Appointment = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/contact")
      .then(res => {
        setContact(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!contact) {
    return <div className="text-center mt-20 text-red-500">Failed to load contact info</div>;
  }

  // ✅ CLEAN PHONE NUMBER (VERY IMPORTANT)
  const phone = contact.whatsapp.replace(/\D/g, "");

  // ✅ WHATSAPP MESSAGE
  const message = encodeURIComponent(
`Hello Dr. Janiki Lakshimi,
I would like to book an appointment.

Name:
Preferred Date:
Issue:`
  );

  const whatsappLink = `https://wa.me/${phone}?text=${message}`;

  return (
    <div>
      

      <section className="bg-[#f7f5f2] px-6 md:px-20 py-20 text-center">

        {/* HEADER */}
        <h1 className="text-3xl md:text-5xl font-semibold mb-6">
          Book an Appointment
        </h1>

        <p className="text-gray-500 mb-10">
          Connect with us instantly on WhatsApp and schedule your visit.
        </p>

        {/* CARD */}
        <div className="bg-white p-8 rounded-2xl shadow max-w-md mx-auto">

          <h2 className="text-lg font-semibold mb-4">
            Quick Booking via WhatsApp
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Click below and send your details. We will confirm your appointment shortly.
          </p>

          {/* BUTTON */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="block w-full bg-green-600 text-white py-3 rounded-full text-lg hover:bg-green-700 transition"
          >
            💬 Book on WhatsApp
          </a>

          {/* NUMBER DISPLAY */}
          <p className="text-xs text-gray-400 mt-4">
            WhatsApp: {contact.whatsapp}
          </p>

        </div>

      </section>
    </div>
  );
};

export default Appointment;