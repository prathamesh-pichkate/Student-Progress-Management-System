import React, { useState, useEffect } from "react";
import { createStudent, updateStudent } from "../api/studentApi";

const AddStudentModal = ({
  isOpen,
  onClose,
  onStudentCreated,
  editingStudent,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    codeforcesHandle: "",
    permissionToSendEmail: true,
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || "",
        email: editingStudent.email || "",
        phone: editingStudent.phone || "",
        codeforcesHandle: editingStudent.codeforcesHandle || "",
        permissionToSendEmail:
          editingStudent.permissionToSendEmail !== undefined
            ? editingStudent.permissionToSendEmail
            : true,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        codeforcesHandle: "",
        permissionToSendEmail: true,
      });
    }
  }, [editingStudent]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingStudent) {
        await updateStudent(editingStudent._id, formData);
        alert("Student updated successfully");
      } else {
        await createStudent(formData);
        alert("Student created successfully");
      }
      onStudentCreated();
      onClose();
    } catch (err) {
      alert(
        editingStudent ? "Failed to update student" : "Failed to create student"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-white"
          onClick={onClose}
        ></button>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {editingStudent ? "Edit Student" : "Add Student"}
        </h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="mt-1 w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@gmail.com"
              className="mt-1 w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 12345 67890"
              className="mt-1 w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Codeforces Handle
            </label>
            <input
              type="text"
              name="codeforcesHandle"
              value={formData.codeforcesHandle}
              onChange={handleChange}
              placeholder="ex: prathamesh_45"
              className="mt-1 w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div className="flex flex-row justify-between items-center gap-4 mx-auto">
            <div className="flex flex-col m-2">
              <h6 className="text-xl font-bold text-white">
                Email Notification
              </h6>
              <p className="text-sm text-gray-100">
                Receive Email Reminder for inactivity
              </p>
            </div>

            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="permissionToSendEmail"
                  checked={formData.permissionToSendEmail}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
