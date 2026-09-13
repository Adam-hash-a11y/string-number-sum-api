import { app } from "./app";
import { connectDB } from "./src/config/dbConfig";
import dotenv from "dotenv";

dotenv.config();
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  throw new Error("MONGO_URI and JWT_SECRET are required");
}

connectDB().then(() =>
  app.listen(5003, () => {
    console.log("running on http://localhost:5003/");
  }),
);
