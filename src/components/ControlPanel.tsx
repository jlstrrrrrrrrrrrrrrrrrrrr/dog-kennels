import React, { useState } from "react";
import ControlButton from "./ControlButton";

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
          <ControlButton
            label="Edit Board"
            onClick={toggleEditingState}
            variant="primary"
          />
        ) : (
          <>
            <ControlButton
              label="Save Changes"
              onClick={saveChanges}
              variant="success"
            />
            <ControlButton
              label=" Cancel Edits"
              onClick={cancelChanges}
              variant="danger"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
