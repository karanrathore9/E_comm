import express from "express";
import env from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

//routes
import userRoutes from "./routes/user";
import categoryRoutes from "./routes/category";
import productRoutes from "./routes/product";
import cartRoutes from "./routes/cart";
import wishListRoutes from "./routes/wishList";
import address from "./routes/address";

const app = express();

//environment variable
env.config();

//mongodb connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.k37rrxp.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
// mongodb+srv://karan:karan@cluster0.k37rrxp.mongodb.net/?retryWrites=true&w=majority
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", wishListRoutes);
app.use("/api",address);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
