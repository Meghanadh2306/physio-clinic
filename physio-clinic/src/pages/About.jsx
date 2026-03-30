import { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
  const [data, setData] = useState(null);
  const [certificates, setCertificates] = useState([]);

useEffect(() => {
  // About data
  axios
    .get("http://localhost:5000/api/about")
    .then((res) => setData(res.data))
    .catch(() => setData({}));

  // Certificates
  axios
    .get("http://localhost:5000/api/certificates")
    .then((res) => setCertificates(res.data))
    .catch(() => console.log("Certificate fetch error"));
}, []);

  if (!data) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div>

      {/* ================= SECTION 1 (DYNAMIC) ================= */}
      <section className="section-container bg-slate-50">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE */}
          <div className="relative">
            <img
              src={data.image || "https://via.placeholder.com/500"}
              alt="doctor"
              className="rounded-2xl shadow-lg"
            />

            {data.experience && (
              <div className="absolute -bottom-6 -right-6 bg-medical-600 text-white px-6 py-4 rounded-2xl text-sm font-bold shadow-soft border-4 border-slate-50 text-center tracking-wide">
                {data.experience}
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div>
            <p className="text-green-600 text-xs font-semibold tracking-widest mb-2">
              ABOUT US
            </p>

            <h1 className="section-title text-left mb-6 leading-tight">
              {data.title || "Dr. Janiki Lakshmi"}
            </h1>

            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              {data.description || "Experienced physiotherapist dedicated to patient recovery."}
            </p>

            {/* QUOTE */}
            {data.quote && (
              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded mb-6 text-sm text-gray-600 italic">
                “{data.quote}”
              </div>
            )}

            {/* POINTS */}
            <div className="space-y-3 text-sm text-gray-600 mb-6">
              {data.points && data.points.length > 0 ? (
                data.points.map((p, i) => (
                  <p key={i} className="flex items-center gap-2">
                    <span className="text-green-600">✔</span> {p}
                  </p>
                ))
              ) : (
                <p>No details available</p>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4">
              <button className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition">
                Book Appointment
              </button>

              <a
                href="tel:9493800475"
                className="border border-green-700 text-green-700 px-6 py-3 rounded-full hover:bg-green-50 transition"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 2 ===================== */}
      <section className="section-container bg-white">
        <div className="text-center">
          <p className="text-green-600 text-xs font-semibold tracking-widest mb-2">
            YOUR VISIT
          </p>

          <h2 className="section-title mb-4">
            What to Expect at Your First Visit
          </h2>

          <p className="text-gray-500 mb-12 text-lg max-w-2xl mx-auto">
            Here’s how we guide you through your recovery journey step by step.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8 text-left">
          {[
            "Initial Consultation & Assessment",
            "Detailed Physical Examination",
            "Personalized Treatment Plan",
            "Therapy & Guided Exercises",
            "Follow-Up & Progress Tracking",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="bg-green-700 text-white w-8 h-8 flex items-center justify-center rounded-full">
                {i + 1}
              </div>
              <p className="text-gray-600">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== SECTION 3 ===================== */}
      <section className="section-container bg-medical-50/50">
        <div className="text-center">
          <p className="text-green-600 text-xs font-semibold tracking-widest mb-2">
            OUR STANDARDS
          </p>

          <h2 className="section-title">
            Modern Care, Maximum Comfort
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mt-8">
          {[
            {
              title: "Advanced Equipment",
              desc: "Modern physiotherapy tools for accurate treatment",
            },
            {
              title: "Expert Diagnosis",
              desc: "Thorough evaluation for effective recovery plans",
            },
            {
              title: "Pain Relief Therapy",
              desc: "Techniques designed for minimal discomfort",
            },
            {
              title: "Patient-Friendly Care",
              desc: "Comfortable and supportive environment",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="text-2xl mb-3">💚</div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
          {/* ================= CERTIFICATES ================= */}
      <section className="section-container bg-white">
        <div className="text-center">
          <p className="text-green-600 text-xs font-semibold tracking-widest mb-2">
            CERTIFICATIONS
          </p>

          <h2 className="section-title">
            Certifications & Achievements
          </h2>
        </div>

        {certificates.length === 0 ? (
          <p className="text-gray-500">No certificates available</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert._id}
                className="bg-[#f7f5f2] p-4 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => window.open(cert.image, "_blank")}
              >
                <img
                  src={cert.image || "https://via.placeholder.com/300"}
                  alt={cert.title || "certificate"}
                  className="w-full h-[200px] object-cover rounded-lg mb-3 hover:scale-105 transition duration-300"
                />

                <p className="font-medium text-gray-800">
                  {cert.title || "Certificate"}
                </p>
              </div>
            ))}
          </div>
        )}
</section>
    </div>
  );
};

export default About;