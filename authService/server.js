import express from "express";
import dotenv from "dotenv";
import dbSeeder from "./src/dbSeeder";
import authController from "./src/controller/authenticationController";
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;

dbSeeder();

authController(app);

app.listen(port, () =>
  console.log(`authentication server is listening on port ${port}!`)
);
