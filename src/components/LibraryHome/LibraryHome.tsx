import React from "react";

type Props = {
  libraryResults: any;
};

const LibraryHome = (props: Props) => {
  const { libraryResults } = props;
  return (
    <>
      {libraryResults.length > 0 && (
        <div className="library-results-container flex flex-col text-[#5F5F64] ml-8 items-start">
          <div className="border-l">
            {libraryResults.map((data: any, index: number) => (
              <div key={index}>
                <p className="p-1 ml-2 cursor-pointer">{data.key}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LibraryHome;
