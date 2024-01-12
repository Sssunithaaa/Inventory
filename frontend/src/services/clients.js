import axios from "axios";

export const createClient = async ({
  client_id,
  client_name,
  email,
  phone,
  shipping_address,
}) => {
  try {
    const { data } = await axios.post("/clients", {
      client_id,
      client_name,
      email,
      phone,
      shipping_address,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getAllClients = async ({ searchClientName }) => {
  try {
    const { data } = await axios.get(
      `/clients?searchclientname=${searchClientName}`
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
