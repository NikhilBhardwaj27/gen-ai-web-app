"use client";
import { toggleSideNavigation } from "@/atoms/atoms";
import ModalContent from "@/components/ModalContent/ModalContent";
import { useAtom } from "jotai";

export default function Home() {
  const [isOpen, setIsOpen] = useAtom(toggleSideNavigation);

  return (
    <>
      <div
        className={"bg-[#fff] m-2 rounded p-4 " + (isOpen ? "w-5/6" : "w-full")}
      >
        <div className="flex  flex-col justify-center items-center h-full">
          <h1 className="text-4xl text-[#13343b] mb-4">
            Where Knowledge Begins
          </h1>

          <div className=" relative p-4 rounded-lg w-[90vw]  max-w-screen-md">
            <div className="bg-white pt-4 pl-4 pr-4  border-2 rounded-lg ">
              <ModalContent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
