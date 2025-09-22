import React from "react";

export default function LegalSupportModal({ label, content, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-2">{label}</h3>
        <p className="mb-4 text-gray-700 dark:text-gray-300">{content}</p>
        <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}