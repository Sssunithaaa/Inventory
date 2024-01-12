import connection from "../connection.js";
const executeQuery = async (sql, values) => {
  try {
    const [rows] = await connection.execute(sql, values);
    return rows;
  } catch (error) {
    throw error; // Re-throw the error to be caught by the calling function
  }
};
export const createSupplier = async (req, res, next) => {
  try {
    const { supplier_id, supplier_name, contact_person, phone, email } =
      req.body;
    const sql =
      "INSERT INTO Suppliers (supplier_id,supplier_name, contact_person, phone, email) VALUES (?, ?, ?, ?,?)";
    const values = [supplier_id, supplier_name, contact_person, phone, email];

    const result = await executeQuery(sql, values);

    res.status(201).json({ ...req.body });
  } catch (error) {
    let err = new Error(error.sqlMessage);
    return next(err);
  }
};

export const deleteSupplier = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Suppliers WHERE supplier_id = ?";

  connection.query(sql, [id], (error, results) => {
    if (error) {
      console.error("Error deleting supplier:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    res.json({ message: "Supplier deleted successfully" });
  });
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
export const getAllSuppliers = async (req, res) => {
  try {
    const searchSupplierName = req.query.searchsuppliername;

    let sql = `
      SELECT s.*, COUNT(p.supplier_id) AS product_count, 
             SUM(p.quantity_on_hand * p.price) AS total_price
      FROM Suppliers s
      LEFT JOIN Products p ON s.supplier_id = p.supplier_id AND p.is_deleted = false
    `;

    if (searchSupplierName) {
      sql += ` WHERE s.supplier_name LIKE '%${searchSupplierName}%'`; // Add the search filter
    }

    sql += `
      GROUP BY s.supplier_id, s.supplier_name
    `;

    const result = await connection.promise(sql);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
