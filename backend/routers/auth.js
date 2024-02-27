const express = require("express");
const router = express.Router();
const createUser = require("../controllers/user");
const {createTask,deleteTask,editTask} = require("../controllers/task");
const login = require("../controllers/login");
const userTask = require("../controllers/getTask");
const authMiddleware = require("../middlewares/auth-middleware");
const userSchema = require("../validators/user-validator");
const validate = require("../middlewares/validate-middleware");



router.route("/createUser").post(validate(userSchema),createUser);
router.route("/login").post(login);
router.route("/createtask").post(createTask);
router.route("/task/:id").delete(deleteTask).put(editTask);
router.route("/getTask").get(authMiddleware,userTask);



module.exports = router;