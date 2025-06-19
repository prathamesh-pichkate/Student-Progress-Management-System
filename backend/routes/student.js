const express = require("express");

const router = express.Router();
const studentController = require("../controllers/student");

router.post("/create-student", studentController.createStudent);
router.get("/get-data", studentController.getAllStudents);
router.put("/edit-student/:id", studentController.updateStudent);
router.delete("/delete-student/:id", studentController.deleteStudent);
router.get("/profile/:id", studentController.getStudentProfileData);
router.get("/stats-data", studentController.getStats);
router.post("/sync/:id", studentController.syncStudentData);

module.exports = router;
