"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const officeRouter = (0, express_1.Router)();
officeRouter.get("/", (req, res) => {
    console.log("this first plan route");
});
// officeRouter.get("/", getAllOffices);
// officeRouter.post("/", createOffice);
// officeRouter.get("/:id", getOffice);
// officeRouter.get("/same-orgs/:id", getOfficesByOrgId);
// officeRouter.put("/:id", updateOffice);
// officeRouter.delete("/:id", deleteOffice);
exports.default = officeRouter;
