import React from "react";
import ControlButton from "./ControlButton";
import { useEditContext } from "../context/EditContext";
import { cn } from "../lib/utils";

interface ControlPanelProps {
  startEditing: () => void;
  saveChanges: () => void;
  discardChanges: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  startEditing,
  saveChanges,
  discardChanges
}) => {
  const { isEditing } = useEditContext();
  return (
    <div
      className={cn(
        "space-y-4 rounded-lg border bg-white p-6 shadow-md transition-all duration-300",
        isEditing ? "border-yellow-300 bg-yellow-50" : "border-gray-200"
      )}
    >
      <div className="text-center transition-all duration-500">
        {isEditing ? (
          <div className="animate-fade-in">
            <h3 className="text-lg font-bold text-yellow-800">
              Edit Mode Active
            </h3>
            <p className="text-sm text-yellow-700">
              Drag dogs between kennels or unassign them.
            </p>
          </div>
        ) : (
          <div className="animate-fade-in">
            <h3 className="text-lg font-bold text-gray-800">Kennel Overview</h3>
            <p className="text-sm text-gray-600">
              Click "Edit Board" to rearrange dogs
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4">
        {!isEditing ? (
          <ControlButton
            label="Edit Board"
            onClick={startEditing}
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
              label="Cancel"
              onClick={discardChanges}
              variant="danger"
            />
          </>
        )}
      </div>

      <p
        className={cn(
          "text-center text-xs transition-opacity duration-300",
          isEditing ? "opacity-100" : "h-0 opacity-0"
        )}
      >
        <span className="inline-block rounded bg-yellow-100 px-2 py-1 text-yellow-800">
          Remember to save your changes!
        </span>
      </p>
    </div>
  );
};

export default ControlPanel;
