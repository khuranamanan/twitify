import { useDispatch, useSelector } from "react-redux";
import CreateEditPost from "./CreateEditPost";
import { closePostModal } from "../../redux/slices/modalsSlice";

function PostModal() {
  const { postModal } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  return (
    postModal && (
      <div
        className="fixed inset-0 bg-transparentBlack flex justify-center items-center z-[100]"
        onClick={() => dispatch(closePostModal())}
      >
        <div
          className="bg-white dark:bg-black border-2 border-solid border-darkGray dark:border-darkerGray rounded-xl w-[80%] sm:w-[50%] lg:w-[35rem]"
          onClick={(e) => e.stopPropagation()}
        >
          <CreateEditPost fromModal />
        </div>
      </div>
    )
  );
}

export default PostModal;
