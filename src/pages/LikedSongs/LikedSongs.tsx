import { Fragment } from "react";
import { getClassName } from "../../utils";
import styles from "./LikedSongs.module.css";
import { useLikedSongsInfiniteQuery } from "../../apis/src/queryHooks";
import { FullLoader } from "../../components/Loaders/Loaders";
import SongCardContainer from "../../components/Containers/Containers";
import { SongType } from "../../apis/src/response.types";
import SongCard, { LoadMoreCard } from "../../components/Cards/Cards";
import { useToken } from "../../hooks/TokenHooks";
import { useMusicPlayerPlaylistDispatch } from "../../hooks/MusicPlayerPlaylistHooks";

const LikedSongs: React.FC = () => {
  const { token } = useToken();
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useLikedSongsInfiniteQuery(token, {});

  const dispatchMusicPlayerPlaylistData = useMusicPlayerPlaylistDispatch();

  const handlePlayAll = (song: SongType, pageNumber: number, index: number) => {
    dispatchMusicPlayerPlaylistData({
      type: "GET_LIKED_SONGS",
      payload: {
        index: index,
        pageNumber: pageNumber,
        queryPayload: {},
        currentSong: song,
      },
    });
  };

  const handleClickOnSong = (song: SongType) => {
    dispatchMusicPlayerPlaylistData({
      type: "SET_SINGLE_SONG_ACTION",
      payload: {
        currentSong: song,
      },
    });
  };

  if (isLoading) return <FullLoader />;
  return (
    <div className={getClassName(styles["liked-songs"])}>
      {!data || !data.pages || data.pages[0].count === 0 ? (
        <h2>Found Nothing</h2>
      ) : (
        <SongCardContainer
          title="Liked Songs"
          optionTitle="Play All"
          onClick={() => handlePlayAll(data.pages[0].results[0], 0, 0)}
        >
          {data.pages.map((group, pageNumber) => (
            <Fragment key={pageNumber}>
              {group.results.map((item: SongType) => (
                <SongCard
                  data={item}
                  key={item.id}
                  onClick={() => handleClickOnSong(item)}
                />
              ))}
            </Fragment>
          ))}

          {hasNextPage ? (
            <LoadMoreCard
              isLoading={isFetching || isLoading || isFetchingNextPage}
              isDisabled={isFetching || isLoading || isFetchingNextPage}
              title="Load More Songs"
              onClick={() => fetchNextPage()}
            />
          ) : null}
        </SongCardContainer>
      )}
    </div>
  );
};

export default LikedSongs;
