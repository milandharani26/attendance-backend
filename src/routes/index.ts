import { Router } from "express";
import userRouter from "./user.route";
import roleRouter from "./roles.route";
import planRouter from "./plan.route";
import paymentRouter from "./payment.route";
import orgRouter from "./organization.route";
import officeRouter from "./office.route";
import employeeRouter from "./employee.route";
import attendanceRouter from "./attendance.route";


const appRouter = Router();

appRouter.use("/org", orgRouter);
appRouter.use("/office", officeRouter);
appRouter.use("/role", roleRouter);
appRouter.use("/plan", planRouter);
appRouter.use("/payment", paymentRouter);
appRouter.use("/user", userRouter);
appRouter.use("/employee", employeeRouter);

appRouter.use("/attendance", attendanceRouter);


export default appRouter




