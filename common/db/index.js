import { Pool } from "pg";

let pool = null;

export default {
 
  query(text, params) {
    if (pool == null) {
      console.log(">>connecting to:" + process.env.DB_CONN_STR);
      pool = new Pool({
        connectionString: process.env.DB_CONN_STR
      });
    }

    return new Promise((resolve, reject) => {
      pool
        .query(text, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
