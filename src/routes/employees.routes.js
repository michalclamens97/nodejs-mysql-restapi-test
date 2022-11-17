import { Router } from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employess.controllers.js";

const router = Router();

router.get("/employees", getEmployees);

router.get("/employees/:id", getEmployee);

router.post("/employess", createEmployee);

router.patch("/employess/:id", updateEmployee); //Patch me permiti actualizar parcialmente o todos los datos mientras que put me obliga a actualizar todos los datos

router.delete("/employess/:id", deleteEmployee);

export default router;
