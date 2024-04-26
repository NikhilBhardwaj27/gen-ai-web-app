"use client";
import {
  libraryResultsAtom,
  searchPrompt,
  searchPromptWithImage,
  searchResultAtom,
  toggleSideNavigation,
} from "@/atoms/atoms";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { runTextAndImagePrompt, runTextPrompt } from "@/utils";
import { useRouter } from "next/navigation";

type Props = {};

const SearchComp = (props: Props) => {
  const [isOpen, setIsOpen] = useAtom(toggleSideNavigation);

  const [searchPromptVal, setSearchPromptVal] = useAtom(searchPrompt);
  const [searchResult, setSearchResult] = useAtom(searchResultAtom);
  const [searchPromptImage, setSearchPromptImage] = useAtom(
    searchPromptWithImage
  );
  const [libraryResultsHome,setLibraryResultsHome] = useAtom(libraryResultsAtom)
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!searchResult.loading && searchResult.data.length == 0) {
        setSearchResult({ ...searchResult, loading: true });
        try {
          let result;
          if (searchPromptImage.files.length > 0) {
            result = await runTextAndImagePrompt(
              searchPromptImage.keyword,
              searchPromptImage.files
            );
          } else {
            result = await runTextPrompt(searchPromptVal);
          }
          
          if(searchPromptVal !== ''){
            let obj = {
              key:searchPromptVal,
              value:result.split('').splice(0,100).join('')
            }
            const resultLocalStorage = JSON.parse(localStorage.getItem('searches') || "[]") ;
            resultLocalStorage.push(obj);
            if(libraryResultsHome.length < 5){
              setLibraryResultsHome(resultLocalStorage)
            }
           
            localStorage.setItem('searches',JSON.stringify(resultLocalStorage))
          }

          setSearchPromptVal("");
          setSearchResult({
            loading: false,
            error: null,
            data: result.split("*"),
          });
        } catch (error: any) {
          setSearchPromptVal("");
          setSearchResult({ loading: false, error: error.message, data: [] });
        }
      }
    };
   
    fetchData();
    
  }, [searchResult]);


  useEffect(()=>{
    if(searchPromptVal == ''){
      router.back()
    }
  },[router])

  const returnFormattedJsx = (d: String, i: any) => {
    if (d.includes(":")) {
      return <b key={i}>{d}</b>;
    }
    return <p key={i}>{d}</p>;
  };
  return (
    <>
      <div
        className={"bg-[#fff] m-2 rounded p-4 overflow-auto h-screen " + (isOpen ? "w-5/6" : "w-full")}
      >
        {searchResult.data && (
          <div className="p-2 text-[#13343b] leading-8	">
            {searchResult.data.map((d, i) => returnFormattedJsx(d, i))}
          </div>
        )}
        {searchResult.loading && <Skeleton count={40} />}
        {searchResult.error && <div>{searchResult.error} </div>}
      </div>
    </>
  );
};

export default SearchComp;
