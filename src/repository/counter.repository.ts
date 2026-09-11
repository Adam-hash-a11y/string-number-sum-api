import { CounterModel } from "../model/counter.model";

export const getNextCount = async (name: string): Promise<number> => {
  const counter = await CounterModel.findOneAndUpdate(
    { _id: name },
    { $inc: { count: 1 } },
    { returnDocument: "after", upsert: true },
  );
  return counter.count;
};
