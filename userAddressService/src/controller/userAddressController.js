import auth from "../../../common/middleware/authMiddleware";
import db from "../../../common/db";

export default function(app) {
  //read all
  app.get("/userAddressInfos", auth.verifyToken, async function(req, res) {
    try {
      const sqlText = "SELECT * FROM userAddressInfos where userPhone=$1";
      const { rows } = await db.query(sqlText, [req.user.phone]);
      res.send(rows);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  //read one
  app.get("/userAddressInfos/:id", auth.verifyToken, async function(req, res) {
    try {
      const sqlText =
        "SELECT * FROM userAddressInfos where userPhone=$1 AND id=$2";
      const { rows } = await db.query(sqlText, [req.user.phone, req.params.id]);
      if (!rows[0]) {
        res.status(500).send({ error: "user adress info not found!" });
      }
      res.send(rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  //create
  app.post("/userAddressInfos", auth.verifyToken, async function(req, res) {
    try {
      if (
        !req.body.addressType ||
        !req.body.addressDescription ||
        !req.body.isActive
      ) {
        res.status(500).send({ error: "invalid input!" });
      }

      const sqlText =
        "INSERT INTO userAddressInfos(userPhone,addressType,addressDescription,isActive) values($1,$2,$3,$4) returning *";
      const { rows } = await db.query(sqlText, [
        req.user.phone,
        req.body.addressType,
        req.body.addressDescription,
        req.body.isActive
      ]);
      if (!rows[0]) {
        res.status(500).send({ error: "user address is not created!" });
      }
      res.send(rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  //update
  app.put("/userAddressInfos/:id", auth.verifyToken, async function(req, res) {
    try {
      const sqlText =
        "SELECT * FROM userAddressInfos where userPhone=$1 AND id=$2";
      const { rows } = await db.query(sqlText, [req.user.phone, req.params.id]);
      if (!rows[0]) {
        res.status(500).send({ error: "user address not found!" });
      }

      const values = [
        req.body.addressType || rows[0].addressType,
        req.body.addressDescription || rows[0].addressDescription,
        req.body.isActive || rows[0].isActive,
        req.user.phone,
        req.params.id
      ];

      const sqlUpdateText =
        "UPDATE userAddressInfos SET addressType=$1,addressDescription=$2,isActive=$3 WHERE userPhone=$4 AND id=$5 returning *";
      const response = await db.query(sqlUpdateText, values);
      return res.status(200).send(response.rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  //delete
  app.delete("/userAddressInfos/:id", auth.verifyToken, async function(
    req,
    res
  ) {
    try {
      const deleteQuery =
        "DELETE FROM userAddressInfos WHERE userPhone=$1 AND id=$2 returning *";
      const { rows } = await db.query(deleteQuery, [
        req.user.phone,
        req.params.id
      ]);
      if (!rows[0]) {
        return res.status(404).send({ message: "user address not found!" });
      }
      return res.status(200).send({ message: "user address deleted!" });
    } catch (error) {
      res.status(500).send(error);
    }
  });
}
