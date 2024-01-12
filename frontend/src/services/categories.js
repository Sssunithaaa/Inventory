import axios from "axios";

export const createCategory = async ({ category_name }) => {
  try {
    const { data } = await axios.post("/categories", {
      category_name,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const getAllCategories = async ({ searchCategoryName }) => {
  try {
    console.log(searchCategoryName);
    const { data } = await axios.get(
      `/categories?searchcategoryname=${searchCategoryName}`
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
