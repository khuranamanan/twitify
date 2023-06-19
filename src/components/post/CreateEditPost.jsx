import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../ProfileImage";
import { createUserPost } from "../../redux/slices/postsSlice";

function CreateEditPost() {
  const { user, token } = useSelector((state) => state.auth);
  const [newPost, setNewPost] = useState({ content: "" });
  const dispatch = useDispatch();

  function handleInputChange(event) {
    const inputContent = event.target.value;
    setNewPost({ ...newPost, content: inputContent });
  }

  const characterCount = newPost.content.length;
  const isOverCharacterLimit = characterCount > 240;

  function handlePostBtnClick() {
    dispatch(createUserPost({ post: { ...newPost }, token }));
    setNewPost({ ...newPost, content: "" });
  }

  return (
    <div className="flex flex-col gap-2 p-4 border-y border-solid border-darkerGray">
      <div className="flex gap-2">
        <ProfileImage
          userImage={user.profileImg}
          userFirstName={user.userFirstName}
        />
        <textarea
          className="flex-grow py-2 px-3 focus:outline-none text-white bg-inherit h-24 border-none resize-none"
          placeholder="What's happening?!"
          value={newPost.content}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-end gap-4 items-center">
        {newPost.content.length !== 0 && (
          <div className={`text-xs ${isOverCharacterLimit ? "text-red" : ""}`}>
            {characterCount}/240
          </div>
        )}
        <button
          className="text-white px-4 py-2 rounded-full bg-cyan disabled:opacity-50 disabled:cursor-not-allowed font-medium hover:bg-aqua"
          disabled={isOverCharacterLimit || newPost.content.trim().length === 0}
          onClick={handlePostBtnClick}
        >
          Twit
        </button>
      </div>
    </div>
  );
}

export default CreateEditPost;
