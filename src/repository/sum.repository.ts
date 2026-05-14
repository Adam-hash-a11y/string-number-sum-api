import { SumAPIModel } from "../model/sum.model";
import { SumNumberBody } from "../types/sumNumber.types";

export const saveSum = async (data: SumNumberBody) => {
  try {
    const doc = new SumAPIModel(data);
    return await doc.save();
  } catch (error) {
    throw new Error("Error saving sum: ", { cause: error });
  }
};
