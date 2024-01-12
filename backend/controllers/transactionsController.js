import connection from "../connection.js";
const executeQuery = async (sql, values) => {
  try {
    console.log(sql);
    console.log(values);
    const [rows] = await connection.execute(sql, values);
    console.log(rows);
    return rows;
  } catch (error) {
    throw error; // Re-throw the error to be caught by the calling function
  }
};
export const createTransaction = async (req, res, next) => {
  const {
    product_id,
    quantity_change,
    transaction_type,
    client_id,
    supplier_id,
  } = req.body;
  console.log({
    product_id,
    quantity_change,
    transaction_type,
    client_id,
    supplier_id,
  });
  try {
    // Start a transaction
    await connection.beginTransaction();

    // Update the quantity_on_hand in the Products table using the trigger

    // Insert the transaction record
    const currentDate = new Date();
    const transaction_date = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const formattedClientId =
      client_id !== undefined || client_id !== "" ? client_id : null;
    const formattedSupplierId =
      supplier_id !== undefined || supplier_id !== "" ? supplier_id : null;

    const insertTransactionQuery =
      "INSERT INTO transactions (product_id, quantity_change, transaction_type,supplier_id,client_id) VALUES (?,?,?,?,?)";

    const result = await executeQuery(insertTransactionQuery, [
      product_id,
      quantity_change,
      transaction_type,
      formattedSupplierId,
      formattedClientId,
    ]);

    // Commit the transaction
    await connection.commit();

    const newTransactionId = result.insertId;
    res.status(201).json({ transaction_id: newTransactionId, ...req.body });
  } catch (error) {
    await connection.rollback();
    console.error("Error creating transaction:", error);
    let err = new Error(error.sqlMessage);
    return next(err);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    const { transaction_id } = req.params;
    const sql = "DELETE FROM Transactions WHERE transaction_id = ?";
    const result = await executeQuery(sql, [transaction_id]);
    console.log(result);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    return res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    let err = new Error(error);
    return next(err);
  }
};

connection.promise = (sql) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Yess");
      const [rows] = await connection.query(sql);
      resolve(rows);
    } catch (error) {
      reject(error);
    }
  });
};
export const getTransactionById = async (req, res) => {
  const { transaction_id } = req.params;
  try {
    const sql = `
      SELECT t.transaction_id,p.price, t.transaction_date,t.quantity_change,p.product_name,(t.quantity_change * p.price) AS total_price,c.client_name,c.email AS client_email
      FROM transactions t
      JOIN products p ON t.product_id = p.product_id
      LEFT JOIN client c ON t.client_id = c.client_id
      WHERE t.transaction_id = ?`;

    const result = await executeQuery(sql, [transaction_id]);
    console.log(result);
    if (result && result.length > 0) {
      // Process the result, e.g., return it or use it as needed
      return res.json(result[0]);
    } else {
      // Handle the case where no matching transaction is found
      return null;
    }
  } catch (error) {
    // Handle any database error
    console.error("Error fetching transaction details:", error);
    throw error; // You might want to handle or log the error accordingly
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const searchSupplierName = req.query.searchsuppliername;
    const searchProductName = req.query.searchproductname;
    let sql = `
    SELECT transactions.*, products.product_name, suppliers.supplier_name, client.client_name
    FROM transactions
    JOIN products ON transactions.product_id = products.product_id
    LEFT JOIN suppliers ON transactions.supplier_id = suppliers.supplier_id
    LEFT JOIN client ON transactions.client_id = client.client_id
`;
    if (searchSupplierName && searchProductName) {
      sql += `  WHERE suppliers.supplier_name LIKE '%${searchSupplierName}%' AND products.product_name LIKE '%${searchProductName}%`;
    } else if (searchSupplierName && !searchProductName) {
      sql += ` WHERE suppliers.supplier_name LIKE '%${searchSupplierName}%'`;
    } else {
      sql += ` WHERE products.product_name LIKE '%${searchProductName}%'`;
    }

    sql += ` ORDER BY transaction_id`;

    const result = await executeQuery(sql);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
