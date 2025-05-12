import express from "express";
import tasksRoutes from "./routes/tasks.routes";
import categoriesRoutes from "./routes/categories.routes";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/tasks", tasksRoutes);
app.use("/categories", categoriesRoutes);

app.listen(port, () => {
  console.log("Server listening on port : " + port);
});
