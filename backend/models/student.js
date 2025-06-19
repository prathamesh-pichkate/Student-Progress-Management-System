const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  codeforcesHandle: { type: String, required: true, unique: true },

  currentRating: { type: Number, default: 0 },
  maxRating: { type: Number, default: 0 },
  lastActive: { type: Date },
  dataSyncTime: { type: Date },

  permissionToSendEmail: { type: Boolean, default: true },
  totalEmailsSent: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
});

studentSchema.index({ codeforcesHandle: 1 }, { unique: true });

module.exports = mongoose.model("Student", studentSchema);
