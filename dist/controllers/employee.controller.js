"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployees = exports.getAllEmployees = void 0;
const index_1 = __importDefault(require("../models/index"));
const handleError_helper_1 = __importDefault(require("../helpers/handleError.helper"));
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEmployees = yield index_1.default.Employees.findAll({});
        if (!allEmployees || allEmployees.length === 0) {
            res.status(404).json({ status: "Failure", message: "No employees found" });
        }
        res.status(200).json({ status: "Success", result: allEmployees });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error fetching all employees");
    }
});
exports.getAllEmployees = getAllEmployees;
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { office_id, org_id, emp_id } = req.query; // Extract office_id or org_id from query parameters
    try {
        let whereClause = {}; // Declare whereClause as an object
        // Build the where clause based on the provided query parameters
        if (office_id) {
            whereClause.office_id = office_id;
        }
        else if (org_id) {
            whereClause.org_id = org_id;
        }
        else if (emp_id) {
            whereClause.emp_id = emp_id;
        }
        // Fetch employees based on office_id or org_id
        const employees = yield index_1.default.Employees.findAll({ where: whereClause });
        // If no employees found
        if (employees.length === 0) {
            res.status(404).json({
                status: "404 Not Found",
                message: "No employees found for the provided office_id or org_id",
            });
        }
        // the found employees
        res.status(200).json({
            status: "Success",
            data: employees,
        });
    }
    catch (error) {
        console.error("Error fetching employees:", error);
        (0, handleError_helper_1.default)(res, error, "Error fetching employees");
    }
});
exports.getEmployees = getEmployees;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { office_id, emp_department, emp_designation, org_id, emp_encoded_image, user_name, user_email, user_password, user_birthday, user_age } = req.body;
    try {
        const employeeRole = yield index_1.default.Roles.findOne({
            where: { role_name: "employee" },
        });
        const role_id = employeeRole === null || employeeRole === void 0 ? void 0 : employeeRole.dataValues.role_id;
        const newUser = yield index_1.default.Users.create({
            user_name,
            user_email,
            user_password,
            user_birthday,
            org_id,
            role_id,
            user_age
        });
        if (!newUser) {
            res.status(400).json({ status: "Failure", message: "Error creating user" });
        }
        const userId = newUser.dataValues.user_id;
        const newEmployee = yield index_1.default.Employees.create({
            user_id: userId,
            office_id,
            emp_department,
            emp_designation,
            org_id,
            emp_encoded_image,
        });
        if (!newEmployee) {
            res.status(400).json({ status: "Failure", message: "Error creating employee" });
        }
        res.status(201).json({ status: "Success", message: "Employee created successfully" });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error creating employee");
    }
});
exports.createEmployee = createEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { user_id, office_id, emp_department, emp_designation, emp_encoded_image, org_id, } = req.body;
    try {
        const [isEmployeeUpdated] = yield index_1.default.Employees.update({
            user_id,
            office_id,
            emp_department,
            emp_designation,
            emp_encoded_image,
            org_id,
        }, { where: { emp_id: id } });
        if (isEmployeeUpdated === 0) {
            res.status(404).json({ status: "Failure", message: "Employee not found or no changes made" });
        }
        res.json({ status: "Success", message: "Employee updated successfully" });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error updating employee");
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const employee = yield index_1.default.Employees.findOne({ where: { emp_id: id } });
        if (!employee) {
            res.status(404).json({ status: "Failure", message: "Employee not found" });
        }
        yield index_1.default.Employees.destroy({ where: { emp_id: id } });
        res.json({ status: "Success", message: "Employee deleted successfully" });
    }
    catch (error) {
        (0, handleError_helper_1.default)(res, error, "Error deleting employee");
    }
});
exports.deleteEmployee = deleteEmployee;
