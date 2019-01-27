import express from "express";
import dotenv from "dotenv";
import cardController from "./src/controller/cardController";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;

cardController(app);

app.listen(port, () =>
  console.log(`card service is listening on port ${port}!`)
);
