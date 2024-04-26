import DiscoverSvg from "@/assets/svg/Discover";
import HomeSvg from "@/assets/svg/Home";
import LibrarySvg from "@/assets/svg/Library";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { libraryResultsAtom, toggleSideNavigation } from "@/atoms/atoms";
import { useAtom } from "jotai";
import LibraryHome from "@/components/LibraryHome/LibraryHome";

type Props = {};

const OpenedBar = (props: Props) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useAtom(toggleSideNavigation);
  const [libraryResults, setLibraryResults] = useAtom(libraryResultsAtom);

  useEffect(() => {
    const resultLocalStorage = JSON.parse(
      localStorage.getItem("searches") || "[]"
    );
   
    setLibraryResults(resultLocalStorage.splice(0,5));
  }, []);

  return (
    <>
      {/* Home Section */}
      <Link
        href="/"
        className="flex items-center mb-4 justify-left w-full p-4 gap-4 cursor-pointer hover:bg-[#E8EAE3]"
      >
        <HomeSvg
          width={18}
          height={18}
          className={
            "cursor-pointer " + (pathname == "/" ? "" : "text-[#5F5F64]")
          }
        />
        <div
          className={"font-bold " + (pathname == "/" ? "" : "text-[#5F5F64]")}
        >
          Home
        </div>
      </Link>

      {/* Discover Section */}
      <Link
        href="/discover"
        className="flex items-center mb-4 justify-left  w-full p-4 gap-4 cursor-pointer hover:bg-[#E8EAE3]"
      >
        <DiscoverSvg
          width={18}
          height={18}
          className={
            "cursor-pointer " +
            (pathname == "/discover" ? "" : "text-[#5F5F64]")
          }
        />
        <div
          className={
            "font-bold " + (pathname == "/discover" ? "" : "text-[#5F5F64]")
          }
        >
          Discover
        </div>
      </Link>

      {/* Library Section */}
      <Link
        href="/library"
        className="flex items-center mb-4 justify-left w-full p-4 gap-4 cursor-pointer hover:bg-[#E8EAE3]"
      >
        <LibrarySvg
          width={18}
          height={18}
          className={
            "cursor-pointer " + (pathname == "/library" ? "" : "text-[#5F5F64]")
          }
        />

        <div
          className={
            "font-bold " + (pathname == "/library" ? "" : "text-[#5F5F64]")
          }
        >
          Library
        </div>
      </Link>

      <LibraryHome libraryResults={libraryResults} />

      {/* Authentication */}
      {isOpen && (
        <div>
          {session && session.user ? (
            <div className="w-1/6  fixed bottom-5 left-0 cursor-pointer">
              <div className=" justify-center flex p-2 hover:bg-[#E8EAE3]">
                <Image
                  alt="avatar"
                  width={30}
                  height={20}
                  className="rounded mr-5"
                  src={session.user.image as string}
                />
                <b>{session.user.name}</b>
              </div>
              <button
                className="m-auto w-full hover:bg-[#E8EAE3]"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="w-1/6 fixed bottom-5 left-0 ">
              <button
                className="m-auto cursor-pointer p-2 w-full hover:bg-[#E8EAE3]"
                onClick={() => signIn()}
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OpenedBar;
