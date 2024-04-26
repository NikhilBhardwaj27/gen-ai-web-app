"use client";
import Image from "next/image";
import CollapsableIcon from "../../assets/svg/collapsable-icon.svg";
import { useAtom } from "jotai";
import NewThread from "../NewThread/NewThread";
import { toggleSideNavigation } from "../../atoms/atoms";
import ClosedBar from "./closedBar/ClosedBar";
import OpenedBar from "./openedBar/OpenedBar";


type Props = {};

const SideNavigation = (props: Props) => {
  const [isOpen, setIsOpen] = useAtom(toggleSideNavigation);

  return (
    <>
      <div
        className={` transition-all ease-in-out duration-300 ${
          isOpen ? "w-1/6 p-4 " : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex justify-between my-4">
          <h1 className="font-bold p-2">PGD - Knowledge Base</h1>
          <Image
            className="cursor-pointer"
            src={CollapsableIcon}
            alt="Loading.."
            width={22}
            height={22}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        <NewThread />
        <OpenedBar />
      </div>
      <ClosedBar />
    </>
  );
};

export default SideNavigation;
