import axios from "axios";

export const getNumbers = async ({ id }) => {
  try {
    console.log(id);
    const { data } = await axios.get(`/home?id=${id}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
