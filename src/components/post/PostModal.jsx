import { useDispatch, useSelector } from "react-redux";
import CreateEditPost from "./CreateEditPost";
import { closePostModal } from "../../redux/slices/modalsSlice";

function PostModal() {
  const { postModal } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  return (
    <div
      className={`fixed inset-0 bg-transparentBlack ${
        postModal ? "flex" : "hidden"
      } justify-center items-center`}
      onClick={() => dispatch(closePostModal())}
    >
      <div className="bg-black border-2 border-solid border-darkerGray rounded-xl overflow-hidden sm:w-[50%] lg:w-[35rem]" onClick={(e) => e.stopPropagation()}>
        <CreateEditPost fromModal />
      </div>
    </div>
  );
}

export default PostModal;
