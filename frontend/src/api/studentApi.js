import axios from "axios";

const API_BASE = "http://localhost:5000/api/students";

// Create a new student
export const createStudent = async (studentData) => {
  try {
    const response = await axios.post(
      `${API_BASE}/create-student`,
      studentData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating student:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get all students
export const fetchAllStudents = async () => {
  try {
    const response = await axios.get(`${API_BASE}/get-data`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch students:", error);
    throw error;
  }
};

// Delete a student
export const deleteStudent = async (id) => {
  try {
    console.log("Sending DELETE request for ID:", id);
    const response = await axios.delete(`${API_BASE}/delete-student/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to delete student");
  }
};

// Update a student
export const updateStudent = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${API_BASE}/edit-student/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to update student");
  }
};

//Student Profile Data
export const fetchStudentProfile = async (id) => {
  const response = await axios.get(`${API_BASE}/profile/${id}`);
  const { student, codeforces } = response.data;

  const lastActiveSub = codeforces.submissions.find(
    (sub) => sub.verdict === "OK"
  );
  const lastActive = lastActiveSub
    ? new Date(lastActiveSub.creationTimeSeconds * 1000)
    : null;

  const verdictStatsMap = {};
  codeforces.submissions.forEach((sub) => {
    const v = sub.verdict || "UNKNOWN";
    verdictStatsMap[v] = (verdictStatsMap[v] || 0) + 1;
  });
  const verdictStats = Object.entries(verdictStatsMap).map(
    ([verdict, count]) => ({
      verdict,
      count,
    })
  );

  const submissionStatsMap = {};
  codeforces.submissions.forEach((sub) => {
    const date = new Date(sub.creationTimeSeconds * 1000)
      .toISOString()
      .slice(0, 10);
    submissionStatsMap[date] = (submissionStatsMap[date] || 0) + 1;
  });
  const submissionStats = Object.entries(submissionStatsMap).map(
    ([date, count]) => ({
      date,
      count,
    })
  );

  const formattedContests = codeforces.contests.map((c) => ({
    name: c.contestName,
    rank: c.rank,
    oldRating: c.oldRating,
    newRating: c.newRating,
    ratingChange: c.newRating - c.oldRating,
    date: new Date(c.ratingUpdateTimeSeconds * 1000).toLocaleDateString(),
  }));

  return {
    name: student.name,
    email: student.email,
    phone: student.phone,
    codeforcesHandle: student.codeforcesHandle,
    dataSyncTime: student.dataSyncTime,
    currentRating: codeforces.user.rating || 0,
    maxRating: codeforces.user.maxRating || 0,
    lastActive,
    verdictStats,
    submissionStats,
    contests: formattedContests,
    permissionToSendEmail: student.permissionToSendEmail,
    totalEmailsSent: student.totalEmailsSent,
  };
};

export const fetchStudentStats = async () => {
  const response = await axios.get(`${API_BASE}/stats-data`);
  return response.data;
};

export const manualSyncStudent = async (id) => {
  const response = await axios.post(`${API_BASE}/sync/${id}`);
  return response.data;
};
