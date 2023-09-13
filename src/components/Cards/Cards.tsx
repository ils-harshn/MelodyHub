import { Album, Options, Plus, Trash } from "../../assests/icons";
import {
  useMusicPlayerData,
  useMusicPlayerDispatch,
} from "../../hooks/MusicPlayerHooks";
import { getClassName } from "../../utils";
import { generateURLFromID } from "../../utils/helpers/urls";
import { PlayPauseButton } from "../Buttons/buttons";
import ImageWithLoader from "../ImageWithLoader/ImageWithLoader";
import { FullLoader } from "../Loaders/Loaders";
import styles from "./Cards.module.css";
import { useRef, useEffect, useState } from "react";
import {
  ContentCardType,
  ImageCardType,
  LoadMoreCardType,
  OptionPopupSongCardLandscapeType,
  OptionPopupType,
  PlaylistCardType,
  SongCardLandscapeType,
  SongCardType,
} from "./Cards.types";
import {
  useAddSongToPlaylistMutation,
  useDeletePlaylistMutation,
  useRemoveSongFromPlaylistMutation,
} from "../../apis/src/queryHooks";
import { usePlaylistComponentDispatch } from "../../hooks/PlaylistComponentHooks";
import { useNavigate } from "react-router-dom";
import * as routes from "../../router/routes";
import { useToken } from "../../hooks/TokenHooks";
import {
  useMusicPlayerPlaylistData,
  useMusicPlayerPlaylistDispatch,
} from "../../hooks/MusicPlayerPlaylistHooks";

const OptionPopup: React.FC<OptionPopupType> = ({
  data,
  handlePlay,
  isPlaying,
}) => {
  const dispatchPlaylistData = usePlaylistComponentDispatch();

  return (
    <div className="option-button">
      <Options />
      <div className="options">
        <div
          className="option"
          onClick={() =>
            dispatchPlaylistData({
              type: "TOGGLE",
              payload: { open: true, addToSong: data },
            })
          }
        >
          Add To Playlist
        </div>
        <div className="option">Add To Queue</div>
        <div className="option" onClick={handlePlay}>
          {isPlaying ? "Pause" : "Play"}
        </div>
      </div>
    </div>
  );
};

const SongCard: React.FC<SongCardType> = ({
  data,
  className = "",
  ...props
}) => {
  const dispatchMusicPlayerPlaylistData = useMusicPlayerPlaylistDispatch();
  const playlistData = useMusicPlayerPlaylistData();

  const { playing } = useMusicPlayerData();
  const dispatchPlayer = useMusicPlayerDispatch();

  const handleThumbnailClick = () => {
    if (playlistData.currentSong?.id !== data.id)
      dispatchMusicPlayerPlaylistData({
        type: "SET_CURRENT_SONG",
        payload: { currentSong: data },
      });
    dispatchPlayer({
      type: "TOGGLE_PLAYING",
      payload: {
        playing: playlistData.currentSong?.id === data.id ? !playing : true,
      },
    });
  };

  return (
    <div
      className={getClassName(
        styles["song-card"],
        playlistData.currentSong?.id === data.id ? "selected" : "",
        className
      )}
      {...props}
    >
      <div className="thumbnail" onClick={handleThumbnailClick}>
        <ImageWithLoader
          src={generateURLFromID(data.album.thumbnail300x300)}
          alt="Loading"
          skeleton={{
            className: "skeleton",
          }}
        />
        <div className={"thumbnail-button"}>
          <PlayPauseButton
            playing={
              playlistData.currentSong?.id === data.id && (playing || false)
            }
            size="medium"
          />
        </div>
      </div>
      <div className="details">
        <div>
          <div className="song-name truncate">{data.original_name}</div>
          <div className="description">
            <div className="album-name truncate">
              {data.album.title} ({data.album.year})
            </div>
            <div className="artists-name truncate">
              {data.artist_set.map((item) => item.name).join(", ")}
            </div>
          </div>
        </div>
        <div className="listens-and-option">
          <OptionPopup
            data={data}
            handlePlay={handleThumbnailClick}
            isPlaying={
              playlistData.currentSong?.id === data.id && (playing || false)
            }
          />
          <div>{data.views} Listened</div>
        </div>
      </div>
    </div>
  );
};

export const ContentCard: React.FC<ContentCardType> = ({
  title,
  Icon = Album,
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <div
      className={getClassName(
        styles["content-card"],
        disabled ? "disabled" : "",
        className
      )}
      {...props}
    >
      <div className="icon">
        <Icon />
      </div>
      <div className="title">{title}</div>
    </div>
  );
};

export const ImageCard: React.FC<ImageCardType> = ({
  className = "",
  title,
  optionTitle = "",
  src,
  alt = "image",
  ...props
}) => {
  return (
    <div className={getClassName(styles["image-card"], className)} {...props}>
      <ImageWithLoader
        src={src}
        alt={alt}
        skeleton={{
          className: "skeleton",
        }}
      />
      <div className="title">
        <p className="truncate">{title}</p>
      </div>
      {optionTitle === "" ? null : (
        <div className="title-bottom">
          <p className="truncate">{optionTitle}</p>
        </div>
      )}
    </div>
  );
};

export const LoadMoreCard: React.FC<LoadMoreCardType> = ({
  className = "",
  varient = "primary",
  title,
  isDisabled,
  onClick,
  isLoading,
  ...props
}) => {
  return (
    <div
      className={getClassName(styles["load-more-card"], varient, className)}
      {...props}
      onClick={isDisabled ? undefined : onClick}
    >
      {isLoading ? <FullLoader size="small" /> : <p>{title}</p>}
    </div>
  );
};

const OptionPopupSongCardLandscape: React.FC<
  OptionPopupSongCardLandscapeType
> = ({
  data,
  handlePlay,
  isPlaying,
  onRemoveFromPlaylistSuccess,
  showingForPlaylistId,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const dispatchPlaylistData = usePlaylistComponentDispatch();

  const { token } = useToken();

  const {
    mutate: removeSongFromPlaylistMutate,
    isLoading: removing,
    isSuccess: removed,
  } = useRemoveSongFromPlaylistMutation(token, {
    onSuccess: () => {
      if (onRemoveFromPlaylistSuccess) onRemoveFromPlaylistSuccess();
    },
  });

  useEffect(() => {
    const parentElement = parentRef.current;
    const optionsElement = optionsRef.current;
    const handleMouseOver = () => {
      if (optionsElement && parentElement) {
        let pos = parentElement.getBoundingClientRect();

        let calculatedTop = pos.top + pos.height;
        let calculatedRight = pos.right - optionsElement.offsetWidth;

        if (
          calculatedTop + optionsElement.offsetHeight >
          document.body.offsetHeight
        ) {
          calculatedTop = pos.top - optionsElement.offsetHeight - 2;
        }
        optionsElement.style.top = `${calculatedTop}px`;
        optionsElement.style.left = `${calculatedRight}px`;
      }
    };
    if (parentElement) {
      parentElement.addEventListener("mouseover", handleMouseOver);
    }
    return () => {
      if (parentElement) {
        parentElement.removeEventListener("mouseover", handleMouseOver);
      }
    };
  }, []);

  if (removed) return null;

  return (
    <div className="option-button" ref={parentRef}>
      <Options />
      <div className="options" ref={optionsRef}>
        {showingForPlaylistId ? null : (
          <div
            className="option"
            onClick={() =>
              dispatchPlaylistData({
                type: "TOGGLE",
                payload: { open: true, addToSong: data },
              })
            }
          >
            Add To Playlist
          </div>
        )}
        <div className="option">Add To Queue</div>
        {showingForPlaylistId ? (
          <div
            className="option"
            onClick={() => {
              if (!removing)
                removeSongFromPlaylistMutate({
                  playlist_id: showingForPlaylistId,
                  song_id: data.id,
                });
            }}
          >
            {removing ? "Removing" : "Remove"}
          </div>
        ) : null}
        <div
          className="option"
          onClick={() => {
            if (!removing) handlePlay();
          }}
        >
          {isPlaying ? "Pause" : "Play"}
        </div>
      </div>
    </div>
  );
};

export const SongCardLandscape: React.FC<SongCardLandscapeType> = ({
  data,
  index,
  className = "",
  showingForPlaylistId,
  onRemoveFromPlaylistSuccess,
  ...props
}) => {
  const dispatchMusicPlayerPlaylistData = useMusicPlayerPlaylistDispatch();
  const playlistData = useMusicPlayerPlaylistData();

  const { playing } = useMusicPlayerData();
  const dispatchPlayer = useMusicPlayerDispatch();

  const handleThumbnailClick = () => {
    if (playlistData.currentSong?.id !== data.id)
      dispatchMusicPlayerPlaylistData({
        type: "SET_CURRENT_SONG",
        payload: { currentSong: data },
      });
    dispatchPlayer({
      type: "TOGGLE_PLAYING",
      payload: {
        playing: playlistData.currentSong?.id === data.id ? !playing : true,
      },
    });
  };

  return (
    <div
      className={getClassName(
        styles["song-card-landscape"],
        playlistData.currentSong?.id === data.id ? "selected" : "",
        className
      )}
      {...props}
    >
      <div className="index">{index}</div>
      <div className="details" onClick={handleThumbnailClick}>
        <div>
          <div className="song-name truncate">{data.original_name}</div>
          <div className="description">
            <div className="artists-name truncate">
              {data.artist_set.map((item) => item.name).join(", ")}
            </div>
          </div>
        </div>
      </div>
      <OptionPopupSongCardLandscape
        showingForPlaylistId={showingForPlaylistId}
        onRemoveFromPlaylistSuccess={onRemoveFromPlaylistSuccess}
        data={data}
        handlePlay={handleThumbnailClick}
        isPlaying={
          playlistData.currentSong?.id === data.id && (playing || false)
        }
      />
    </div>
  );
};

export const PlaylistCard: React.FC<PlaylistCardType> = ({
  data,
  className = "",
  addToSong,
  onDeleteSuccess,
  onSongAddSuccess,
  ...props
}) => {
  const [deleted, setDeleted] = useState(false);
  const [addedSong, setAddedSong] = useState(false);
  const { token } = useToken();
  const { mutate, isLoading } = useDeletePlaylistMutation(token, {
    onSuccess: () => {
      if (onDeleteSuccess) onDeleteSuccess();
      setDeleted(true);
    },
  });

  const {
    mutate: addSongMutate,
    isLoading: addSongLoading,
    isError: isAddSongError,
  } = useAddSongToPlaylistMutation(token, {
    onSuccess: () => {
      if (onSongAddSuccess) onSongAddSuccess();
      setAddedSong(true);
    },
  });

  const handleDelete = () => {
    if (!isLoading)
      mutate({
        id: data.id,
      });
  };

  const handleAddSong = () => {
    if (!addSongLoading && addToSong) {
      addSongMutate({
        song_id: addToSong.id,
        playlist_id: data.id,
      });
    }
  };

  const navigate = useNavigate();
  const playlistComponentDispatch = usePlaylistComponentDispatch();

  if (deleted) return null;
  return (
    <div
      className={getClassName(
        styles["playlist-card"],
        className,
        isLoading ? "deleting" : "",
        addSongLoading ? "adding-song" : "",
        addedSong ? "added-song" : "",
        isAddSongError ? "add-song-error" : ""
      )}
      {...props}
    >
      <div
        className="title truncate"
        onClick={() => {
          if (!deleted && !addToSong && !addSongLoading && !isLoading) {
            playlistComponentDispatch({
              type: "TOGGLE",
              payload: {
                addToSong: undefined,
                open: false,
              },
            });
            navigate(routes.PLAYLIST_SONGS.endpoint(data.title, data.id));
          }
        }}
      >
        {data.title}
      </div>
      {addToSong ? (
        <div className="add-icon" onClick={handleAddSong}>
          <Plus />
        </div>
      ) : (
        <div className="trash-icon" onClick={handleDelete}>
          <Trash />
        </div>
      )}
    </div>
  );
};

export default SongCard;
