const { Router } = require("express");
const jwt = require("jsonwebtoken");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course, jwtPassword } = require("../db/index");

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  User.create({ username: username, password: password })
    .then((admin) => {
      console.log("User created successfully!");
      res.status(200).send("User created successfully!");
    })
    .catch((err) => {
      console.log("Error creating user!", err);
      res.status(404).send("Failed to create User!");
    });
});

router.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({
    username: username,
    password: password,
  }).then((user) => {
    if (user) {
      console.log("User found!");
      const token = jwt.sign({ username: username }, jwtPassword);
      res.cookie("token", token);
      res.send("User signed in!");
    } else {
      console.log("User not found!");
      res.status(404).send("User not found!");
    }
  });
});

router.post("/signin", (req, res) => {});

router.get("/courses", (req, res) => {
  // Implement listing all courses logic
  Course.find()
    .then((courses) => {
      console.log(courses);
      res.json(courses);
    })
    .catch((err) => {
      console.log("Failed to fetch courses!");
      res.status(404).send("Failed to fetch courses!");
    });
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
  const username = req.username;
  const courseId = req.params.courseId;
  Course.findById(courseId).then((course) => {
    if (course) {
      User.findOne({ username: username }).then((user) => {
        user.purchasedCourses.push(course._id);
        user.save();
      });
      res.send(`${course.title} course purchased`);
    } else {
      res.send("Couldn't find the course!");
    }
  });
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.username;
  User.findOne({ username: username }).then((user) => {
    Course.find({ _id: { $in: user.purchasedCourses } }).then((courses) => {
      res.json(courses);
    });
  });
});

module.exports = router;
