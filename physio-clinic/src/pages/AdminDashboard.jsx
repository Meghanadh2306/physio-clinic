import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
const [home, setHome] = useState({
  title: "",
  subtitles: [],
  phone: "",
  image: null
});

  const [faq, setFaq] = useState({
    question: "",
    answer: ""
  });

  const [faqs, setFaqs] = useState([]);

  const [contact, setContact] = useState({
    address: "",
    phone: "",
    whatsapp: "",
    hours: "",
    instagram: "",
    map: ""
  });

  // 🔥 LOAD ALL DATA
  useEffect(() => {
  fetchHome();
  fetchFaqs();
  fetchContact();
  fetchServices();
  fetchAbout();
  fetchGallery();
  fetchCertificates();
}, []);

  const fetchHome = async () => {
  try {
    const res = await axios.get("https://physio-backend-swd8.onrender.com/api/home");
    if (res.data) setHome(res.data);
  } catch {
    console.log("Home fetch failed");
  }
};

  const fetchFaqs = async () => {
    const res = await axios.get("https://physio-backend-swd8.onrender.com/api/faq");
    setFaqs(res.data);
  };

  const fetchContact = async () => {
    const res = await axios.get("https://physio-backend-swd8.onrender.com/api/contact");
    if (res.data) setContact(res.data);
  };

  // ================= HOME =================
  const handleHomeChange = (e) => {
    setHome({ ...home, [e.target.name]: e.target.value });
  };

const saveHome = async () => {
  try {
    const formData = new FormData();

    formData.append("title", home.title);
    formData.append("phone", home.phone);
    formData.append("subtitles", JSON.stringify(home.subtitles || [])); 
    formData.append("doctorName", home.doctorName || "");
    formData.append("doctorRole", home.doctorRole || "");


    if (home.image && typeof home.image !== "string") {
      formData.append("image", home.image);
    }

    await axios.post("https://physio-backend-swd8.onrender.com/api/home", formData);

    alert("Home Updated ✅");
    fetchHome();

  } catch (err) {
    console.log(err);
    alert("Error updating home ❌");
  }
};
  // ================= FAQ =================
  const addFaq = async () => {
    if (!faq.question || !faq.answer) {
      alert("Fill all fields");
      return;
    }

    await axios.post("https://physio-backend-swd8.onrender.com/api/faq", faq);
    setFaq({ question: "", answer: "" });
    fetchFaqs();
  };

  const deleteFaq = async (id) => {
    await axios.delete(`https://physio-backend-swd8.onrender.com/api/faq/${id}`);
    fetchFaqs();
  };

  // ================= CONTACT =================
  const saveContact = async () => {
    await axios.post("https://physio-backend-swd8.onrender.com/api/contact", contact);
    alert("Contact Updated ✅");
  };

  //=================services=================
  const [service, setService] = useState({
  title: "",
  description: "",
  tag: "",
  icon: ""
});

const [services, setServices] = useState([]);

  // ================= ABOUT =================
const [about, setAbout] = useState({
  title: "",
  description: "",
  quote: "",
  points: [],
  image: "",
  experience: ""
});

const fetchAbout = async () => {
  const res = await axios.get("https://physio-backend-swd8.onrender.com/api/about");
  if (res.data) setAbout(res.data);
};

// ================= SERVICES FETCH =================
const fetchServices = async () => {
  const res = await axios.get("https://physio-backend-swd8.onrender.com/api/services");
  setServices(res.data);
};

// ================= GALLERY =================
const [gallery, setGallery] = useState({
  image: null,
  category: ""
});

const [galleryList, setGalleryList] = useState([]);

const fetchGallery = async () => {
  const res = await axios.get("https://physio-backend-swd8.onrender.com/api/gallery");
  setGalleryList(res.data);
};

//===========certificate=================
const [certificate, setCertificate] = useState({
  image: null,
  title: ""
});

const [certificates, setCertificates] = useState([]);

// ================= CERTIFICATES =================
const fetchCertificates = async () => {
  const res = await axios.get("https://physio-backend-swd8.onrender.com/api/certificates");
  setCertificates(res.data);
};

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">

      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Admin Dashboard
      </h1>

      {/* ================= HOME ================= */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">Edit Home Page</h2>

        <input
          name="title"
          value={home.title}
          onChange={handleHomeChange}
          placeholder="Title"
          className="w-full mb-3 p-3 border rounded-lg"
        />

        <textarea
  placeholder="Subtitles (comma separated)"
  value={home.subtitles?.join(", ") || ""}
  onChange={(e) =>
    setHome({
      ...home,
      subtitles: e.target.value.split(",").map(s => s.trim())
    })
  }
  className="w-full mb-3 p-3 border rounded-lg"
/>

        <input
          name="phone"
          value={home.phone}
          onChange={handleHomeChange}
          placeholder="Phone"
          className="w-full mb-3 p-3 border rounded-lg"
        />

<input
  placeholder="Doctor Name"
  value={home.doctorName || ""}
  onChange={e => setHome({ ...home, doctorName: e.target.value })}
  className="w-full mb-3 p-3 border rounded-lg"
/>

<input
  placeholder="Doctor Role"
  value={home.doctorRole || ""}
  onChange={e => setHome({ ...home, doctorRole: e.target.value })}
  className="w-full mb-3 p-3 border rounded-lg"
/>

<input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setHome({ ...home, image: e.target.files[0] })
  }
  className="w-full mb-3"
/>

{/* PREVIEW */}
{home.image && typeof home.image !== "string" && (
  <img
    src={URL.createObjectURL(home.image)}
    className="w-32 h-32 object-cover mb-3 rounded"
    loading="lazy"
  />
)}

        <button
          onClick={saveHome}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Save Home
        </button>
      </div>

      {/* ================= FAQ ================= */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">Add FAQ</h2>

        <input
          placeholder="Question"
          value={faq.question}
          onChange={(e) => setFaq({ ...faq, question: e.target.value })}
          className="w-full mb-3 p-3 border rounded-lg"
        />

        <textarea
          placeholder="Answer"
          value={faq.answer}
          onChange={(e) => setFaq({ ...faq, answer: e.target.value })}
          className="w-full mb-3 p-3 border rounded-lg"
        />

        <button
          onClick={addFaq}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Add FAQ
        </button>
      </div>

      {/* FAQ LIST */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">All FAQs</h2>

        {faqs.map((item) => (
          <div key={item._id} className="border p-4 rounded-lg mb-3 flex justify-between">
            <div>
              <p className="font-medium">{item.question}</p>
              <p className="text-gray-600 text-sm">{item.answer}</p>
            </div>

            <button
              onClick={() => deleteFaq(item._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ================= CONTACT ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Contact Settings</h2>

        <input
          placeholder="Address"
          value={contact.address}
          onChange={(e) => setContact({ ...contact, address: e.target.value })}
          className="w-full mb-3 p-3 border rounded-lg"
        />

        <input
          placeholder="Phone"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          className="w-full mb-3 p-3 border rounded-lg"
        />

        <input
          placeholder="WhatsApp"
          value={contact.whatsapp}
          onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
          className="w-full mb-3 p-3 border rounded-lg"
        />

        <input
          placeholder="Hours"
          value={contact.hours}
          onChange={(e) => setContact({ ...contact, hours: e.target.value })}
          className="w-full mb-3 p-3 border rounded-lg"
        />

        <input
        placeholder="Instagram"
          value={contact.instagram}
          onChange={(e) => setContact({ ...contact, instagram: e.target.value })}
          className="w-full mb-3 p-3 border rounded-lg"
        />

        <input
          placeholder="Map URL"
          value={contact.map}
          onChange={(e) => setContact({ ...contact, map: e.target.value })}
          className="w-full mb-3 p-3 border rounded-lg"
        />

        <button
          onClick={saveContact}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Save Contact
        </button>
      </div>

      {/* ================= ABOUT ================= */}
      <h2 className="text-xl font-bold mt-10 mb-4">Edit About Section</h2>

      <input
        placeholder="Title"
        value={about.title}
        onChange={e => setAbout({ ...about, title: e.target.value })}
        className="w-full mb-3 p-3 border rounded-lg"
      />

      <textarea
        placeholder="Description"
        value={about.description}
        onChange={e => setAbout({ ...about, description: e.target.value })}
        className="w-full mb-3 p-3 border rounded-lg"
      />

      <input
        placeholder="Quote"
        value={about.quote}
        onChange={e => setAbout({ ...about, quote: e.target.value })}
        className="w-full mb-3 p-3 border rounded-lg"
      />

      {/* IMAGE UPLOAD */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setAbout({ ...about, image: e.target.files[0] })
        }
        className="w-full mb-3"
      />

      {/* PREVIEW */}
      {about.image && typeof about.image !== "string" && (
        <img
          src={URL.createObjectURL(about.image)}
          className="w-32 h-32 object-cover mb-3 rounded"
          loading="lazy"
        />
      )}

      <input
        placeholder="Experience"
        value={about.experience}
        onChange={e => setAbout({ ...about, experience: e.target.value })}
        className="w-full mb-3 p-3 border rounded-lg"
      />

      <textarea
        placeholder="Points (comma separated)"
        value={about.points?.join(", ") || ""}
        onChange={e =>
          setAbout({
            ...about,
            points: e.target.value.split(",").map(p => p.trim())
          })
        }
        className="w-full mb-4 p-3 border rounded-lg"
      />

<button
onClick={async () => {
  try {
    const formData = new FormData();

    formData.append("title", about.title);
    formData.append("description", about.description);
    formData.append("quote", about.quote);
    formData.append("experience", about.experience);

    // ✅ FIXED points
    formData.append("points", JSON.stringify(about.points));

    // ✅ FIXED image
    if (about.image instanceof File) {
      formData.append("image", about.image);
    }

    await axios.post("https://physio-backend-swd8.onrender.com/api/about", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("About Updated ✅");
    fetchAbout();

  } catch (err) {
    console.log("ABOUT ERROR:", err.response?.data || err);
    alert(err.response?.data?.error || "Error updating About ❌");
  }
}}
  className="bg-green-600 text-white px-6 py-2 rounded-lg"
>
  Save About
</button>

      {/*=======certificate=================*/}
      {/* ================= CERTIFICATES ================= */}
<div className="bg-white p-6 rounded-xl shadow mt-10">

  <h2 className="text-xl font-bold mb-4">Upload Certificates</h2>

  {/* FILE */}
  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setCertificate({ ...certificate, image: e.target.files[0] })
    }
    className="w-full mb-3"
  />

  {/* PREVIEW */}
  {certificate.image && (
    <img
      src={URL.createObjectURL(certificate.image)}
      className="w-32 h-32 object-cover mb-3 rounded"
      loading="lazy"
    />
  )}

  {/* TITLE */}
  <input
    placeholder="Certificate Title"
    value={certificate.title}
    onChange={e =>
      setCertificate({ ...certificate, title: e.target.value })
    }
    className="w-full mb-3 p-3 border rounded-lg"
  />

  {/* BUTTON */}
  <button
    onClick={async () => {
      if (!certificate.image || !certificate.title) {
        alert("Fill all fields");
        return;
      }

      const formData = new FormData();
      formData.append("image", certificate.image);
      formData.append("title", certificate.title);

      await axios.post("https://physio-backend-swd8.onrender.com/api/certificates", formData);

      alert("Uploaded ✅");
      setCertificate({ image: null, title: "" });
      fetchCertificates();
    }}
    className="bg-blue-600 text-white px-6 py-2 rounded-lg"
  >
    Upload Certificate
  </button>

  {/* LIST */}
  <h2 className="text-xl font-bold mt-8 mb-4">All Certificates</h2>

  <div className="grid md:grid-cols-3 gap-4">
    {certificates.map(cert => (
      <div key={cert._id} className="border rounded-lg p-2 shadow">

        <img
          src={cert.image}
          className="w-full h-[150px] object-cover rounded mb-2"
          loading="lazy"
        />

        <p className="text-sm text-center mb-2">{cert.title}</p>

        <button
          onClick={async () => {
            await axios.delete(`https://physio-backend-swd8.onrender.com/api/certificates/${cert._id}`);
            fetchCertificates();
          }}
          className="text-red-500 text-sm"
        >
          Delete
        </button>

      </div>
    ))}
  </div>

</div>

        {/* ================= SERVICES ================= */}
        <h2 className="text-xl font-bold mt-10 mb-4">Add Service</h2>

        <input
          placeholder="Title"
          value={service.title}
          onChange={e => setService({ ...service, title: e.target.value })}
          className="w-full mb-3 p-3 border rounded-lg"
        />

        <input
          placeholder="Description"
          value={service.description}
          onChange={e => setService({ ...service, description: e.target.value })}
          className="w-full mb-3 p-3 border rounded-lg"
        />

        <input
          placeholder="Tag (optional)"
          value={service.tag}
          onChange={e => setService({ ...service, tag: e.target.value })}
          className="w-full mb-3 p-3 border rounded-lg"
        />

        <input
          placeholder="Icon (e.g. 💪)"
          value={service.icon}
          onChange={e => setService({ ...service, icon: e.target.value })}
          className="w-full mb-3 p-3 border rounded-lg"
        />

        {/* ADD BUTTON */}
        <button
          onClick={() => {
            if (!service.title || !service.description) {
              alert("Title & Description required");
              return;
            }

            axios.post("https://physio-backend-swd8.onrender.com/api/services", service)
              .then(() => {
                alert("Service Added ✅");
                setService({ title: "", description: "", tag: "", icon: "" });
                fetchServices();
              })
              .catch((err) => {
  console.log("FULL ERROR:", err);
  console.log("SERVER ERROR:", err.response?.data);
  alert(err.response?.data?.message || "Error adding service ❌");
});
          }}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          Add Service
        </button>

        {/* ================= GALLERY ================= */}
        <div className="bg-white p-6 rounded-xl shadow mt-10">

          <h2 className="text-xl font-bold mb-4">Add Gallery Image</h2>

          {/* FILE INPUT */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setGallery({ ...gallery, image: e.target.files[0] })
            }
            className="w-full mb-3"
          />

          {/* IMAGE PREVIEW */}
          {gallery.image && (
            <img
              src={URL.createObjectURL(gallery.image)}
              alt="preview"
              className="w-32 h-32 object-cover rounded mb-3 border"
              loading="lazy"
            />
          )}

          {/* CATEGORY */}
          <select
            value={gallery.category}
            onChange={(e) =>
              setGallery({ ...gallery, category: e.target.value })
            }
            className="w-full mb-3 p-3 border rounded-lg"
          >
            <option value="">Select Category</option>
            <option value="clinic">Clinic</option>
            <option value="treatment">Treatment</option>
            <option value="results">Results</option>
          </select>

          {/* UPLOAD BUTTON */}
          <button
            onClick={() => {
              // ✅ VALIDATION
              if (!gallery.image) {
                alert("Please select an image");
                return;
              }

              if (!gallery.category) {
                alert("Please select a category");
                return;
              }

              const formData = new FormData();
              formData.append("image", gallery.image);
              formData.append("category", gallery.category);

              axios.post("https://physio-backend-swd8.onrender.com/api/gallery", formData)
                .then(() => {
                  alert("Image Uploaded ✅");
                  setGallery({ image: null, category: "" });
                  fetchGallery();
                })
                .catch(() => alert("Upload Failed ❌"));
            }}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Upload Image
          </button>

          {/* ================= GALLERY LIST ================= */}
          <h2 className="text-xl font-bold mt-10 mb-4">All Images</h2>

          {galleryList.length === 0 && (
            <p className="text-gray-500">No images uploaded</p>
          )}

          <div className="grid md:grid-cols-3 gap-4">
            {galleryList.map((img) => (
              <div
                key={img._id}
                className="border rounded-lg p-2 shadow"
              >
                <img
                  src={img.image}
                  alt="gallery"
                  className="w-full h-[150px] object-cover rounded mb-2"
                  loading="lazy"
                />

                <div className="flex justify-between items-center">
                  <span className="text-sm capitalize">
                    {img.category}
                  </span>

                  <button
                    onClick={() => {
                      axios.delete(`https://physio-backend-swd8.onrender.com/api/gallery/${img._id}`)
                        .then(() => {
                          alert("Deleted ✅");
                          fetchGallery();
                        });
                    }}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
        {/* ================= SERVICE LIST ================= */}
        <h2 className="text-xl font-bold mt-10 mb-4">All Services</h2>

        {services.length === 0 && <p>No services found</p>}

        {services.map(s => (
          <div
            key={s._id}
            className="border p-4 rounded-lg mb-3 flex justify-between items-center"
          >
            <div>
              <p className="font-medium flex items-center gap-2">
                {s.icon} {s.title}

                {s.tag && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                    {s.tag}
                  </span>
                )}
              </p>

              <p className="text-gray-600 text-sm">
                {s.description}
              </p>
            </div>

            {/* DELETE BUTTON */}
            <button
              onClick={() => {
                axios.delete(`https://physio-backend-swd8.onrender.com/api/services/${s._id}`)
                  .then(() => fetchServices());
              }}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default AdminDashboard;