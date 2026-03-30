import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/gallery")
      .then(res => setImages(res.data));
  }, []);

  const filtered =
    filter === "all"
      ? images
      : images.filter(img => img.category === filter);

  return (
    <div>

      <section className="section-container bg-slate-50">

        {/* HEADER */}
        <div className="text-center mb-12">
          <p className="text-green-600 text-xs font-semibold mb-2">
            GALLERY
          </p>

          <h1 className="section-title mb-4">
            Inside Our Clinic
          </h1>

          <p className="text-gray-500 mt-2">
            A clean, modern, and welcoming environment.
          </p>
        </div>

        {/* FILTER */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {["all", "clinic", "treatment", "results"].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 uppercase tracking-wide text-sm ${
                filter === cat
                  ? "bg-medical-600 text-white shadow-md shadow-medical-500/30"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-medical-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map(img => (
            <div
              key={img._id}
              onClick={() => setSelectedImage(img.image)}
              className="medical-card !p-2 cursor-pointer rounded-3xl overflow-hidden group"
            >
              <img
                src={img.image}
                className="w-full h-[250px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* MODAL */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <img
              src={selectedImage}
              className="max-w-[90%] max-h-[90%] rounded-lg"
            />
          </div>
        )}

      </section>
    </div>
  );
};

export default Gallery;