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
      

      <section className="section-container bg-slate-50 flex flex-col items-center justify-center min-h-[80vh]">

        {/* HEADER */}
        <h1 className="section-title mb-4">
          Book an Appointment
        </h1>

        <p className="text-gray-500 mb-10 text-lg">
          Connect with us instantly on WhatsApp and schedule your visit.
        </p>

        {/* CARD */}
        <div className="medical-card p-10 max-w-lg w-full text-center">

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
            className="block w-full btn-primary text-lg py-4 flex items-center justify-center gap-3 mt-8"
          >
            <span className="text-2xl">💬</span> Book on WhatsApp
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