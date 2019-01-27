import axios from "axios";

const Auth = {

  async verifyToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(400).send({ message: "Token is not provided" });
    }
    try {
      const auth = await axios.post(
        process.env.AUTH_ENDPOINT,
        {},
        {
          headers: {
            "x-access-token": token
          }
        }
      );
      req.user = auth.data;
      next();
    } catch (error) {
      console.log(error.code);
      if (error.code === "ECONNREFUSED") {
        return res.status(500).send({ error: "Auth service is not alive" });
      }
      if (error.response) {
        return res.status(500).send(error.response.data);
      } else return res.status(500).send(error);
    }
  }
};

export default Auth;
