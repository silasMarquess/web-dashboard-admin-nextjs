import { BelieverSchema } from "../zodSchemas";
import { z } from "zod";

async function Create(values: z.infer<typeof BelieverSchema>) {
  const urlApi = process.env.REMOTE_API as string;
  const object = { ...values };
  console.log(object);

  try {
    const response = await fetch(urlApi, {
      method: "post",
      body: JSON.stringify({
        ...values,
      }),
    });

    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}

export default Create;
