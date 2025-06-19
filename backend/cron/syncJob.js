// cron/syncJob.js
const cron = require("node-cron");
const Student = require("../models/student");
const fetchCodeforcesProfileData = require("../utils/fetchCFProfileData");

// Runs every day at 2:00 AM
cron.schedule("0 2 * * *", async () => {
  console.log("🔁 Starting student data sync...");

  try {
    const students = await Student.find();

    for (const student of students) {
      try {
        const cfData = await fetchCodeforcesProfileData(
          student.codeforcesHandle
        );

        // Update student data
        student.dataSyncTime = new Date();
        student.codeforcesRating = cfData.user.rating || 0;
        student.maxRating = cfData.user.maxRating || 0;
        student.submissions = cfData.submissions;
        student.contests = cfData.contests;

        await student.save();
        console.log(`✅ Synced ${student.name}`);
      } catch (err) {
        console.error(`❌ Failed to sync ${student.name}:`, err.message);
      }
    }

    console.log("✅ Data sync complete.");
  } catch (err) {
    console.error("❌ Cron job error:", err.message);
  }
});
