import { Router } from "express";
import { loginUser, forgotPassword, resetPassword, logoutUser } from "../controllers/auth.controller";

const authRouter = Router();

// Sign up route
// authRouter.post("/signUp", createUser);

// Login route
authRouter.post("/login", loginUser);

// Logout route
authRouter.post("/logout", logoutUser);

// Forgot password route
authRouter.post("/forgot-password", forgotPassword);

// Reset password route
authRouter.post("/reset-password", resetPassword);

export default authRouter;


