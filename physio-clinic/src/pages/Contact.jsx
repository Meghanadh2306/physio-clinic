import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Contact = () => {
  const [data, setData] = useState(null);

  const [callback, setCallback] = useState({
    name: "",
    phone: "",
    message: ""
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/contact")
      .then(res => setData(res.data))
      .catch(() => setData({}));
  }, []);

  if (data === null) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div>

      <section className="bg-[#f7f5f2] px-6 md:px-20 py-20">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-green-600 text-xs tracking-widest font-semibold mb-2">
            CONTACT
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900">
            Visit Us or Get in Touch
          </h1>

          <p className="text-gray-500 mt-3 text-sm">
            We are here to help. Reach out to book an appointment or ask any questions.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-10 items-stretch">

          {/* LEFT CARD */}
          <div className="bg-white rounded-3xl shadow-md p-8 flex flex-col">

            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Contact Information
            </h2>

            <div className="space-y-6 text-sm flex-grow">

              {/* ADDRESS */}
              <div className="flex gap-4 border-b pb-4">
                <div className="bg-green-100 text-green-700 p-3 rounded-full">📍</div>
                <div>
                  <p className="text-xs font-semibold text-green-600 uppercase">Address</p>
                  <p className="text-gray-600 whitespace-pre-line">
                    {data?.address}
                  </p>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex gap-4 border-b pb-4">
                <div className="bg-green-100 text-green-700 p-3 rounded-full">📞</div>
                <div>
                  <p className="text-xs font-semibold text-green-600 uppercase">Phone</p>
                  <p className="text-gray-600">{data?.phone}</p>
                </div>
              </div>

              {/* WHATSAPP */}
              <div className="flex gap-4 border-b pb-4">
                <div className="bg-green-100 text-green-700 p-3 rounded-full">💬</div>
                <div>
                  <p className="text-xs font-semibold text-green-600 uppercase">WhatsApp</p>
                  <p className="text-gray-600">{data?.whatsapp}</p>
                </div>
              </div>

              {/* INSTAGRAM (NEW OPTIONAL FIELD) */}
              {data?.instagram && (
                <div className="flex gap-4 border-b pb-4">
                  <div className="bg-green-100 text-green-700 p-3 rounded-full">📸</div>
                  <div>
                    <p className="text-xs font-semibold text-green-600 uppercase">Instagram</p>
                    <p className="text-gray-600">{data.instagram}</p>
                  </div>
                </div>
              )}

              {/* HOURS */}
              <div className="flex gap-4">
                <div className="bg-green-100 text-green-700 p-3 rounded-full">⏰</div>
                <div>
                  <p className="text-xs font-semibold text-green-600 uppercase">Hours</p>
                  <p className="text-gray-600 whitespace-pre-line">
                    {data?.hours}
                  </p>
                </div>
              </div>
            </div>

            {/* WHATSAPP BUTTON */}
            <a
            href={`https://wa.me/${data?.whatsapp?.replace(/\D/g, "")}?text=${encodeURIComponent(
            `Hello Dr. Janiki Lakshimi,
            I would like to book an appointment.

            Name:
            Preferred Date:
            Issue:`)}`}
            target="_blank"
            rel="noreferrer"
            >
            <button className="w-full mt-6 bg-green-700 text-white py-3 rounded-full font-medium hover:bg-green-800 transition">
                💬 Book on WhatsApp
            </button>
            </a>

            {/* CALLBACK FORM */}
            <div className="mt-6 bg-gray-50 rounded-xl p-5 border">

              <p className="text-xs text-gray-500 text-center mb-4">
                Or leave your details — we will contact you on WhatsApp
              </p>

              <input
                placeholder="Your Name"
                value={callback.name}
                onChange={e => setCallback({ ...callback, name: e.target.value })}
                className="w-full mb-3 p-3 border rounded-lg text-sm"
                />

                <input
                placeholder="Phone Number"
                value={callback.phone}
                onChange={e => setCallback({ ...callback, phone: e.target.value })}
                className="w-full mb-3 p-3 border rounded-lg text-sm"
                />

                <textarea
                placeholder="Brief message (optional)"
                value={callback.message}
                onChange={e => setCallback({ ...callback, message: e.target.value })}
                className="w-full mb-3 p-3 border rounded-lg text-sm"
                />

                <button
                onClick={() => {
                    if (!callback.name || !callback.phone) {
                    alert("Please fill Name and Phone");
                    return;
                    }
                    if (!/^\d{10}$/.test(callback.phone)) {
  alert("Enter valid 10-digit phone number");
  return;
}

                    const phone = data?.whatsapp?.replace(/\D/g, "");
                    
const message = encodeURIComponent(
`Hello Dr. Janiki Lakshimi,
I would like a callback.

Name: ${callback.name}
Phone: ${callback.phone}
Message: ${callback.message || "N/A"}`
);

                    const link = `https://wa.me/${phone}?text=${message}`;

                    window.open(link, "_blank");
                    setCallback({ name: "", phone: "", message: "" });
                }}
                className="w-full bg-green-700 text-white py-3 rounded-full hover:bg-green-800 transition"
                >
                📩 Arrange a Callback
                </button>

              <p className="text-[11px] text-gray-400 text-center mt-2">
                Your details will be sent via WhatsApp
              </p>
            </div>
          </div>

          {/* RIGHT MAP */}
          <div className="rounded-3xl overflow-hidden shadow-md border h-full min-h-[500px]">
            <iframe
              title="map"
              src={data?.map}
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;