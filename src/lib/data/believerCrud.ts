import { BelieverSchema } from "../zodSchemas";
import { z } from "zod";
import instanceAxios from "./axios";

export const Create = async (values: z.infer<typeof BelieverSchema>) => {
  const urlApi = "/believers";
  try {
    const response = await instanceAxios.post(urlApi, {
      ...values,
    });
    if (!response.statusText) throw new Error("Error");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getBelieverById = async (id: string) => {
  const url = `/believers/${id}`;
  try {
  } catch (error) {}
};

export const findAllBelievers = async () => {
  const url = `/believers`;
  try {
    const response = await instanceAxios(url);
    if (!response.statusText) throw new Error("Error");
    return response;
  } catch (error) {
    console.log(error);
  }
};
