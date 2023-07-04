import React from "react";
import EditProfileForm from "./EditProfileForm";

function EditProfileModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 bg-transparentBlack flex justify-center items-center z-[100]"
      onClick={() => onClose()}
    >
      <div
        className="bg-white dark:bg-black border-2 border-solid border-darkGray dark:border-darkerGray rounded-xl overflow-hidden w-[80%] sm:w-[50%] lg:w-[35rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <EditProfileForm onClose={onClose} />
      </div>
    </div>
  );
}

export default EditProfileModal;
