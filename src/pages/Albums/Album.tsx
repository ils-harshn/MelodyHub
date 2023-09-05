import { useAlbumsInfiniteQuery } from "../../apis/src/queryHooks";
import { AlbumType } from "../../apis/src/response.types";
import { ImageCard, LoadMoreCard } from "../../components/Cards/Cards";
import { ImageCardContainer } from "../../components/Containers/Containers";
import { TokenContext } from "../../contexts/TokenContext";
import { getClassName } from "../../utils";
import { generateURLFromID } from "../../utils/helpers/urls";
import styles from "./Album.module.css";
import { useContext, Fragment } from "react";

const Album: React.FC = () => {
  const token = useContext(TokenContext);
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useAlbumsInfiniteQuery(token, { text: "", option: "title" }, {});
  return (
    <div className={getClassName(styles["album"])}>
      {!data || !data.pages || data.pages[0].count === 0 ? (
        <h2>Found Nothing</h2>
      ) : (
        <ImageCardContainer title="Albums">
          {data.pages.map((group, index) => (
            <Fragment key={index}>
              {group.results.map((item: AlbumType) => {
                console.log(item);
                return (
                  <ImageCard
                    title={item.title}
                    key={item.id}
                    src={generateURLFromID(item.thumbnail300x300)}
                    optionTitle={`${item.year}`}
                  />
                );
              })}
            </Fragment>
          ))}
          {hasNextPage ? (
            <LoadMoreCard
              isLoading={isFetching || isLoading || isFetchingNextPage}
              isDisabled={isFetching || isLoading || isFetchingNextPage}
              title="Load More Albums"
              onClick={() => fetchNextPage()}
            />
          ) : null}
        </ImageCardContainer>
      )}
    </div>
  );
};

export default Album;
