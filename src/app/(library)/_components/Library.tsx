"use client";
import CollectionsSvg from "@/assets/svg/Collections";
import ThreadsSvg from "@/assets/svg/Threads";
import ThreeDotsSvg from "@/assets/svg/ThreeDots";
import { libraryResultsAtom, toggleSideNavigation } from "@/atoms/atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

type Props = {};

const LibraryComp = (props: Props) => {
  const [isOpen, setIsOpen] = useAtom(toggleSideNavigation);
  //const [libraryResults, setLibraryResults] = useAtom(libraryResultsAtom);
  const [libraryResults, setLibraryResults] = useState([]);

  useEffect(() => {
    const resultLocalStorage = JSON.parse(
      localStorage.getItem("searches") || "[]"
    );

    setLibraryResults(resultLocalStorage);
  }, []);

  return (
    <div
      className={"bg-[#fff] m-2 rounded p-4 " + (isOpen ? " w-5/6" : "w-full")}
    >
      <h1 className=" text-4xl p-6  border-b bg-[#fff]">Library</h1>

      <div className="h-screen overflow-auto">
        <div className="flex  w-4/6 justify-around p-4 mt-8 h-14 m-auto  border-b border-[#E8EAE3]">
          <div
            className="thread-header flex items-center"
            style={{ columnGap: "8px" }}
          >
            <ThreadsSvg width={25} height={25} />
            <h1 className="text-2xl">Threads</h1>
          </div>

          <div className="flex " style={{ columnGap: "8px" }}>
            <button className="bg-[#E8EAE3] p-4 flex items-center rounded-md">
              <ThreeDotsSvg width={20} height={20} />
            </button>
            <button className="bg-[#E8EAE3] p-4 flex items-center rounded-md">
              <CollectionsSvg width={20} height={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col w-4/6 justify-around p-4 mt-8 h-14 m-auto ">
          {libraryResults.length > 0 &&
            libraryResults.map((result: any, i: number) => (
              <div key={i} className="border-b border-[#E8EAE3] p-4 pb-4">
                <b>{result.key}</b>
                <div className="text-base">{result.value + "..."}</div>
              </div>
            ))}

            {libraryResults.length == 0 && <div>No Stored Results !!!</div>}
        </div>
      </div>
    </div>
  );
};

export default LibraryComp;
