import express from "express";
import morgan from "morgan";
import routRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", routRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
