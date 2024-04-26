import { modalOpen } from "@/atoms/atoms";
import { useAtom } from "jotai";
import ReactDOM from "react-dom";
import ModalContent from "../ModalContent/ModalContent";

type Props = {};

const Modal = (props: Props) => {
  const [openModal, setOpenModal] = useAtom(modalOpen);

  const handleModal = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
        e.stopPropagation(); // Prevent propagation if clicked on the overlay div
        setOpenModal(false)
      }
   
  }
  return ReactDOM.createPortal(
    <>
      {openModal && (
        <div
          className="fixed top-0 left-0 bottom-0 right-0 z-30 w-full flex justify-center items-center bg-black/75"
          onClick={handleModal}
        >
          <div className=" relative p-4 rounded-lg w-[90vw] bg-[#EEF3F3] max-w-screen-md">
            <div className="bg-white p-4 border-2 rounded-lg">
              <ModalContent />
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default Modal;
