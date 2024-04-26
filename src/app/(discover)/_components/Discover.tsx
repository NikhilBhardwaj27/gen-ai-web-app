"use client";
import { toggleSideNavigation } from "@/atoms/atoms";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import { PhotoData } from "@/types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {};

const API_KEY = process.env.NEXT_PUBLIC_DISCOVER_API_KEY as string;

const DiscoverComp = (props: Props) => {
  const [isOpen, setIsOpen] = useAtom(toggleSideNavigation);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<PhotoData>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const result = await fetch(
          `https://api.pexels.com/v1/curated?page=${page}`,
          {
            headers: {
              Authorization: API_KEY,
            },
          }
        );
        const res = await result.json();
        setData(res);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setError(error);
      }
    };

    fetchApi();
  }, []);

  const fetchMoreData = async () => {
    try {
      setPage((prevState) => prevState + 1);
      setLoading(true);
      const result = await fetch(
        `https://api.pexels.com/v1/curated?page=${page}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );
      const res = await result.json();

      if (data && res.photos) {
        setData({
          page: res.page,
          per_page: res.per_page,
          total_results: res.total_results,
          photos: data.photos.concat(res.photos),
        });
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  return (
    <div
      className={
        "bg-[#fff] m-2 rounded p-4 " +
        (isOpen ? " w-5/6" : "w-full")
      }
    >
      <h1 className=" text-4xl p-6  border-b bg-[#fff]">
        Discover
      </h1>
      <div className="posts-container w-3/6 m-auto overscroll-none">
        {loading && (
            <Skeleton count={50} />
        )}

        {data && (
          <InfiniteScroll
            dataLength={data.photos.length}
            next={fetchMoreData}
            hasMore={true}
            height="100vh"
            loader={<Skeleton count={5} />}
          >
            {data.photos.map((d, i) => (
              <Posts key={i} photo={d} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default DiscoverComp;
