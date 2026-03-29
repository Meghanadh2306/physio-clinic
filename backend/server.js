require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= ROUTES =================
const adminRoutes = require("./routes/admin");
const homeRoutes = require("./routes/home");
const faqRoutes = require("./routes/faq");
const contactRoutes = require("./routes/contact");
const serviceRoutes = require("./routes/service");
const aboutRoutes = require("./routes/about");
const galleryRoutes = require("./routes/gallery");
const certificateRoutes = require("./routes/certificate");
const authRoutes = require("./routes/auth");
const reviewRoutes = require("./routes/reviews");
const socialRoutes = require("./routes/social");

// ================= DEBUG (REMOVE LATER) =================
console.log("adminRoutes:", typeof adminRoutes);
console.log("homeRoutes:", typeof homeRoutes);
console.log("faqRoutes:", typeof faqRoutes);
console.log("contactRoutes:", typeof contactRoutes);
console.log("serviceRoutes:", typeof serviceRoutes);
console.log("aboutRoutes:", typeof aboutRoutes);
console.log("galleryRoutes:", typeof galleryRoutes);
console.log("certificateRoutes:", typeof certificateRoutes);
console.log("authRoutes:", typeof authRoutes);
console.log("reviewRoutes:", typeof reviewRoutes);
console.log("socialRoutes:", typeof socialRoutes);

// ================= USE ROUTES =================
app.use("/api/admin", adminRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/services", serviceRoutes); // ✅ fixed
app.use("/api/about", aboutRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/certificates", certificateRoutes); // ✅ fixed plural
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/social", socialRoutes);

// ================= DATABASE =================
mongoose.connect("mongodb+srv://bulasarameghanadh_db_user:TReIYTxSqxCqrRWt@cluster0.zicicla.mongodb.net/doctor_app?retryWrites=true&w=majority")
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.log("❌ DB Error:", err));
// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("🚀 Backend running successfully");
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});