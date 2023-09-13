import { FilterSongsPayloadType } from "../../apis/src/payload.types";
import { useFilterSongsInfiniteQuery } from "../../apis/src/queryHooks";
import { SongType } from "../../apis/src/response.types";
import { getIndexForInfiniteQuery } from "../../apis/src/utils";
import {
  useMusicPlayerPlaylistData,
  useMusicPlayerPlaylistDispatch,
} from "../../hooks/MusicPlayerPlaylistHooks";
import { useToken } from "../../hooks/TokenHooks";
import { getClassName } from "../../utils";
import { LoadMoreCard, SongCardLandscape } from "../Cards/Cards";
import { PlaylistSongsLandscapeContainer } from "../Containers/Containers";
import { FullLoader } from "../Loaders/Loaders";
import styles from "./MusicPlayerPlaylist.module.css";
import { Fragment, useEffect } from "react";

type FilteredSongsListType = {
  index: number;
  pageNumber: number;
  payload: FilterSongsPayloadType;
};

const FilteredSongsList: React.FC<FilteredSongsListType> = ({
  index,
  pageNumber,
  payload,
}) => {
  const { token } = useToken();
  const dispatch = useMusicPlayerPlaylistDispatch();
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

  useEffect(() => {
    if (data && data.pages && data.pages[0].count) {
      dispatch({
        type: "SET_CURRENT_SONG",
        payload: {
          currentSong: data.pages[pageNumber].results[index],
        },
      });
    }
  }, [pageNumber, index]);

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
                  index={getIndexForInfiniteQuery(pageNumber, index)}
                  data={item}
                  key={item.id}
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

const MusicPlayerPlaylist: React.FC = () => {
  const { open, queryKey, currentSong, index, pageNumber, queryPayload } =
    useMusicPlayerPlaylistData();

  let componentToRender;

  switch (queryKey) {
    case "SET_SINGLE_SONG_ACTION":
      componentToRender = (
        <SongCardLandscape data={currentSong as SongType} index={1} />
      );
      break;
    case "FILTERED_SONGS_INFINITE_QUERY":
      componentToRender = (
        <FilteredSongsList
          index={index as number}
          pageNumber={pageNumber as number}
          payload={queryPayload as FilterSongsPayloadType}
        />
      );
      break;
    default:
      return null;
  }
  return (
    <div
      className={getClassName(
        styles["music-player-playlist"],
        open ? "active" : "",
        "primary-scroll-bar"
      )}
    >
      {componentToRender}
    </div>
  );
};

export default MusicPlayerPlaylist;
