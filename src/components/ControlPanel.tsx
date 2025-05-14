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
    <div className="flex flex-col items-center gap-1 space-y-2 rounded-md border border-gray-200 bg-gray-50 p-6">
      <div className="flex justify-center space-x-2">
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
