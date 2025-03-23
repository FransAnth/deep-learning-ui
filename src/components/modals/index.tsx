import { createPortal } from "react-dom";
import { IModal } from "../../interface/modals/modal-model";
import { CircleXIcon } from "lucide-react";
import { useEffect } from "react";

const Modal = (props: IModal) => {
  function escHandler({ key }: any) {
    if (key === "Escape") {
      props.closeModalAction(false);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", escHandler);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", escHandler);
      }
    };
  }, []);

  return createPortal(
    <div
      className={`fixed inset-0 z-30 flex pt-40 justify-center bg-gray-500/50
      transition-opacity duration-300 ease-in-out 
      ${props.isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <div
        className={`flex flex-col bg-white h-fit min-h-56 rounded-lg 
        transform transition-all duration-300 ease-in-out 
        ${props.isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"} ${
          props.className
        }`}
      >
        <div className="flex flex-row justify-between p-2 bg-primary rounded-t-lg text-white">
          <span>{props.title}</span>
          <button
            className="cursor-pointer"
            onClick={() => props.closeModalAction(false)}
          >
            <CircleXIcon />
          </button>
        </div>
        <div className="p-2">{props.children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
