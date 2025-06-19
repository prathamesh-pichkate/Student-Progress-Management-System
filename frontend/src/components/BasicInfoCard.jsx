import React from "react";

const BasicInfoCard = ({ name, email, phone, registeredAt }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Student Info
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <strong>Name:</strong> <span>{name}</span>
        </div>
        <div>
          <strong>Email:</strong> <span>{email}</span>
        </div>
        <div>
          <strong>Phone:</strong> <span>{phone}</span>
        </div>
        <div>
          <strong>Registered At:</strong>{" "}
          <span>{new Date(registeredAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoCard;
