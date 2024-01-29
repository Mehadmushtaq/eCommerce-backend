const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
// const adminRoutes = require("./routes/adminRoutes");

// const db = require("./models/index");
const authMiddleware = require("./controllers/authToken");

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/Images/Profile", express.static("Images/Profile"));
app.use("/Images/Product", express.static("Images/Product"));
//open apis

app.use("/api/auth", authRoutes);
app.use("/api/admin", userRoutes); //same login as admin also user just different route
app.use("/api/admin", productRoutes);

app.use("/api/product", productRoutes);
//restricted apis
app.use(authMiddleware);
app.use("/api/user", userRoutes);
app.use("/api/user", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server listening on", process.env.PORT);
});
