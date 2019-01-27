import express from "express";
import dotenv from "dotenv";
import deliveryController from "./src/controller/deliveryController";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;

deliveryController(app);

app.listen(port, () =>
  console.log(`delivery service is listening on port ${port}!`)
);
