const axios = require("axios");

async function fetchCodeforcesData(handle) {
  try {
    // 1. Get rating info
    const infoRes = await axios.get(
      `https://codeforces.com/api/user.info?handles=${handle}`
    );
    const user = infoRes.data.result[0];

    // 2. Get submission history
    const statusRes = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handle}`
    );
    const submissions = statusRes.data.result;

    // 3. Get last submission date
    const lastActiveSubmission = submissions.find(
      (sub) => sub.verdict === "OK"
    );
    const lastActive = lastActiveSubmission
      ? new Date(lastActiveSubmission.creationTimeSeconds * 1000)
      : null;

    return {
      currentRating: user.rating || 0,
      maxRating: user.maxRating || 0,
      lastActive,
    };
  } catch (error) {
    console.error(
      "Error fetching Codeforces data:",
      error?.response?.data || error.message
    );
    throw new Error("Unable to fetch Codeforces data");
  }
}

module.exports = fetchCodeforcesData;
