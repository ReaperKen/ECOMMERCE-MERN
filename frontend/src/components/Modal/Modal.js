import "./Modal.css";
import { AiFillCloseCircle } from "react-icons/ai";

const Modal = ({ children, isOpen, CloseModal }) => {
  const handleModal = (e) => e.stopPropagation();
  return (
    <article className={`modal ${isOpen && "is-open"}`} onClick={CloseModal}>
      <div className="modal-container rounded-2xl" onClick={handleModal}>
        <button
          className="modal-close w-full flex justify-center"
          onClick={CloseModal}
        >
          <AiFillCloseCircle className="text-4xl" />
        </button>
        <div className="w-full h-full flex flex-col items-center justify-between space-y-10">
          {children}
        </div>
      </div>
    </article>
  );
};

export default Modal;
