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
import { Fragment } from "react";
import { SongType } from "../../apis/src/response.types";
import { LoadMoreCard, SongCardLandscape } from "../Cards/Cards";
import { getIndexForInfiniteQuery } from "../../apis/src/utils";
import { useMusicPlayerPlaylistDispatch } from "../../hooks/MusicPlayerPlaylistHooks";

export const FilteredSongsList: React.FC<FilteredSongsListType> = ({
  index,
  pageNumber,
  payload,
}) => {
  console.log("Rencdered");
  const { token } = useToken();
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useFilterSongsInfiniteQuery(token, {
    text: payload.text,
    option: payload.option,
  });

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
