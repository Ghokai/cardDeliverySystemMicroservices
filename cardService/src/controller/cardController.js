import auth from "../../../common/middleware/authMiddleware";
import db from "../../../common/db";

export default function(app) {

  //read all
  app.get("/cards", auth.verifyToken, async function(req, res) {
    try {
      const sqlText = "SELECT * FROM cards";
      const { rows } = await db.query(sqlText, []);
      res.send(rows);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  //read one
  app.get("/cards/:id", auth.verifyToken, async function(req, res) {
    try {
      const sqlText = "SELECT * FROM cards where id=$1";
      const { rows } = await db.query(sqlText, [req.params.id]);
      if (!rows[0]) {
        res.status(500).send({ error: "card not found!" });
      }
      res.send(rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  //create
  app.post("/cards", auth.verifyToken, async function(req, res) {
    try {
      if (!req.body.cardname || !req.body.price) {
        res.status(500).send({ error: "invalid input!" });
      }

      const sqlText =
        "INSERT INTO cards(cardname,price) values($1,$2) returning *";
      const { rows } = await db.query(sqlText, [
        req.body.cardname,
        req.body.price
      ]);
      if (!rows[0]) {
        res.status(500).send({ error: "card not created!" });
      }
      res.send(rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  //update
  app.put("/cards/:id", auth.verifyToken, async function(req, res) {
    try {
      const sqlText = "SELECT * FROM cards where id=$1";
      const { rows } = await db.query(sqlText, [req.params.id]);
      if (!rows[0]) {
        res.status(500).send({ error: "card not found!" });
      }

      const values = [
        req.body.cardname || rows[0].cardname,
        req.body.price || rows[0].price,
        req.params.id
      ];

      const sqlUpdateText =
        "UPDATE cards SET cardname=$1,price=$2 WHERE id=$3 returning *";
      const response = await db.query(sqlUpdateText, values);
      return res.status(200).send(response.rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  //delete
  app.delete("/cards/:id", auth.verifyToken, async function(req, res) {
    try {
      const deleteQuery = "DELETE FROM cards WHERE id=$1 returning *";
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: "card not found" });
      }
      return res.status(200).send({ message: "deleted" });
    } catch (error) {
      res.status(500).send(error);
    }
  });
}

