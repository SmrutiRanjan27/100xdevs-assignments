const jwt = require("jsonwebtoken");
const { jwtPassword } = require("../db/index");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    jwt.verify(token, jwtPassword, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      }
      req.username = decoded.username;
      console.log(`Username : ${decoded.username} authorized`);
      next();
    });
  } else {
    res.status(401).send("User not authorized. Please login!");
  }
}

module.exports = adminMiddleware;
