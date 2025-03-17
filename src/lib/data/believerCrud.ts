import { BelieverSchema } from "./zodSchemas";
import { z } from "zod";
import instanceAxios from "./axios";

export const Create = async (values: z.infer<typeof BelieverSchema>) => {
  const urlApi = "/believers";
  const response = await instanceAxios.post(urlApi, values);
  if (!response.statusText) throw new Error("Error");
  return response;
};

export const getBelieverById = async (id: string) => {
  const url = `/believers/${id}`;
  const response = await instanceAxios(url);
  if (!response.statusText) throw new Error();
  return response;
};

export const updatedAtBeliever = async (
  id: string,
  believerData: z.infer<typeof BelieverSchema>
) => {
  const url = `/believers/${id}`;
  const response = await instanceAxios.put(url, {
    ...believerData,
  });
  if (!response.statusText) throw new Error();
  return response;
};

export const deleteBeliever = async (id: string) => {
  const url = `/believers/${id}`;
  const response = await instanceAxios.delete(url);
  if (!response.statusText) throw new Error();
  return response;
};

export const findAllBelievers = async () => {
  const url = `/believers`;
  const response = await instanceAxios(url);
  if (!response.statusText) throw new Error("Error");
  return response;
};
