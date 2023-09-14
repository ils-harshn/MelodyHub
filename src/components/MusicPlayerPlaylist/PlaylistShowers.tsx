import {
  useAlbumSongsInfiniteQuery,
  useArtistSongsInfiniteQuery,
  useFilterSongsInfiniteQuery,
  usePlaylistSongsInfiniteQuery,
} from "../../apis/src/queryHooks";
import { useToken } from "../../hooks/TokenHooks";
import { getClassName } from "../../utils";
import { FullLoader } from "../Loaders/Loaders";
import {
  AlbumSongsListType,
  ArtistSongsListType,
  FilteredSongsListType,
  PlaylistSongsListType,
} from "./PlaylistShowers.types";
import styles from "./MusicPlayerPlaylist.module.css";
import { PlaylistSongsLandscapeContainer } from "../Containers/Containers";
import { Fragment, useEffect } from "react";
import { SongType } from "../../apis/src/response.types";
import { LoadMoreCard, SongCardLandscape } from "../Cards/Cards";
import {
  getIndexForInfiniteQuery,
  getPagenumberAndIndexForInfiniteQuery,
} from "../../apis/src/utils";
import { useMusicPlayerPlaylistDispatch } from "../../hooks/MusicPlayerPlaylistHooks";
import {
  MUSIC_PLAYER_ID,
  MUSIC_PLAYER_NEXT_BUTTON_ID,
  MUSIC_PLAYER_PREV_BUTTON_ID,
} from "../../consts/ids";
import { useMusicPlayerRandomAndRepeatData } from "../../hooks/MusicPlayerRandomAndRepeat";
import { useMusicPlayerDispatch } from "../../hooks/MusicPlayerHooks";

export const FilteredSongsList: React.FC<FilteredSongsListType> = ({
  index,
  pageNumber,
  payload,
}) => {
  const { token } = useToken();
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useFilterSongsInfiniteQuery(
    token,
    {
      text: payload.text,
      option: payload.option,
    },
    {
      enabled: false,
    }
  );

  const randomAndRepeatState = useMusicPlayerRandomAndRepeatData();
  const musicPlayDispatch = useMusicPlayerDispatch();

  const dispatchMusicPlayerPlaylistData = useMusicPlayerPlaylistDispatch();

  const handleClickOnSong = (
    song: SongType,
    pageNumber: number,
    index: number
  ) => {
    dispatchMusicPlayerPlaylistData({
      type: "FILTERED_SONGS_INFINITE_QUERY",
      payload: {
        index: index,
        pageNumber: pageNumber,
        queryPayload: payload,
        currentSong: song,
      },
    });
  };

  const handleNext = () => {
    if (data) {
      const totalFetchedYet = data.pages.reduce(
        (total, data) => data.results.length + total,
        0
      );

      const currentIndex = getIndexForInfiniteQuery(
        pageNumber,
        index,
        data.pages[0].results.length,
        0
      );
      const { pageNumber: newPageNumber, index: newIndex } =
        getPagenumberAndIndexForInfiniteQuery(
          currentIndex + 1,
          data.pages[0].results.length
        );

      if (randomAndRepeatState.index === 0) {
        if (
          getIndexForInfiniteQuery(newPageNumber, newIndex) > totalFetchedYet
        ) {
          musicPlayDispatch({
            type: "TOGGLE_PLAYING",
            payload: { playing: false },
          });
        } else {
          dispatchMusicPlayerPlaylistData({
            type: "FILTERED_SONGS_INFINITE_QUERY",
            payload: {
              pageNumber: newPageNumber,
              index: newIndex,
              queryPayload: payload,
              currentSong: data.pages[newPageNumber].results[newIndex],
            },
          });
        }
      } else if (randomAndRepeatState.index === 1) {
        if (
          getIndexForInfiniteQuery(newPageNumber, newIndex) > totalFetchedYet
        ) {
          dispatchMusicPlayerPlaylistData({
            type: "FILTERED_SONGS_INFINITE_QUERY",
            payload: {
              pageNumber: 0,
              index: 0,
              queryPayload: payload,
              currentSong: data.pages[0].results[0],
            },
          });
        } else {
          dispatchMusicPlayerPlaylistData({
            type: "FILTERED_SONGS_INFINITE_QUERY",
            payload: {
              pageNumber: newPageNumber,
              index: newIndex,
              queryPayload: payload,
              currentSong: data.pages[newPageNumber].results[newIndex],
            },
          });
        }
      } else if (randomAndRepeatState.index === 2) {
        dispatchMusicPlayerPlaylistData({
          type: "FILTERED_SONGS_INFINITE_QUERY",
          payload: {
            pageNumber: pageNumber,
            index: index,
            queryPayload: payload,
            currentSong: data.pages[pageNumber].results[index],
          },
        });
        const audioElement = document.getElementById(
          MUSIC_PLAYER_ID
        ) as HTMLAudioElement;
        audioElement.currentTime = 0;
      } else {
        const { pageNumber: randomPageNumber, index: randomIndex } =
          getPagenumberAndIndexForInfiniteQuery(
            Math.floor(Math.random() * totalFetchedYet),
            data.pages[0].results.length
          );
        dispatchMusicPlayerPlaylistData({
          type: "FILTERED_SONGS_INFINITE_QUERY",
          payload: {
            pageNumber: randomPageNumber,
            index: randomIndex,
            queryPayload: payload,
            currentSong: data.pages[randomPageNumber].results[randomIndex],
          },
        });
      }
    }
  };

  const handlePrev = () => {
    if (data) {
      const currentIndex = getIndexForInfiniteQuery(
        pageNumber,
        index,
        data.pages[0].results.length,
        0
      );
      const { pageNumber: newPageNumber, index: newIndex } =
        getPagenumberAndIndexForInfiniteQuery(
          currentIndex - 1,
          data.pages[0].results.length
        );
      if (newPageNumber >= 0 && newIndex >= 0) {
        dispatchMusicPlayerPlaylistData({
          type: "FILTERED_SONGS_INFINITE_QUERY",
          payload: {
            pageNumber: newPageNumber,
            index: newIndex,
            queryPayload: payload,
            currentSong: data.pages[newPageNumber].results[newIndex],
          },
        });
      }
    }
  };

  useEffect(() => {
    const nextButtonElement = document.getElementById(
      MUSIC_PLAYER_NEXT_BUTTON_ID
    ) as HTMLDivElement;
    if (nextButtonElement) {
      nextButtonElement.addEventListener("click", handleNext);
      return () => {
        nextButtonElement.removeEventListener("click", handleNext);
      };
    }
  }, [index, pageNumber, randomAndRepeatState]);

  // handle audio end event
  useEffect(() => {
    const audioElement = document.getElementById(
      MUSIC_PLAYER_ID
    ) as HTMLAudioElement;

    const handleAudioEnd = () => {
      handleNext();
    };

    if (audioElement) {
      audioElement.addEventListener("ended", handleAudioEnd);
      return () => {
        audioElement.removeEventListener("ended", handleAudioEnd);
      };
    }
  }, [index, pageNumber, randomAndRepeatState]);

  useEffect(() => {
    const prevButtonElement = document.getElementById(
      MUSIC_PLAYER_PREV_BUTTON_ID
    ) as HTMLDivElement;
    if (prevButtonElement) {
      prevButtonElement.addEventListener("click", handlePrev);
      return () => {
        prevButtonElement.removeEventListener("click", handlePrev);
      };
    }
  }, [index, pageNumber]);

  if (isLoading) return <FullLoader />;
  return (
    <div className={getClassName(styles["search"])}>
      {!data || !data.pages || data.pages[0].count === 0 ? (
        <h2>Error</h2>
      ) : (
        <PlaylistSongsLandscapeContainer
          title={`Searched Playlist: ${payload.text} by (${payload.option})`}
        >
          {data.pages.map((group, pageNumber) => (
            <Fragment key={pageNumber}>
              {group.results.map((item: SongType, index: number) => (
                <SongCardLandscape
                  showOptions={false}
                  index={getIndexForInfiniteQuery(pageNumber, index)}
                  data={item}
                  key={item.id}
                  onClick={() => handleClickOnSong(item, pageNumber, index)}
                />
              ))}
            </Fragment>
          ))}

          {hasNextPage ? (
            <LoadMoreCard
              isLoading={isFetching || isLoading || isFetchingNextPage}
              isDisabled={isFetching || isLoading || isFetchingNextPage}
              title="Load More Songs"
              varient="secondary"
              onClick={() => fetchNextPage()}
            />
          ) : null}
        </PlaylistSongsLandscapeContainer>
      )}
    </div>
  );
};

export const PlaylistSongsList: React.FC<PlaylistSongsListType> = ({
  index,
  pageNumber,
  payload,
}) => {
  const { token } = useToken();
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = usePlaylistSongsInfiniteQuery(token, {
    id: payload.id,
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

  if (isLoading) return <FullLoader />;
  return (
    <div className={getClassName(styles["search"])}>
      {!data || !data.pages || data.pages[0].count === 0 ? (
        <h2>Error</h2>
      ) : (
        <PlaylistSongsLandscapeContainer title={``}>
          {data.pages.map((group, pageNumber) => (
            <Fragment key={pageNumber}>
              {group.results.map((item: SongType, index: number) => (
                <SongCardLandscape
                  showOptions={false}
                  index={getIndexForInfiniteQuery(pageNumber, index)}
                  data={item}
                  key={item.id}
                  onClick={() => handleClickOnSong(item, pageNumber, index)}
                />
              ))}
            </Fragment>
          ))}

          {hasNextPage ? (
            <LoadMoreCard
              isLoading={isFetching || isLoading || isFetchingNextPage}
              isDisabled={isFetching || isLoading || isFetchingNextPage}
              title="Load More Songs"
              varient="secondary"
              onClick={() => fetchNextPage()}
            />
          ) : null}
        </PlaylistSongsLandscapeContainer>
      )}
    </div>
  );
};

export const AlbumSongsList: React.FC<AlbumSongsListType> = ({
  index,
  pageNumber,
  payload,
}) => {
  const { token } = useToken();
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useAlbumSongsInfiniteQuery(token, {
    id: payload.id,
  });

  const dispatchMusicPlayerPlaylistData = useMusicPlayerPlaylistDispatch();

  const handleClickOnSong = (
    song: SongType,
    pageNumber: number,
    index: number
  ) => {
    dispatchMusicPlayerPlaylistData({
      type: "GET_ALBUM_SONGS_INFINITE_QUERY",
      payload: {
        index: index,
        pageNumber: pageNumber,
        queryPayload: payload,
        currentSong: song,
      },
    });
  };

  if (isLoading) return <FullLoader />;
  return (
    <div className={getClassName(styles["search"])}>
      {!data || !data.pages || data.pages[0].count === 0 ? (
        <h2>Error</h2>
      ) : (
        <PlaylistSongsLandscapeContainer title={``}>
          {data.pages.map((group, pageNumber) => (
            <Fragment key={pageNumber}>
              {group.results.map((item: SongType, index: number) => (
                <SongCardLandscape
                  showOptions={false}
                  index={getIndexForInfiniteQuery(pageNumber, index)}
                  data={item}
                  key={item.id}
                  onClick={() => handleClickOnSong(item, pageNumber, index)}
                />
              ))}
            </Fragment>
          ))}

          {hasNextPage ? (
            <LoadMoreCard
              isLoading={isFetching || isLoading || isFetchingNextPage}
              isDisabled={isFetching || isLoading || isFetchingNextPage}
              title="Load More Songs"
              varient="secondary"
              onClick={() => fetchNextPage()}
            />
          ) : null}
        </PlaylistSongsLandscapeContainer>
      )}
    </div>
  );
};

export const ArtistSongsList: React.FC<ArtistSongsListType> = ({
  index,
  pageNumber,
  payload,
}) => {
  const { token } = useToken();
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useArtistSongsInfiniteQuery(token, {
    id: payload.id,
  });

  const dispatchMusicPlayerPlaylistData = useMusicPlayerPlaylistDispatch();

  const handleClickOnSong = (
    song: SongType,
    pageNumber: number,
    index: number
  ) => {
    dispatchMusicPlayerPlaylistData({
      type: "GET_ARTIST_SONGS_INFINITE_QUERY",
      payload: {
        index: index,
        pageNumber: pageNumber,
        queryPayload: payload,
        currentSong: song,
      },
    });
  };

  if (isLoading) return <FullLoader />;
  return (
    <div className={getClassName(styles["search"])}>
      {!data || !data.pages || data.pages[0].count === 0 ? (
        <h2>Error</h2>
      ) : (
        <PlaylistSongsLandscapeContainer title={``}>
          {data.pages.map((group, pageNumber) => (
            <Fragment key={pageNumber}>
              {group.results.map((item: SongType, index: number) => (
                <SongCardLandscape
                  showOptions={false}
                  index={getIndexForInfiniteQuery(pageNumber, index)}
                  data={item}
                  key={item.id}
                  onClick={() => handleClickOnSong(item, pageNumber, index)}
                />
              ))}
            </Fragment>
          ))}

          {hasNextPage ? (
            <LoadMoreCard
              isLoading={isFetching || isLoading || isFetchingNextPage}
              isDisabled={isFetching || isLoading || isFetchingNextPage}
              title="Load More Songs"
              varient="secondary"
              onClick={() => fetchNextPage()}
            />
          ) : null}
        </PlaylistSongsLandscapeContainer>
      )}
    </div>
  );
};
