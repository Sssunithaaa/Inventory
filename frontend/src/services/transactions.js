import axios from "axios";
export const getAllTransactions = async ({
  searchSupplierName,
  searchProductName,
}) => {
  try {
    const { data } = await axios.get(
      `/transactions?searchsuppliername=${searchSupplierName}&searchproductname=${searchProductName}`
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createTransaction = async ({
  product_id,
  transaction_type,
  quantity_change,
  supplier_id,
  client_id,
}) => {
  try {
    const { data } = await axios.post("/transactions", {
      product_id,
      transaction_type,
      quantity_change,
      supplier_id,
      client_id,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deleteTransaction = async ({ transaction_id }) => {
  try {
    console.log(transaction_id);
    const id = transaction_id;
    const { data } = await axios.delete(
      `http://localhost:5000/transactions/${transaction_id}`
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getTransactionById = async ({ transaction_id }) => {
  try {
    console.log(transaction_id);
    const { data } = await axios.get(
      `http://localhost:5000/transactions/${transaction_id}`
    );
    console.log(data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
