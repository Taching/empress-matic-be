import express from "express";

import userRouter from "./routes/api/users";
import customerRouter from "./routes/api/custromer"
import orderRouter from "./routes/api/order"

import generalErrorHandler from "./middleware/errorHandling/generalErrorHandler";
import {
  authErrorHandler,
  prismaErrorHandler,
} from "./middleware/errorHandling";

const app = express();

// Allows parsing of json in the body of the request.
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/customer", customerRouter);
app.use("/api/order", orderRouter);

app.get("/", function (_req, res) {
  return res.send("This is just the backend for EmpressMatic APP");
});

app.use(authErrorHandler, prismaErrorHandler, generalErrorHandler);

export default app;