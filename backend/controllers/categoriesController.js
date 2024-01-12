import connection from "../connection.js";

export const createCategory = async (req, res) => {
  const { category_name } = req.body;
  const sql = "INSERT INTO Categories (category_name) VALUES (?)";
  const values = [category_name];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error creating category:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const newCategoryId = results.insertId;
    res.status(201).json({ category_id: newCategoryId, ...req.body });
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

export const getAllCategories = async (req, res) => {
  try {
    const searchCategoryName = req.query.searchcategoryname;

    let sql = `
      SELECT c.*, COUNT(p.category_id) AS product_count
      FROM Categories c
      LEFT JOIN Products p ON c.category_id = p.category_id AND p.is_deleted = false
    `;

    if (searchCategoryName) {
      sql += ` WHERE c.category_name LIKE '%${searchCategoryName}%'`; // Add the search filter
    }

    sql += `
      GROUP BY c.category_id, c.category_name
    `;

    const result = await connection.promise(sql);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM Categories WHERE category_id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error fetching category by ID:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.json(results[0]);
    }
  );
};
