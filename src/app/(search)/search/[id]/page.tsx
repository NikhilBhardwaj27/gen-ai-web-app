import { Metadata } from "next";
import SearchComp from "../../_components/Search";


type Props = {
    params: { id: string };
};
  
export const generateMetadata = ({ params }: Props): Metadata => {
    return {
      title: `Search - ${params.id}`,
    };
};
  

const Search = async(props: Props) => {
  
  return (
    <SearchComp />
  )
};



export default Search;
