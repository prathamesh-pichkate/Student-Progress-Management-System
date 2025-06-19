const Student = require("../models/student");
const fetchCodeforcesData = require("../utils/fetchCodeforcesData");
const fetchCodeforcesProfileData = require("../utils/fetchCFProfileData");

// 1. Create a new student
exports.createStudent = async (req, res) => {
  const { name, email, phone, codeforcesHandle } = req.body;

  try {
    // Fetch Codeforces data
    const cfData = await fetchCodeforcesData(codeforcesHandle);

    // Create student document
    const student = new Student({
      name,
      email,
      phone,
      codeforcesHandle,
      currentRating: cfData.currentRating,
      maxRating: cfData.maxRating,
      lastActive: cfData.lastActive,
      dataSyncTime: new Date(),
    });

    await student.save();

    res.status(201).json({ message: "Student created successfully", student });
  } catch (error) {
    console.error("Error creating student:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// 2. Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

// 3. Update the student
exports.updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const updateData = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updateData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student:", error.message);
    res.status(500).json({ error: "Failed to update student" });
  }
};

// 4. Delete the student
exports.deleteStudent = async (req, res) => {
  const studentId = req.params.id;
  console.log("Student ID received for deletion:", req.params.id);

  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error.message);
    res.status(500).json({ error: "Failed to delete student" });
  }
};

exports.getStudentProfileData = async (req, res) => {
  try {
    console.log("Fetching student with ID:", req.params.id);

    const student = await Student.findById(req.params.id);
    if (!student) {
      console.log("Student not found");
      return res.status(404).json({ error: "Student not found" });
    }

    console.log("Student found:", student);

    const cfData = await fetchCodeforcesProfileData(student.codeforcesHandle);
    console.log("cfData:", cfData);

    res.json({
      student,
      codeforces: cfData,
    });
  } catch (error) {
    console.error("Error in getStudentProfileData:", error);
    res.status(500).json({ error: "Failed to fetch student profile data" });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activeToday = await Student.countDocuments({
      lastActive: { $gte: today },
    });

    const allStudents = await Student.find();
    const totalRating = allStudents.reduce(
      (acc, s) => acc + (s.currentRating || 0),
      0
    );

    const avgRating = allStudents.length
      ? Math.round(totalRating / allStudents.length)
      : 0;

    const inactiveThreshold = new Date();
    inactiveThreshold.setDate(inactiveThreshold.getDate() - 7);

    const inactiveUsers = await Student.countDocuments({
      lastActive: { $lt: inactiveThreshold },
    });

    res.json({
      totalStudents,
      activeToday,
      avgRating,
      inactiveUsers,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.syncStudentData = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    const cfData = await fetchCodeforcesProfileData(student.codeforcesHandle);

    student.dataSyncTime = new Date();
    student.codeforcesRating = cfData.user.rating || 0;
    student.maxRating = cfData.user.maxRating || 0;
    student.submissions = cfData.submissions;
    student.contests = cfData.contests;

    await student.save();

    res.json({ message: "Student data synced successfully", student });
  } catch (error) {
    console.error("Manual sync error:", error);
    res.status(500).json({ error: "Failed to sync student data" });
  }
};
