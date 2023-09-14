import { useParams } from "react-router-dom";
import { usePlaylistSongsInfiniteQuery } from "../../apis/src/queryHooks";
import { Fragment } from "react";
import PlaylistSongsContainerType from "./PlaylistSongs.types";
import { getClassName, isNumeric } from "../../utils";
import NotFound from "../NotFound/NotFound";
import { LoadMoreCard, SongCardLandscape } from "../../components/Cards/Cards";
import { SongType } from "../../apis/src/response.types";
import { PlaylistSongsLandscapeContainer } from "../../components/Containers/Containers";
import styles from "./PlaylistSongs.module.css";
import { getIndexForInfiniteQuery } from "../../apis/src/utils";
import { FullLoader } from "../../components/Loaders/Loaders";
import { useToken } from "../../hooks/TokenHooks";
import { useMusicPlayerPlaylistDispatch } from "../../hooks/MusicPlayerPlaylistHooks";

const SongsContainer: React.FC<PlaylistSongsContainerType> = ({ id, name }) => {
  const { token } = useToken();

  const payload = {
    id: id,
  };
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
    isError,
    refetch,
  } = usePlaylistSongsInfiniteQuery(token, payload, {
    retry: false,
  });

  const dispatchMusicPlayerPlaylistData = useMusicPlayerPlaylistDispatch();
  const handleClickOnSong = (
    song: SongType,
    pageNumber: number,
    index: number
  ) => {
    dispatchMusicPlayerPlaylistData({
      type: "GET_PLAYLIST_SONGS_INFINITE_QUERY",
      payload: {
        index: index,
        pageNumber: pageNumber,
        queryPayload: payload,
        currentSong: song,
      },
    });
  };

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
          {data.pages.map((group, pageNumber) => (
            <Fragment key={pageNumber}>
              {group.results.map((item: SongType, index: number) => (
                <SongCardLandscape
                  onClick={() => handleClickOnSong(item, pageNumber, index)}
                  showingForPlaylistId={id}
                  onRemoveFromPlaylistSuccess={() => refetch()}
                  data={item}
                  key={item.id}
                  index={getIndexForInfiniteQuery(pageNumber, index)}
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
