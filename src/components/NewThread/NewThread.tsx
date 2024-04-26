import { modalOpen } from "@/atoms/atoms";
import { useAtom } from "jotai";
import Modal from "../Modal/Modal";

type Props = {};

const NewThread = (props: Props) => {
  const [openModal, setOpenModal] = useAtom(modalOpen);

  return (
    <>
      <div
        className="bg-white border-2 rounded-full flex justify-between p-2 my-8 cursor-pointer hover:border-green-500"
        onClick={() => setOpenModal(true)}
      >
        <div className="pl-2 text-[#5F5F64] text-lg">New Thread</div>
        <div className="flex justify-between">
          <div className="text-lg mr-2">⌘</div>
          <div className="text-lg">K</div>
        </div>
      </div>
      {openModal && <Modal />}
    </>
  );
};

export default NewThread;
