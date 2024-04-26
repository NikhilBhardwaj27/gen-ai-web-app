import DiscoverSvg from "@/assets/svg/Discover";
import HomeSvg from "@/assets/svg/Home";
import LibrarySvg from "@/assets/svg/Library";
import PlusSvg from "@/assets/svg/Plus";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CollapsableIconExpand from "../../../assets/svg/collapsable-icons-expand.svg";
import logo from "../../../assets/svg/logo.svg";
import { useAtom } from "jotai";
import { modalOpen, toggleSideNavigation } from "@/atoms/atoms";
import { useSession, signIn, signOut } from "next-auth/react";

type Props = {};

const ClosedBar = (props: Props) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useAtom(toggleSideNavigation);
  const [openModal, setOpenModal] = useAtom(modalOpen);
  const { data: session } = useSession();

  return (
    <>
      <div
        className={`justify-between flex flex-col ${
          isOpen ? "w-0" : " w-[100px] p-4"
        }`}
      >
        <div>
          <Image
            src={logo}
            width={48}
            height={48}
            alt="Loading logo.."
            className="p-2 mb-4"
          />

          <button className="flex items-center p-4 mb-4">
            <PlusSvg width={25} height={25} onClick={() => setOpenModal(true)} />
          </button>

          <Link
            href="/"
            className="flex items-center leading-none justify-left w-full p-4 gap-4 cursor-pointer hover:bg-[#E8EAE3] mb-4"
          >
            <HomeSvg
              width={18}
              height={18}
              className={
                "cursor-pointer " + (pathname == "/" ? "" : "text-[#5F5F64]")
              }
            />
          </Link>

          <Link
            href="/discover"
            className="flex items-center leading-none justify-left w-full p-4 gap-4 cursor-pointer hover:bg-[#E8EAE3] mb-4"
          >
            <DiscoverSvg
              width={18}
              height={18}
              className={
                "cursor-pointer " +
                (pathname == "/discover" ? "" : "text-[#5F5F64]")
              }
            />
          </Link>

          <Link
            href="/library"
            className="flex items-center leading-none justify-left w-full p-4 gap-4 cursor-pointer hover:bg-[#E8EAE3] mb-4"
          >
            <LibrarySvg
              width={18}
              height={18}
              className={
                "cursor-pointer " +
                (pathname == "/library" ? "" : "text-[#5F5F64]")
              }
            />
          </Link>
        </div>

        <div className={`fixed bottom-8 flex justify-center left-0  ${isOpen ? "hidden" : "w-[100px] p-4"}`}>
          <Image
            src={CollapsableIconExpand}
            alt="Loading.."
            className="cursor-pointer"
            width={22}
            height={22}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
          {/* Authentication */}
          {!isOpen && (
            <div>
              {session && session.user ? (
                <div className="w-[100px]  fixed bottom-20 left-0 cursor-pointer">
                  <div className=" justify-center flex p-2 hover:bg-[#E8EAE3]">
                    <Image
                      alt="avatar"
                      width={30}
                      height={20}
                      className="rounded mr-5"
                      src={session.user.image as string}
                    />
                  </div>
                  <button
                    className="m-auto w-full hover:bg-[#E8EAE3]"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="w-[100px] fixed bottom-20 left-0 ">
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
        
      </div>
    </>
  );
};

export default ClosedBar;
