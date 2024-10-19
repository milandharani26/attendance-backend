import { Op, col, fn } from "sequelize";
import db from "../helpers/db.helper.js";
import { Request, Response } from "express";
// import models from "../models/index.js";

export const getAllUsers = function(req : Request, res:Response){
    res.json({
        status:"Success",
        result:"All users found"
    })
}   



