import express from "express";
import http from "http";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import {
  errorResponseHandler,
  invalidPathHandler,
} from "./middleware/errorHandler.js";
import productRoutes from "./routes/productRoutes.js";
import transactionsRoutes from "./routes/transactionsRoutes.js";
import categoryRoutes from "./routes/categoriesRoutes.js";
import suppliersRoutes from "./routes/suppliersRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
const PORT = process.env.PORT || 5000; // Adjust the default port as needed

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use("/home", homeRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/transactions", transactionsRoutes);
app.use("/categories", categoryRoutes);
app.use("/suppliers", suppliersRoutes);
app.use("/clients", clientRoutes);

const server = http.createServer(app); // Pass the Express app instance to createServer
app.use(invalidPathHandler);
app.use(errorResponseHandler);
server.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
