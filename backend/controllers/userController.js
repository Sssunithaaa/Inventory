import bcrypt from "bcrypt";
import connection from "../connection.js"; // Adjust the path based on your file structure

import generateJWT from "../utils/auth.js";
const saltRounds = 10;

const executeQuery = async (sql, values) => {
  try {
    const [rows] = await connection.execute(sql, values);
    return rows;
  } catch (error) {
    throw error; // Re-throw the error to be caught by the calling function
  }
};

const registerUser = async (req, res, next) => {
  const { name, email, PASSWORD, role } = req.body;

  try {
    const checkUserQuery = `SELECT * FROM user WHERE email = ?`;
    const checkValues = [email];
    const checkResults = await executeQuery(checkUserQuery, checkValues);

    if (checkResults.length > 0) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(PASSWORD, saltRounds);

    const insertUserQuery =
      "INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)";
    const insertUserValues = [name, email, hashedPassword, role];

    const results = await executeQuery(insertUserQuery, insertUserValues);

    const userId = results.insertId;
    const token = await generateJWT(userId);

    const updateTokenQuery = "UPDATE user SET token = ? WHERE id = ?";
    const updateTokenValues = [token, userId];

    const tokenUpdate = await executeQuery(updateTokenQuery, updateTokenValues);

    if (tokenUpdate.length > 0) {
      res.status(201).json({
        user_id: userId,
        name: name,
        email: email,
        role: role,
        token: token,
      });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, PASSWORD } = req.body;
  const sqlSearch = "SELECT * FROM user WHERE email = ?";
  const sqlValues = [email];

  try {
    const results = await executeQuery(sqlSearch, sqlValues);

    if (results.length === 0) {
      console.log("--------> User does not exist");
      res.sendStatus(404);
    } else {
      const hashedPassword = results[0].PASSWORD;

      if (await bcrypt.compare(PASSWORD, hashedPassword)) {
        console.log("---------> Login Successful");
        const token = generateJWT({ id: results[0].id });
        res.json(results[0]);
      } else {
        console.log("---------> Password Incorrect");
        res.send("Password incorrect!");
      }
    }
  } catch (error) {
    let err = new Error(error);
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const id = req.user.id;
    console.log(id);
    const sqlSearch = "Select * from user where id = ?";
    const sqlValues = [id];
    connection.query(sqlSearch, sqlValues, async (error, results) => {
      if (results.length == 0) {
        throw new Error("User not found");
      }
      const user = results[0];
      console.log(user);
      const { name, contactNumber, email, PASSWORD, role, status } = req.body;
      const updateQuery =
        "UPDATE user SET name=?, contactNumber= ?,email=?,PASSWORD=?,role=?,status=? WHERE id=?";
      const updateValues = [
        name,
        contactNumber,
        email,
        PASSWORD,
        role,
        status,
        id,
      ];
      console.log(updateValues);
      connection.query(updateQuery, updateValues, (error, updateResults) => {
        if (error) {
          return next(error);
        }
        if (updateResults.affectedRows > 0) {
          // If successful, perform a SELECT query to get the updated user data
          const selectQuery = "SELECT * FROM user WHERE id=?";
          const selectValues = [id];

          connection.query(
            selectQuery,
            selectValues,
            (selectError, selectResults) => {
              if (selectError) {
                return next(selectError);
              }

              const updatedUser = selectResults[0];

              return res.json({
                updatedUser,
              });
            }
          );
        } else {
          return res.json({
            message: "No user was updated.",
          });
        }
      });
    });
  } catch (error) {
    next(error);
  }
};
export { registerUser, loginUser, updateProfile };
