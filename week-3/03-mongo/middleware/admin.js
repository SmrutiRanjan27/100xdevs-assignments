const { Admin } = require("../db/index");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const admin_name = req.headers.username;
  const admin_password = req.headers.password;
  Admin.findOne({
    username: admin_name,
    password: admin_password,
  }).then((admin) => {
    if (admin) {
      console.log("Admin user found!");
      next();
    } else {
      console.log("Admin user not found!");
      res.status(404).send("Admin not found!");
    }
  });
}

module.exports = adminMiddleware;
