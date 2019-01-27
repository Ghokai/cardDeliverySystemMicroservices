import db from "../../../common/db";
import { createUser, validateUser, verifyToken } from "../user";

export default function(app) {
  //test route return all users
  app.get("/", async function(req, res) {
    const text = "SELECT phone,name,surname FROM users ";
    const val = await db.query(text);
    res.send(val.rows);
  });

  app.post("/signup", async function(req, res) {
    try {
      let user = req.body;
      const token = await createUser(user);
      res.status(200).send({ token });
    } catch (error) {
      res.status(500).send({ errorMessage: error.message });
    }
  });

  app.post("/signin", async function(req, res) {
    try {
      let credentials = req.body;
      const token = await validateUser(credentials);
      res.status(200).send({ token });
    } catch (error) {
      res.status(500).send({ errorMessage: error.message });
    }
  });

  app.post("/validateToken", async function(req, res) {
    try {
      const token = req.headers["x-access-token"];
      if (!token) {
        return res.status(400).send({ message: "Token is not provided" });
      }

      const user = await verifyToken(token);

      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ errorMessage: error.message });
    }
  });
}
