import { IPhoto } from "@/types";
import Image from "next/image";
import React from "react";
import "react-loading-skeleton/dist/skeleton.css";

const Posts = (props: IPhoto) => {
  const { photo } = props;
  // console.log(photo);
  return (
    <>
      <div className="flex justify-start items-center border-b my-4 p-2 ">
        <Image
          className="rounded-lg flex h-[80px] justify-center items-center"
          alt={photo.alt}
          src={photo.src.medium}
          width={80}
          height={70}
        />
        <div className="right-container flex flex-col p-4">
          <h3 className="text-md">
            <b>Author: {photo.photographer}</b>
          </h3>
          <p className="text-sm">Description: {photo.alt}</p>
          <a target="_blank" href={photo.url} className="text-blue-950">
            Link: {photo.url}
          </a>
        </div>
      </div>
    </>
  );
};

export default Posts;
