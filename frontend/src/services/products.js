import axios from "axios";

export const createProduct = async ({
  product_name,
  description,
  price,
  quantity_on_hand,
  category_id,
  supplier_id,
}) => {
  try {
    const { data } = await axios.post("/products", {
      product_name,
      description,
      price,
      quantity_on_hand,
      category_id,
      supplier_id,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getAllProducts = async ({
  searchProductName,
  searchCategorName,
}) => {
  try {
    console.log(searchCategorName);
    console.log(searchProductName);
    const { data } = await axios.get(
      `/products?searchproductname=${searchProductName}&searchcategoryame=${searchCategorName}`
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const deleteProduct = async ({ product_id }) => {
  try {
    console.log(product_id);
    const { data } = await axios.delete(
      `http://localhost:5000/products/${product_id}`
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
