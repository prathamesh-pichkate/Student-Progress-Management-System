import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Components
import HeaderSection from "../components/HeaderSection";
import BasicInfoCard from "../components/BasicInfoCard";
import CodeforcesStatsCard from "../components/CodeforcesStatsCard";
import PieChartVerdictStats from "../components/PieChartVerdictStats";
import SubmissionTrendsChart from "../components/SubmissionTrendsChart";
import ContestHistoryTable from "../components/ContestHistoryTable";
import ActivityTimeline from "../components/ActivityTimeline";
// import EmailStats from "../components/EmailStats";

// API
import { fetchStudentProfile } from "../api/studentApi";
import { MoveLeft } from "lucide-react";

const StudentProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [filterDays, setFilterDays] = useState("30");
  const [loading, setLoading] = useState(true);

  const loadStudentProfile = async () => {
    try {
      const data = await fetchStudentProfile(id);
      setStudent(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching student profile:", error);
    }
  };

  useEffect(() => {
    loadStudentProfile();
  }, [id]);

  const getFilteredData = (days) => {
    if (!student)
      return {
        submissionStats: [],
        contests: [],
        activityTimeline: [],
      };

    const now = new Date();
    const fromDate =
      days === "all"
        ? new Date(0)
        : new Date(now.getTime() - parseInt(days) * 24 * 60 * 60 * 1000);

    const filteredSubmissionStats = student.submissionStats.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= fromDate;
    });

    const filteredContests = student.contests.filter((contest) => {
      const contestDate = new Date(contest.date);
      return contestDate >= fromDate;
    });

    const filteredActivityTimeline = (student.activityTimeline || []).filter(
      (activity) => {
        const activityDate = new Date(activity.date);
        return activityDate >= fromDate;
      }
    );

    return {
      submissionStats: filteredSubmissionStats,
      contests: filteredContests,
      activityTimeline: filteredActivityTimeline,
    };
  };

  // Get filtered data for these three only
  const { submissionStats, contests, activityTimeline } =
    getFilteredData(filterDays);

  return (
    <div className="flex h-screen">
      {/* Right content area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {loading ? (
          <div className="text-center mt-20 text-gray-600 dark:text-gray-300">
            Loading profile...
          </div>
        ) : !student ? (
          <div className="text-center mt-20 text-red-600 dark:text-red-400">
            Student not found.
          </div>
        ) : (
          <>
            {/* Top Row: Back Button + Day Filter */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <button
                onClick={() => navigate("/")}
                className="p-2 md:p-4 max-w-fit border rounded-md flex items-center gap-2 text-xl hover:bg-gray-100 transition"
                type="button"
              >
                <MoveLeft />
                Back to Home Page
              </button>

              {/* Days Filter */}
              <select
                className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 text-base bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
                value={filterDays}
                onChange={(e) => setFilterDays(e.target.value)}
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="365">Last 1 Year</option>
                <option value="all">All Time</option>
              </select>
            </div>

            {/* Header */}
            <HeaderSection
              name={student.name}
              email={student.email}
              handle={student.codeforcesHandle}
              lastSync={student.dataSyncTime}
            />

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <BasicInfoCard
                name={student.name}
                email={student.email}
                phone={student.phone}
                registeredAt={student.registeredAt || student.dataSyncTime}
              />
              <CodeforcesStatsCard
                rank={student.rank}
                maxRank={student.maxRank}
                currentRating={student.currentRating}
                maxRating={student.maxRating}
                contribution={student.contribution}
                lastActive={student.lastActive}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 max-h-fit">
              <PieChartVerdictStats verdictData={student.verdictStats} />
              <SubmissionTrendsChart submissionStats={submissionStats} />
            </div>

            {/* Contest Table */}
            <ContestHistoryTable contests={contests} />

            {/* Activity Timeline */}
            <ActivityTimeline activities={activityTimeline} />
          </>
        )}
      </div>
    </div>
  );
};

export default StudentProfilePage;
