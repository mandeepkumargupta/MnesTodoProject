const express = require("express");
const router = express.Router();
const userController = require("../expressData/controller/userController");
const todoController = require("../expressData/controller/todoController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/addTask", todoController.addTask);
router.get("/view", todoController.viewTask);
router.delete("/delete/:id", todoController.deleteTask);
router.put("/update/:id", todoController.updateTask);

module.exports = router;
