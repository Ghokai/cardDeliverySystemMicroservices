import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export default {

  hashPassword(password) {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(8));
  },

  comparePassword(hashPassword, password) {
    return bcryptjs.compareSync(password, hashPassword);
  },

  generateToken(user) {
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "7d" });
    return token;
  },

  async decodeToken(token) {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  }
};
