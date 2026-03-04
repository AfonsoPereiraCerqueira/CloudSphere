import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express()

dotenv.config()

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
}
 
app.use(cors(corsOptions));

// -------------------- routes -------------------- //

import userRoutes from "./routes/users.route.js";
import supportRoutes from "./routes/support.route.js";
import planRoutes from "./routes/plan.route.js";
import subscriptionRoutes from "./routes/subscription.route.js";
import employeesRoutes from "./routes/employees.route.js";
import cartRoutes from "./routes/cart.route.js";
import descountRoutes from "./routes/descount.route.js";
import paymentRoutes from "./routes/subscription.routes.js";
import recipeRoutes from "./routes/recipes.routes.js";
import vpsRoutes from "./routes/vps.routes.js";

app.use("/api/users", userRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/plan", planRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/descount", descountRoutes);
app.use("/api/pay", paymentRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/vps", vpsRoutes);

app.get("/", (request, response) => {
  response.send("Hello World!");
});

mongoose
  .connect(
    MONGO_URI
  )
  .then(() => {
    console.log("Connected to DataBase (MDB)");
    app.listen(PORT, () => {
      console.log("Running on port: ", PORT);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: " + error);
  });