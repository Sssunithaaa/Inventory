import axios from "axios";

export const getAllSuppliers = async ({ searchSupplierName }) => {
  try {
    console.log(searchSupplierName);
    const { data } = await axios.get(
      `/suppliers?searchsuppliername=${searchSupplierName}`
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const createSupplier = async ({
  supplier_id,
  supplier_name,
  contact_person,
  phone,
  email,
}) => {
  try {
    const { data } = await axios.post("/suppliers", {
      supplier_id,
      supplier_name,
      contact_person,
      phone,
      email,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
