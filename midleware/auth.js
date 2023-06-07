import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is passed in the Authorization header as "Bearer <token>"
  
  if (!token) {
    return res.status(401).send({ status: false, msg: "No token provided" });
  }

  jwt.verify(token, "tokentoken", (err, decoded) => {
    if (err) {
      return res.status(403).send({ status: false, msg: "Invalid token" });
    }

    // Token is valid, you can access the decoded data
    req.user = decoded;
    next();
  });
};
