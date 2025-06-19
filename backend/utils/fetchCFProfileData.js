const axios = require("axios");

async function fetchCodeforcesProfileData(handle) {
  try {
    const infoRes = await axios.get(
      `https://codeforces.com/api/user.info?handles=${handle}`
    );
    const user = infoRes.data.result[0];

    const statusRes = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handle}`
    );
    const submissions = statusRes.data.result;

    const ratingRes = await axios.get(
      `https://codeforces.com/api/user.rating?handle=${handle}`
    );
    const contests = ratingRes.data.result;

    return {
      user,
      submissions,
      contests,
    };
  } catch (error) {
    console.error(
      "Error fetching profile data:",
      error?.response?.data || error.message
    );
    throw new Error("Unable to fetch Codeforces profile data");
  }
}

module.exports = fetchCodeforcesProfileData;
