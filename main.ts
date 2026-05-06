import { app } from "./src/api/api";
import { connectDB } from "./src/config/dbConfig";
import dotenv from "dotenv";
dotenv.config();

connectDB().then(() =>
  app.listen(5003, () => {
    console.log("running on http://localhost:5003/");
  }),
);