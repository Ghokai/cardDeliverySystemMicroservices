import express from "express";
import dotenv from "dotenv";
import userAddressController from "./src/controller/userAddressController";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;

userAddressController(app);

app.listen(port, () =>
  console.log(`user address service is listening on port ${port}!`)
);
