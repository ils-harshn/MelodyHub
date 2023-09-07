import { useContext, Fragment, useState, useEffect, useRef } from "react";
import {
  useCreatePlaylistMutation,
  useFilterPlaylistsInfiniteQuery,
  useRecentSongsInfiniteQuery,
} from "../../apis/src/queryHooks";
import SongCardContainer, {
  ContentCardContainer,
  PlaylistCardContainer,
} from "../../components/Containers/Containers";
import { getClassName } from "../../utils";
import styles from "./Library.module.css";
import { TokenContext } from "../../contexts/TokenContext";
import { FullLoader } from "../../components/Loaders/Loaders";
import { PlaylistResponseType, SongType } from "../../apis/src/response.types";
import SongCard, {
  ContentCard,
  LoadMoreCard,
  PlaylistCard,
} from "../../components/Cards/Cards";
import { Artist, Genre, Playlist, Queue } from "../../assests/icons";
import { useNavigate } from "react-router-dom";
import * as routes from "../../router/routes";
import {
  PlaylistCreatorType,
  PlaylistFetcherComponentType,
} from "./Library.type";
import { TextInput } from "../../components/Inputs/Inputs";
import { useDebounce } from "@uidotdev/usehooks";
import { Button } from "../../components/Buttons/buttons";
import Error from "../../components/Error/Error";

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
      </div>
      {isError && (
        <div className="playlist-creator-error">
          <Error>*Playlist already exists with this name!</Error>
        </div>
      )}
    </>
  );
};

const PlaylistFetcherComponent: React.FC<PlaylistFetcherComponentType> = ({
  open,
  toggleOpen,
}) => {
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
    <div className={getClassName("playlist-container")} ref={containerRef}>
      <PlaylistCardContainer
        title="Your Playlists"
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
            <h2>No Playlist Created</h2>
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

const Playlists: React.FC = () => {
  const [open, toggleOpen] = useState(false);
  return (
    <>
      <ContentCard
        title="Playlists"
        Icon={Playlist}
        onClick={() => toggleOpen(true)}
      />
      {open ? (
        <PlaylistFetcherComponent open={open} toggleOpen={toggleOpen} />
      ) : null}
    </>
  );
};

const Recent25Songs: React.FC = () => {
  const token = useContext(TokenContext);
  const { data, isLoading } = useRecentSongsInfiniteQuery(token, {
    page: 1,
  });

  if (isLoading === true) return <FullLoader />;
  return (
    <>
      {!data || !data.pages || data.pages[0].count === 0 ? null : (
        <SongCardContainer
          title="History"
          optionTitle="See All"
          className="container"
        >
          {data.pages.map((group, index) => (
            <Fragment key={index}>
              {group.results.map((item: SongType) => (
                <SongCard data={item} key={item.id} />
              ))}
            </Fragment>
          ))}
        </SongCardContainer>
      )}
    </>
  );
};
const Library: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={getClassName(styles["library"])}>
      <ContentCardContainer title="Library" className="container">
        <Playlists />
        <ContentCard
          title="Artists"
          Icon={Artist}
          onClick={() => navigate(routes.ARTIST.endpoint)}
        />
        <ContentCard
          title="Albums"
          onClick={() => navigate(routes.ALBUM.endpoint)}
        />
        <ContentCard title="Genres" Icon={Genre} />
        <ContentCard title="Queue" Icon={Queue} />
      </ContentCardContainer>
      <Recent25Songs />
    </div>
  );
};

export default Library;
