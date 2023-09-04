import { useContext, Fragment } from "react";
import { getClassName } from "../../utils";
import styles from "./Search.module.css";
import { TokenContext } from "../../contexts/TokenContext";
import { useFilterSongsInfiniteQuery } from "../../apis/src/queryHooks";
import { FullLoader } from "../../components/Loaders/Loaders";
import SongCardContainer from "../../components/Containers/Containers";
import { SongType } from "../../apis/src/response.types";
import SongCard from "../../components/Cards/Cards";
import { useSearchBoxData } from "../../hooks/SearchBoxHooks";
import { useDebounce } from "@uidotdev/usehooks";
import { getPageNumberFromBEUrl } from "../../apis/src/utils";

const Search: React.FC = () => {
  const searchBoxData = useSearchBoxData();
  const debouncedSearchBoxData = useDebounce(searchBoxData, 500);
  const token = useContext(TokenContext);
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useFilterSongsInfiniteQuery(
      token,
      {
        text: debouncedSearchBoxData.text,
        option: debouncedSearchBoxData.option,
      },
      {
        getNextPageParam: (lastpage: any) => {
          return lastpage.next && lastpage.count
            ? getPageNumberFromBEUrl(lastpage.next)
            : undefined;
        },
      }
    );

  if (isLoading) return <FullLoader />;
  return (
    <div className={getClassName(styles["search"])}>
      {!data || !data.pages || data.pages[0].count === 0 ? (
        <h2>Found Nothing</h2>
      ) : (
        <SongCardContainer title="What you wanna listen?">
          {data.pages.map((group, index) => (
            <Fragment key={index}>
              {group.results.map((item: SongType) => (
                <SongCard data={item} key={item.id} />
              ))}
            </Fragment>
          ))}
        </SongCardContainer>
      )}
    </div>
  );
};

export default Search;
