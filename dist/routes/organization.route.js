"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orgRouter = (0, express_1.Router)();
orgRouter.get("/", (req, res) => {
    console.log("this first plan route");
});
// orgRouter.get("/", getAllOrganizations)
// orgRouter.post( "/", createOrganization)
// orgRouter.get("/:id", getOrganization)
// orgRouter.put("/:id", updateOrganization)
// orgRouter.delete("/:id", deleteOrganization)
exports.default = orgRouter;
