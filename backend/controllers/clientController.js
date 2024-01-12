import connection from "../connection.js";

const executeQuery = async (sql, values) => {
  try {
    const [rows] = await connection.execute(sql, values);
    return rows;
  } catch (error) {
    throw error; // Re-throw the error to be caught by the calling function
  }
};

export const createClient = async (req, res, next) => {
  try {
    const { client_id, client_name, email, phone, shipping_address } = req.body;
    const insertClientQuery =
      "INSERT INTO client (client_id, client_name, email, phone, shipping_address) VALUES (?, ?, ?, ?, ?)";
    const values = [client_id, client_name, email, phone, shipping_address];

    const result = await executeQuery(insertClientQuery, values);
    res.status(201).json({ ...req.body });
  } catch (error) {
    let err = new Error(error);
    return next(err);
  }
};

connection.promise = (sql) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows] = await connection.query(sql);
      resolve(rows);
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllClient = async (req, res, next) => {
  const searchClientName = req.query.searchclientname;
  try {
    let sql = `
      SELECT
        c.*,
        COUNT(t.transaction_id) AS num_transactions
      FROM
        client c
      LEFT JOIN
        transactions t ON c.client_id = t.client_id `;

    if (searchClientName) {
      sql += `WHERE c.client_name LIKE '%${searchClientName}%'`;
    }
    sql += ` GROUP BY c.client_id, c.client_name`;

    const result = await connection.promise(sql);
    console.log(result);
    return res.json(result);
  } catch (error) {
    let err = new Error(error);
    return next(err);
  }
};

export const getClientsInfo = async (req, res, next) => {
  const searchClientName = req.query.searchclientname;
  try {
    // Update the total_spent field in clients table

    const updateTotalSpentQuery = `
      UPDATE client c
      SET total_spent = (
        SELECT SUM(t.quantity_change * p.price) AS total_spent
        FROM transactions t
        LEFT JOIN products p ON t.product_id = p.product_id
        WHERE t.client_id = c.client_id
      )
    `;
    await connection.promise(updateTotalSpentQuery);

    // Retrieve client information
    let sql = `
      SELECT c.*, 
             COUNT(t.client_id) AS num_transactions
      FROM client c
      LEFT JOIN transactions t ON c.client_id = t.client_id
    `;

    if (searchClientName) {
      sql += ` WHERE c.client_name LIKE '%${searchClientName}%'`; // Add the search filter
    }

    sql += `
      GROUP BY c.client_id, c.client_name
    `;

    const result = await connection.promise(sql);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
