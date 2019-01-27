import db from "../../../common/db";
import helper from "../helper";

export async function createUser(user) {

  if (!user.phone || !user.password || !user.name || !user.surname) {
    throw new Error("User Values Is Not Correct!");
  }

  const hashPassword = helper.hashPassword(user.password);

  const createQuery = `INSERT INTO
      users(phone, password, name,surname)
      VALUES($1, $2, $3, $4)
      returning *`;
  const values = [user.phone, hashPassword, user.name, user.surname];

  try {
    const { rows } = await db.query(createQuery, values);
    const token = helper.generateToken({
      phone: rows[0].phone,
      name: rows[0].name,
      surname: rows[0].surname
    });

    return token;
  } catch (error) {
 
    if (error.detail) {
      throw new Error(error.detail);
    }
    throw new Error(error);
  }
}

export async function validateUser(credentials) {
  if (!credentials.phone || !credentials.password) {
    throw new Error("Crendential Values Is Not Correct!");
  }

  const createQuery = `SELECT *	FROM public.users where phone=$1`;
  const values = [credentials.phone];

  try {
    const { rows } = await db.query(createQuery, values);
    if (!rows[0]) {
      throw new Error("User Not Found!");
    }

    if (!helper.comparePassword(rows[0].password, credentials.password)) {
      throw new Error("Invalid Password!");
    }

    const token = helper.generateToken({
      phone: rows[0].phone,
      name: rows[0].name,
      surname: rows[0].surname
    });

    return token;
  } catch (error) {
  
    if (error.detail) {
      throw new Error(error.detail);
    }
    throw new Error(error);
  }
}

export async function verifyToken(token) {

  try {
    const decoded = await helper.decodeToken(token);
    const text = "SELECT * FROM users WHERE phone = $1";
    const { rows } = await db.query(text, [decoded.phone]);
    if (!rows[0]) {
      throw new Error("The token you provided is invalid");
    }
    return {
      phone: rows[0].phone,
      name: rows[0].name,
      surname: rows[0].surname
    };
  } catch (error) {
    if (error.detail) {
      throw new Error(error.detail);
    }
    throw new Error(error);
  }
}
