import { useParams } from "react-router-dom";
import { usePlaylistSongsInfiniteQuery } from "../../apis/src/queryHooks";
import { useContext, Fragment } from "react";
import { TokenContext } from "../../contexts/TokenContext";
import PlaylistSongsContainerType from "./PlaylistSongs.types";
import { getClassName, isNumeric } from "../../utils";
import NotFound from "../NotFound/NotFound";
import { LoadMoreCard, SongCardLandscape } from "../../components/Cards/Cards";
import { SongType } from "../../apis/src/response.types";
import { PlaylistSongsLandscapeContainer } from "../../components/Containers/Containers";
import styles from "./PlaylistSongs.module.css";
import { getIndexForInfiniteQuery } from "../../apis/src/utils";
import { FullLoader } from "../../components/Loaders/Loaders";

const SongsContainer: React.FC<PlaylistSongsContainerType> = ({ id, name }) => {
  const token = useContext(TokenContext);
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
    isError,
    refetch,
  } = usePlaylistSongsInfiniteQuery(
    token,
    {
      id: id,
    },
    {
      retry: false,
    }
  );

  if (isError) return <NotFound />;
  if (isLoading) return <FullLoader />;
  return (
    <div className={getClassName(styles["playlist-songs"])}>
      {!data || !data.pages || data.pages[0].count === 0 ? (
        <h2>Found Nothing</h2>
      ) : (
        <PlaylistSongsLandscapeContainer
          title={`${name} [${data.pages[0].count}]`}
          optionTitle={isFetching ? "Please Wait" : "Play All"}
        >
          {data.pages.map((group, index) => (
            <Fragment key={index}>
              {group.results.map((item: SongType, i: number) => (
                <SongCardLandscape
                  showingForPlaylistId={id}
                  onRemoveFromPlaylistSuccess={() => refetch()}
                  data={item}
                  key={item.id}
                  index={getIndexForInfiniteQuery(index, i)}
                />
              ))}
            </Fragment>
          ))}

          {hasNextPage ? (
            <LoadMoreCard
              varient="secondary"
              isLoading={isFetching || isLoading || isFetchingNextPage}
              isDisabled={isFetching || isLoading || isFetchingNextPage}
              title="Load More Songs"
              onClick={() => fetchNextPage()}
            />
          ) : null}
        </PlaylistSongsLandscapeContainer>
      )}
    </div>
  );
};

const PlaylistSongs: React.FC = () => {
  const { name, id } = useParams();
  if (name === undefined || id === undefined || !isNumeric(id))
    return <NotFound />;
  return <SongsContainer id={parseInt(id)} name={name} />;
};

export default PlaylistSongs;
