import mongoose, { Schema } from "mongoose";

const counterSchema = new Schema({
  _id: { type: String, required: true },
  count: { type: Number, default: 0 },
});

export const CounterModel = mongoose.model("Counter", counterSchema);
