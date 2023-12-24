const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  Admin.create({ username: username, password: password })
    .then((admin) => {
      console.log("Admin created successfully!");
      res.status(200).send("Admin created successfully!");
    })
    .catch((err) => {
      console.log("Error creating user!", err);
      res.status(404).send("Failed to create User!");
    });
});

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  Course.create({
    title: title,
    description: description,
    price: parseFloat(price),
  })
    .then((course) => {
      console.log("Course created successfully!");
      res.status(200).send("Course created successfully!");
    })
    .catch((err) => {
      console.log("Failed to create course!");
      res.status(404).send("Failed to create course!");
    });
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
  Course.find({})
    .then((courses) => {
      console.log(courses);
      res.json(courses);
    })
    .catch((err) => {
      console.log("Failed to fetch courses!");
      res.status(404).send("Failed to fetch courses!");
    });
});

module.exports = router;
