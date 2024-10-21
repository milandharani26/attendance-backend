import { Router } from "express"
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", createUser);
userRouter.get("/:id", getUser); 
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);


export default userRouter