import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sumSchema = new Schema(
  {
    ch: { type: String, required: true },
    n: { type: Number, required: true },
    sanitize: { type: Boolean, required: false, default: undefined },
  },
  { timestamps: true },
);

export const SumAPIModel = mongoose.model("Sum", sumSchema);
