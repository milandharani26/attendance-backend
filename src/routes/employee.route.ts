import { Router } from "express"
import { createEmployee, deleteEmployee, getAllEmployees, getEmployees, updateEmployee } from "../controllers/employee.controller"

const employeeRouter = Router()

employeeRouter.get("/", getAllEmployees)
employeeRouter.post("/", createEmployee)
employeeRouter.get("/filter", getEmployees)
employeeRouter.put("/:id", updateEmployee)
employeeRouter.delete("/:id", deleteEmployee)


export default employeeRouter