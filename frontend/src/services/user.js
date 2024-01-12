import axios from "axios";
export const signup = async ({ name, email, PASSWORD, role }) => {
  try {
    const { data } = await axios.post("http://localhost:5000/users/register", {
      name,
      email,
      PASSWORD,
      role,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const signin = async ({ email, PASSWORD }) => {
  try {
    const { data } = await axios.post("http://localhost:5000/users/login", {
      email,
      PASSWORD,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
