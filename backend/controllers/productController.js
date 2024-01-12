import connection from "../connection.js";
const executeQuery = async (sql, values) => {
  try {
    const [rows] = await connection.execute(sql, values);
    return rows;
  } catch (error) {
    if (
      error.code === "ER_NO_REFERENCED_ROW_2" ||
      error.code === "ER_ROW_IS_REFERENCED_2"
    ) {
      // Handle foreign key constraint error here
      console.error("Foreign key constraint error:", error);
      throw new Error("Supplier ID or Category ID doesn't exist");
    } else {
      // Handle other errors
      console.error("Error:", error);
      throw error;
    } // Re-throw the error to be caught by the calling function
  }
};
export const createProduct = async (req, res, next) => {
  try {
    const {
      product_name,
      description,
      price,
      quantity_on_hand,
      category_id,
      supplier_id,
    } = req.body;
    const sql =
      "INSERT INTO Products (product_name, description, price, quantity_on_hand, category_id, supplier_id) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
      product_name,
      description,
      price,
      quantity_on_hand,
      category_id,
      supplier_id,
    ];

    const result = await executeQuery(sql, values);

    const newProductId = result.insertId;
    res.status(201).json({ product_id: newProductId, ...req.body });
  } catch (error) {
    let err = new Error(error);
    return next(err);
  }
};

export const deleteProduct = async (req, res) => {
  const { product_id } = req.params;
  console.log(product_id);

  const sql =
    "UPDATE Products SET is_deleted=true WHERE product_id = ? OR quantity_on_hand = ?";

  connection.query(sql, [product_id, quantity_on_hand], (error, results) => {
    if (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
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

export const getAllProducts = async (req, res) => {
  try {
    const searchProductName = req.query.searchproductname;
    const searchCategoryName = req.query.searchcategoryname;
    const quantity_on_hand = 0;
    const sql1 =
      "UPDATE Products SET is_deleted=true WHERE quantity_on_hand = ?";
    await executeQuery(sql1, [quantity_on_hand]);
    let sql =
      "SELECT p.*, c.category_name, s.supplier_name " +
      "FROM Products p " +
      "LEFT JOIN Categories c ON p.category_id = c.category_id " +
      "LEFT JOIN Suppliers s ON p.supplier_id = s.supplier_id " +
      "WHERE p.is_deleted=false";

    if (searchProductName) {
      sql += ` AND p.product_name LIKE '%${searchProductName}%'`; // Add the search filter
    }
    if (searchCategoryName) {
      sql += ` AND c.category_name LIKE '%${searchCategoryName}%'`; // Add the search filter
    }

    const result = await connection.promise(sql);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
