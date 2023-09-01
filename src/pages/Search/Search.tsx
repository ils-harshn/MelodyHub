import { useContext, useEffect } from "react";
import { getClassName } from "../../utils";
import styles from "./Search.module.css";
import { TokenContext } from "../../contexts/TokenContext";
import { useFilterSongs } from "../../apis/src/queryHooks";
import { FullLoader } from "../../components/Loaders/Loaders";
import SongCardContainer from "../../components/Containers/Containers";
import { SongType } from "../../apis/src/response.types";
import SongCard from "../../components/Cards/Cards";
import { useSearchBoxData } from "../../hooks/SearchBoxHooks";
import { useDebounce } from "@uidotdev/usehooks";

const Search: React.FC = () => {
  const searchBoxData = useSearchBoxData();
  const debouncedSearchBoxData = useDebounce(searchBoxData, 500);
  const token = useContext(TokenContext);
  const { data, isLoading, isFetching } = useFilterSongs(token, {
    page: 1,
    original_name: debouncedSearchBoxData.text,
  });

  if (isLoading) return <FullLoader />;
  return (
    <div className={getClassName(styles["search"])}>
      <SongCardContainer
        title="What you wanna listen?"
        optionTitle={isFetching ? "Reloading" : ""}
      >
        {data.results.map((item: SongType, index: number) => {
          return <SongCard data={item} key={index} />;
        })}
      </SongCardContainer>
    </div>
  );
};

export default Search;
