import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://physio-backend-swd8.onrender.com/api/home")
      .then((res) => setData(res.data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-medical-800 to-medical-900 text-white px-6 md:px-20 py-24 relative overflow-hidden shadow-soft">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* LEFT */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
              <span className="text-yellow-400 text-lg">★</span> 5-Star Rated &bull; Trusted by 1000+ Patients
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-white drop-shadow-md">
              {data.title} in <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-200 to-white drop-shadow-sm">Eluru</span>
            </h1>

            <div className="text-gray-200 mb-6 space-y-1">
              {data.subtitles?.map((item, i) => (
                <p key={i}>✔ {item}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-6 mt-8">
              <Link to="/appointment">
                <button className="bg-white text-medical-900 px-8 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  Book Appointment
                </button>
              </Link>

              <a
                href={`tel:${data.phone?.replace(/\D/g, "")}`}
                className="btn-outline border-white/30 text-white hover:bg-white hover:text-medical-900 backdrop-blur-sm px-8 py-3.5"
              >
                📞 {data.phone}
              </a>
            </div>

            <div className="flex gap-8 text-sm text-medical-100 font-medium mt-10">
              <div>💪 Pain Relief</div>
              <div>🏃 Sports Rehab</div>
              <div>⭐ 5-Star Rated</div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full md:w-[420px]">
            <img
              src={
                data.image ||
                "https://images.unsplash.com/photo-1576091160550-2173dba999ef"
              }
              alt="clinic"
              className="rounded-3xl shadow-2xl border-4 border-white/10"
              loading="lazy"
            />

            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-8 py-3 rounded-full shadow-xl border border-gray-100 whitespace-nowrap">
              <p className="font-bold text-medical-900">
                {data.doctorName || "Dr. Name"}
              </p>
              <p className="text-sm font-medium text-medical-600">
                {data.doctorRole || "Physiotherapist"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-container bg-slate-50">
        <h2 className="section-title">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {(data.services || []).map((service, index) => (

            <Link to="/services" key={index}>
              <div className="medical-card group">

                <h3 className="font-bold text-xl mb-3 text-medical-900 group-hover:text-medical-600 transition-colors">
                  {service.title || service}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description || "Expert physiotherapy care"}
                </p>

              </div>
            </Link>

          ))}
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="text-center mt-12">
          <Link to="/services">
            <button className="btn-outline">
              View All Services →
            </button>
          </Link>
        </div>
      </section>

      {/* WHY US */}
      <section className="section-container bg-white">
        <h2 className="section-title">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-center max-w-6xl mx-auto">
          {[
            "Experienced Therapist",
            "1000+ Happy Patients",
            "Modern Equipment",
            "Affordable Pricing",
          ].map((item, index) => (
            <div
              key={index}
              className="p-8 border border-gray-100 bg-white rounded-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-medical-100 transition-all duration-300"
            >
              <p className="font-semibold text-medical-900">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DOCTOR */}
      <section className="section-container bg-medical-50/50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <img
            src={data.image}
            alt="doctor"
            className="w-64 rounded-xl shadow"
            loading="lazy"
          />

          <div>
            <h2 className="text-3xl font-bold text-medical-900 mb-2">{data.doctorName}</h2>
            <p className="text-medical-600 font-medium tracking-wide uppercase text-sm">{data.doctorRole}</p>

            <p className="mt-6 text-gray-600 leading-relaxed text-lg">
              {data.doctorDescription ||
                "Experienced physiotherapist providing advanced care."}
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-container bg-white">
        <h2 className="section-title">
          What Our Patients Say
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {(data.reviews || [
            "Excellent service!",
            "Very professional",
            "Highly recommended",
          ]).map((review, i) => (
            <div key={i} className="medical-card">
              <div className="text-yellow-400 mb-4 text-lg">★★★★★</div>
              <p className="text-gray-600 italic leading-relaxed">"{review}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-medical-600 text-white py-20 px-6 text-center shadow-inner">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-sm">
          Book Your Appointment Today
        </h2>

        <Link to="/appointment">
          <button className="mt-4 bg-white text-medical-700 px-8 py-3.5 rounded-full font-bold shadow hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            Book Now
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;