import pkg from "jsonwebtoken";
const { verify } = pkg;
import connection from "../connection.js";

export const authGuard = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = verify(token, process.env.JWT_TOKEN);

      // Assuming you have a function to query the user by ID from your MySQL database
      const user = await getUserById(id, connection);

      if (user) {
        req.user = user;
        next();
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      let err = new Error("Not authorized, Token fail");
      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error("Not authorized");
    error.statusCode = 401;
    next(error);
  }
};

// Function to get user by ID from MySQL database
async function getUserById(userId, connection) {
  return new Promise((resolve, reject) => {
    const getUserQuery = "SELECT * FROM user WHERE id = ?";
    connection.query(getUserQuery, [userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        // Assuming you have a User model or adjust accordingly based on your database structure
        const user = results[0];
        resolve(user);
      }
    });
  });
}
