import express from "express";
import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";
const app = express();

app.use(express.json()); //Para que el servidor entienda los objetos de tipo json que recibe desde el request body

app.use(indexRoutes);
app.use("/api", employeesRoutes); //Aqui estoy obligando a que todas mis rutas empiezen con '/api'

app.use((req, res, next) => {
  res.status(404).json({
    message: "API not found",
  });
});

export default app;
