import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/home")
      .then((res) => setData(res.data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  if (!data) {
    return <div className="text-center mt-20">⏳ Loading...</div>;
  }

  return (
    <div>

      {/* HERO SECTION */}
      <section className="bg-[#0f5c4c] text-white px-6 md:px-20 py-20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* LEFT */}
          <div className="max-w-xl">
            <div className="inline-block bg-white/10 px-4 py-2 rounded-full text-sm mb-6">
              ⭐ 5-Star Rated • Trusted by 1000+ Patients
            </div>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              {data.title} in <span className="text-yellow-400">Eluru</span>
            </h1>

            <div className="text-gray-200 mb-6 space-y-1">
              {data.subtitles?.map((item, i) => (
                <p key={i}>✔ {item}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <Link to="/appointment">
                <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition">
                  Book Appointment
                </button>
              </Link>

              <a
                href={`tel:${data.phone?.replace(/\D/g, "")}`}
                className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
              >
                📞 {data.phone}
              </a>
            </div>

            <div className="flex gap-6 text-sm text-gray-200">
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
              className="rounded-2xl shadow-xl"
            />

            <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-2 rounded-full shadow-md">
              <p className="font-semibold">
                {data.doctorName || "Dr. Name"}
              </p>
              <p className="text-sm text-gray-500">
                {data.doctorRole || "Physiotherapist"}
              </p>
            </div>
          </div>
        </div>
      </section>

     {/* SERVICES */}
<section className="py-16 px-6 bg-gray-50">
  <h2 className="text-3xl font-bold text-center mb-10">
    Our Services
  </h2>

  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {(data.services || []).map((service, index) => (
      
      <Link to="/services" key={index}>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
          
          <h3 className="font-semibold text-lg mb-2">
            {service.title || service}
          </h3>

          <p className="text-sm text-gray-500">
            {service.description || "Expert physiotherapy care"}
          </p>

        </div>
      </Link>

    ))}
  </div>

  {/* VIEW ALL BUTTON */}
  <div className="text-center mt-10">
    <Link to="/services">
      <button className="bg-teal-600 text-white px-6 py-2 rounded-full hover:scale-105 transition">
        View All Services →
      </button>
    </Link>
  </div>
</section>

      {/* WHY US */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-center max-w-6xl mx-auto">
          {[
            "Experienced Therapist",
            "100+ Happy Patients",
            "Modern Equipment",
            "Affordable Pricing",
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg hover:shadow transition"
            >
              <p className="font-medium">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DOCTOR */}
      <section className="py-16 bg-gray-100 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <img
            src={data.image}
            alt="doctor"
            className="w-64 rounded-xl shadow"
          />

          <div>
            <h2 className="text-2xl font-bold">{data.doctorName}</h2>
            <p className="text-gray-500">{data.doctorRole}</p>

            <p className="mt-4 text-gray-600">
              {data.doctorDescription ||
                "Experienced physiotherapist providing advanced care."}
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Patients Say
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {(data.reviews || [
            "Excellent service!",
            "Very professional",
            "Highly recommended",
          ]).map((review, i) => (
            <div key={i} className="p-6 bg-white shadow rounded-lg">
              ⭐⭐⭐⭐⭐
              <p className="mt-2 text-gray-600">{review}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-600 text-white py-12 text-center">
        <h2 className="text-2xl font-bold">
          Book Your Appointment Today
        </h2>

        <Link to="/appointment">
          <button className="mt-4 bg-white text-teal-600 px-6 py-2 rounded-full hover:scale-105 transition">
            Book Now
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;