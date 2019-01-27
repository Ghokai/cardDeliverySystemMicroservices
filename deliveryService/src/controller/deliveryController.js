import auth from "../../../common/middleware/authMiddleware";
import db from "../../../common/db";

export default function(app) {
  //read all
  app.get("/deliveries", auth.verifyToken, async function(req, res) {
    try {
      const sqlText = "SELECT * FROM deliveries";
      const { rows } = await db.query(sqlText, []);
      res.send(rows);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  //read one
  app.get("/deliveries/:id", auth.verifyToken, async function(req, res) {
    try {
      const sqlText = "SELECT * FROM deliveries where id=$1";
      const { rows } = await db.query(sqlText, [req.params.id]);
      if (!rows[0]) {
        res.status(500).send({ error: "delivery not found!" });
      }
      res.send(rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  //create
  app.post("/deliveries", auth.verifyToken, async function(req, res) {
    try {
      if (
        !req.body.deliveryTypeName ||
        !req.body.price ||
        !req.body.countryCode
      ) {
        res.status(500).send({ error: "invalid input!" });
      }

      const sqlText =
        "INSERT INTO deliveries(deliveryTypeName,price,countryCode) values($1,$2,$3) returning *";
      const { rows } = await db.query(sqlText, [
        req.body.deliveryTypeName,
        req.body.price,
        req.body.countryCode
      ]);
      if (!rows[0]) {
        res.status(500).send({ error: "delivery not created!" });
      }
      res.send(rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  //update
  app.put("/deliveries/:id", auth.verifyToken, async function(req, res) {
    try {
      const sqlText = "SELECT * FROM deliveries where id=$1";
      const { rows } = await db.query(sqlText, [req.params.id]);
      if (!rows[0]) {
        res.status(500).send({ error: "delivery not found!" });
      }

      const values = [
        req.body.deliveryTypeName || rows[0].deliveryTypeName,
        req.body.price || rows[0].price,
        req.body.countryCode || rows[0].countryCode,
        req.params.id
      ];

      const sqlUpdateText =
        "UPDATE deliveries SET deliveryTypeName=$1,price=$2,countryCode=$3 WHERE id=$4 returning *";
      const response = await db.query(sqlUpdateText, values);
      return res.status(200).send(response.rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  //delete
  app.delete("/deliveries/:id", auth.verifyToken, async function(req, res) {
    try {
      const deleteQuery = "DELETE FROM deliveries WHERE id=$1 returning *";
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: "delivery not found" });
      }
      return res.status(200).send({ message: "delivery deleted" });
    } catch (error) {
      res.status(500).send(error);
    }
  });
}
