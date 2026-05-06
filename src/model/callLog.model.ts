import mongoose, { Schema } from "mongoose";

const callLogSchema = new Schema(
  {
    callInstance: { type: Number, required: true },
    status: { type: String, enum: ["success", "failed"], required: true },
    data: {
      ch: { type: String, required: true },
      n: { type: Number, required: true },
      sanitize: { type: Boolean, required: false, default: undefined },
      result: { type: Number, default: null },
    },
  },
  { timestamps: true },
);

export const CallLogModel = mongoose.model("CallLog", callLogSchema);
