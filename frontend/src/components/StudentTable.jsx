import React, { useEffect, useState } from "react";
import AddStudentModal from "./AddStudentModal";
import {
  fetchAllStudents,
  deleteStudent,
  manualSyncStudent,
} from "../api/studentApi";
import { Eye, Trash2, SquarePen, RefreshCcw, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudentId, setDeletingStudentId] = useState(null);
  const [syncingId, setSyncingId] = useState(null);

  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal(!showModal);
    setEditingStudent(null);
  };

  const downloadCSV = (data) => {
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }

    // Extract headers
    const headers = Object.keys(data[0]).join(",") + "\n";

    // Extract rows
    const rows = data
      .map((row) =>
        Object.values(row)
          .map((val) => `"${String(val).replace(/"/g, '""')}"`) // escape quotes
          .join(",")
      )
      .join("\n");

    const csvContent = headers + rows;

    // Create blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const loadStudents = async () => {
    try {
      const data = await fetchAllStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteStudent(deletingStudentId);
      setDeletingStudentId(null);
      loadStudents();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleSyncStudent = async (id) => {
    try {
      setSyncingId(id);
      const updatedStudent = await manualSyncStudent(id);
      if (updatedStudent) {
        setStudents((prev) =>
          prev.map((stu) => (stu._id === id ? updatedStudent : stu))
        );
      }
      alert("Sync complete!");
      navigate("/");
    } catch (err) {
      console.error("Sync failed:", err);
      alert("Sync failed");
    } finally {
      setSyncingId(null);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="w-full overflow-x-auto bg-white dark:bg-gray-900 shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Students Overview
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last synced: Just now
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            onClick={() => downloadCSV(students)}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download CSV
          </button>

          <button
            onClick={toggleModal}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Student
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm">
            <tr>
              <th className="px-5 py-3">Student</th>
              <th className="px-5 py-3">CF Handle</th>
              <th className="px-5 py-3">Current Rating</th>
              <th className="px-5 py-3">Max Rating</th>
              <th className="px-5 py-3">Last Active</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {students.map((student) => (
              <tr
                key={student._id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <td className="px-5 py-3">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {student.name}
                  </div>
                  <div className="text-sm text-gray-500">{student.email}</div>
                </td>
                <td className="px-5 py-3">
                  <code className="text-white dark:bg-gray-600 px-2 py-1 rounded">
                    {student.codeforcesHandle}
                  </code>
                </td>
                <td className="px-5 py-3 text-green-600 font-semibold">
                  {student.currentRating}
                </td>
                <td className="px-5 py-3 text-blue-600 font-semibold">
                  {student.maxRating}
                </td>
                <td className="px-5 py-3 text-gray-50">
                  {new Date(student.lastActive).toLocaleDateString()}
                </td>
                <td className="px-5 py-3">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Active
                  </span>
                </td>
                <td className="px-5 py-3 flex flex-row space-x-3 text-gray-700 dark:text-gray-300">
                  {/* View Profile */}
                  <span
                    className="relative group cursor-pointer my-auto"
                    onClick={() => navigate(`/student-profile/${student._id}`)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-10 shadow-lg">
                      Student Profile
                    </span>
                  </span>

                  {/* Edit */}
                  <span
                    className="relative group cursor-pointer"
                    onClick={() => {
                      setEditingStudent(student);
                      setShowModal(true);
                    }}
                  >
                    <SquarePen className="h-4 w-4" />
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-10 shadow-lg">
                      Edit
                    </span>
                  </span>

                  {/* Delete */}
                  <span
                    className="relative group cursor-pointer"
                    onClick={() => setDeletingStudentId(student._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-10 shadow-lg">
                      Delete
                    </span>
                  </span>

                  {/* Sync */}
                  <span
                    className="relative group cursor-pointer"
                    onClick={() => handleSyncStudent(student._id)}
                  >
                    {syncingId === student._id ? (
                      <Loader className="h-4 w-4 animate-spin text-blue-500" />
                    ) : (
                      <RefreshCcw className="h-4 w-4 text-blue-500" />
                    )}
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-10 shadow-lg">
                      Sync Data
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {(showModal || editingStudent) && (
        <AddStudentModal
          isOpen={showModal || Boolean(editingStudent)}
          onClose={() => {
            setShowModal(false);
            setEditingStudent(null);
          }}
          onStudentCreated={loadStudents}
          editingStudent={editingStudent}
        />
      )}

      {/* Confirm Delete */}
      {deletingStudentId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this student?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setDeletingStudentId(null)}
                className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
