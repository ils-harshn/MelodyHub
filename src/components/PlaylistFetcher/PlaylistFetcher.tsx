import { useContext, Fragment, useState, useEffect, useRef } from "react";
import {
  useCreatePlaylistMutation,
  useFilterPlaylistsInfiniteQuery,
} from "../../apis/src/queryHooks";
import { PlaylistCardContainer } from "../../components/Containers/Containers";
import { getClassName } from "../../utils";
import styles from "./PlaylistFetcher.module.css";
import { TokenContext } from "../../contexts/TokenContext";
import { FullLoader } from "../../components/Loaders/Loaders";
import { PlaylistResponseType } from "../../apis/src/response.types";
import { LoadMoreCard, PlaylistCard } from "../../components/Cards/Cards";
import {
  PlaylistCreatorType,
  PlaylistFetcherComponentType,
} from "./PlaylistFetcher.types";
import { TextInput } from "../../components/Inputs/Inputs";
import { useDebounce } from "@uidotdev/usehooks";
import { Button } from "../../components/Buttons/buttons";
import Error from "../../components/Error/Error";
import {
  usePlaylistComponentData,
  usePlaylistComponentDispatch,
} from "../../hooks/PlaylistComponentHooks";

const PlaylistCreator: React.FC<PlaylistCreatorType> = ({ onSuccessAdd }) => {
  const token = useContext(TokenContext);
  const [text, setText] = useState("");
  const { mutate, isLoading, isError } = useCreatePlaylistMutation(token, {
    onSuccess: () => {
      setText("");
      onSuccessAdd && onSuccessAdd();
    },
  });

  const handleCreate = () => {
    if (!isLoading && text)
      mutate({
        text,
      });
  };

  return (
    <>
      <div className="playlist-creator">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
        >
          <TextInput
            varient="secondary"
            placeholder="Enter Playlist Name"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={80}
          />
          <div className="add-playlist-button-container">
            <Button
              varient="primary"
              width="full"
              disabled={!text || isLoading}
              loading={isLoading}
              onClick={handleCreate}
            >
              Add
            </Button>
          </div>
        </form>
      </div>
      {isError && (
        <div className="playlist-creator-error">
          <Error>*Playlist already exists with this name!</Error>
        </div>
      )}
    </>
  );
};

export const PlaylistFetcherComponent: React.FC<
  PlaylistFetcherComponentType
> = ({ open, toggleOpen, addToSong }) => {
  const token = useContext(TokenContext);
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 500);
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    refetch,
    fetchNextPage,
  } = useFilterPlaylistsInfiniteQuery(token, {
    text: debouncedText,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerEle = containerRef.current;
    const handleClick = (event: MouseEvent) => {
      if (containerEle) {
        if (event.target === containerEle) {
          toggleOpen(false);
        }
      }
    };
    if (containerEle) {
      containerEle.addEventListener("click", handleClick);
    }
    return () => {
      if (containerEle) {
        containerEle.removeEventListener("click", handleClick);
      }
    };
  }, [toggleOpen]);

  return (
    <div
      className={getClassName(styles["playlist-container"])}
      ref={containerRef}
    >
      <PlaylistCardContainer
        title={
          addToSong ? `Adding (${addToSong.original_name})` : "Your Playlists"
        }
        onClickClose={() => toggleOpen(false)}
        className="main-playlist-container"
      >
        <div className="right-shift">
          <TextInput
            varient="secondary"
            placeholder="Search Playlist"
            className="playlist-search-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="paylist-cards-items-container primary-scroll-bar">
          {isLoading ? (
            <FullLoader />
          ) : !data || !data.pages || data.pages[0].count === 0 ? (
            <h2>No Playlist Found</h2>
          ) : (
            <>
              {data.pages.map((group, index) => (
                <Fragment key={index}>
                  {group.results.map((item: PlaylistResponseType) => (
                    <PlaylistCard
                      className="playlist-item"
                      data={item}
                      key={item.id}
                      onDeleteSuccess={refetch}
                      addToSong={addToSong}
                    />
                  ))}
                </Fragment>
              ))}
              {hasNextPage ? (
                <LoadMoreCard
                  className="more-loader"
                  isLoading={isFetching || isLoading || isFetchingNextPage}
                  isDisabled={isFetching || isLoading || isFetchingNextPage}
                  title="Load More Playlist"
                  onClick={() => fetchNextPage()}
                />
              ) : null}
            </>
          )}
        </div>
        <PlaylistCreator onSuccessAdd={() => refetch()} />
      </PlaylistCardContainer>
    </div>
  );
};

export const PlaylistShower: React.FC = () => {
  const playlistData = usePlaylistComponentData();
  const dispatch = usePlaylistComponentDispatch();

  if (playlistData.open === false) return null;
  return (
    <PlaylistFetcherComponent
      open={false}
      toggleOpen={() => {
        dispatch({
          type: "TOGGLE",
          payload: {
            open: false,
          },
        });
      }}
      addToSong={playlistData.addToSong}
    />
  );
};
