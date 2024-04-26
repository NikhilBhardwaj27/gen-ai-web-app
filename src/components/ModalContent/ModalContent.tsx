import AttachSvg from "@/assets/svg/Attach";
import FocusSvg from "@/assets/svg/Focus";
import SearchSvg from "@/assets/svg/Search";
import { modalOpen, searchPrompt, searchResultAtom ,searchPromptWithImage} from "@/atoms/atoms";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import FileUploader from "../FileUploader/FileUploader";
import { useState } from "react";

type Props = {};

const ModalContent = (props: Props) => {

  //atoms
  const [searchPromptVal, setSearchPromptVal] = useAtom(searchPrompt);
  const [searchPromptImage,setSearchPromptImage] = useAtom(searchPromptWithImage)
  const [isOpen, setIsOpen] = useAtom(modalOpen);
  const [searchResult, setSearchResult] = useAtom(searchResultAtom);

  const router = useRouter();

  //states
  const [isUploaderVisible,setIsUploaderVisible] = useState(false);
  const [filesState,setFilesState] = useState([]);

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    e.preventDefault();

    if(searchPromptVal == ''){
      return alert("Enter Prompt")
    }
    if (window) {
      localStorage.setItem("searchKeyword", searchPromptVal);
    }
    setSearchResult({ loading: false, data: [], error: null });
    setSearchPromptImage({
      keyword:searchPromptVal,
      files:filesState
    })
    if (isOpen) setIsOpen(false);
    router.push(`/search/${searchPromptVal}`);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event); 
    }
  };


  const handleFileUpload = (f:any) => {
    setFilesState(f)
  }

  return (
    <>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          <textarea
            value={searchPromptVal}
            onChange={(e) => setSearchPromptVal(e.target.value)}
            placeholder="Ask anything..."
            className="w-full outline-none text-[#5F5F64] resize-none overflow-hidden"
            rows={3}
            name="body"
            onKeyDown={handleKeyPress}
          ></textarea>

          <div className="flex justify-between">
            <div className="flex p-2">
              <div className="flex items-center text-[#5F5F64] p-2 text-sm cursor-pointer hover:bg-[#e8e8e3]/50 rounded-full ">
                <FocusSvg width={14} height={14} />
                <div className="ml-2">Focus</div>
              </div>

              <label className="flex items-center text-[#5F5F64] p-2 text-sm cursor-pointer hover:bg-[#e8e8e3]/50 rounded-full " onClick={() => setIsUploaderVisible(true)} >
                <AttachSvg width={14} height={14} />
                <div className="ml-2">Attach</div>
              </label>
            </div>

            <div className="flex cursor-pointer items-center">
              <button type="submit">
                <SearchSvg width={18} height={18} />
              </button>
            </div>
          </div>
        </form>


      {isUploaderVisible && (
        <div className="uploader-container overflow-auto max-h-[500px]">
          <FileUploader
            fileTypes={["image/*"]}
            onUploadComplete={handleFileUpload}
            className="file-upload"
          />
        </div>
      )}
      </div>
    </>
  );
};

export default ModalContent;
