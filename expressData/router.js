const express = require("express");
const router = express.Router();
const userController = require("../expressData/controller/userController");
const todoController = require("../expressData/controller/todoController");
const authenticate = require("../expressData/middleware/authenticate");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/addTask", todoController.addTask);
//router.get("/view", authenticate, todoController.viewTask);
router.get("/view", todoController.viewTask);
router.delete("/delete/:id", todoController.deleteTask);
router.put("/update/:id", todoController.updateTask);
router.get("/getTodoData", todoController.getDataByUserId);

module.exports = router;
