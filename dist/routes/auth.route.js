"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = (0, express_1.Router)();
// Sign up route
// authRouter.post("/signUp", createUser);
// Login route
authRouter.post("/login", auth_controller_1.loginUser);
// Logout route
authRouter.post("/logout", auth_controller_1.logoutUser);
// Forgot password route
authRouter.post("/forgot-password", auth_controller_1.forgotPassword);
// Reset password route
authRouter.post("/reset-password", auth_controller_1.resetPassword);
exports.default = authRouter;
