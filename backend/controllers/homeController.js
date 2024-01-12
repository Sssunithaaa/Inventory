import connection from "../connection.js";
const executeQuery = async (sql, values) => {
  try {
    const [rows] = await connection.execute(sql, values);
    return rows;
  } catch (error) {
    throw error; // Re-throw the error to be caught by the calling function
  }
};
export const getNumbers = async (req, res, next) => {
  try {
    const tableName = req.query.id;
    console.log(req.query.id);
    console.log(tableName);
    const sql = `SELECT COUNT(*) AS total_count FROM ${tableName}`;
    const result = await executeQuery(sql);
    console.log(result);
    return res.json(result);
  } catch (error) {
    let err = new Error(error.sqlMessage);
    return next(err);
  }
};
