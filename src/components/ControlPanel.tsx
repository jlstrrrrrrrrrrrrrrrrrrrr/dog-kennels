import React, { useState } from "react";

interface ControlPanelProps {}

const ControlPanel: React.FC<ControlPanelProps> = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEditingState = () => {
    setIsEditing((prevState) => !prevState);
  };

  const saveChanges = () => {
    setIsEditing(false);
  };

  const cancelChanges = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-50 p-3 rounded-md mt-2 border border-gray-200 flex gap-1 flex-col items-center space-y-2">
      <p className="text-sm text-gray-700 font-medium">Board Control</p>
      <div className="flex space-x-2 justify-center">
        {!isEditing ? (
          <button
            onClick={toggleEditingState}
            className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-150"
          >
            Edit Board
          </button>
        ) : (
          <>
            <button
              onClick={saveChanges}
              className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-colors duration-150"
            >
              Save Changes
            </button>
            <button
              onClick={cancelChanges}
              className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors duration-150"
            >
              Cancel Edits
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
