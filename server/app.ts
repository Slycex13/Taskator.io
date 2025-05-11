import express from "express";
import tasksRoutes from "./routes/tasks.routes";
import categoriesRoutes from "./routes/categories.routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/tasks", tasksRoutes);
app.use("/categories", categoriesRoutes);

app.listen(port, () => {
  console.log("Server listening on port : " + port);
});
