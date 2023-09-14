import { Fragment } from "react";
import { useRecentSongsInfiniteQuery } from "../../apis/src/queryHooks";
import SongCardContainer, {
  ContentCardContainer,
} from "../../components/Containers/Containers";
import { getClassName } from "../../utils";
import styles from "./Library.module.css";
import { FullLoader } from "../../components/Loaders/Loaders";
import { SongType } from "../../apis/src/response.types";
import SongCard, { ContentCard } from "../../components/Cards/Cards";
import { Artist, Genre, Playlist, Queue } from "../../assests/icons";
import { useNavigate } from "react-router-dom";
import * as routes from "../../router/routes";
import { usePlaylistComponentDispatch } from "../../hooks/PlaylistComponentHooks";
import { useToken } from "../../hooks/TokenHooks";
import { useMusicPlayerPlaylistDispatch } from "../../hooks/MusicPlayerPlaylistHooks";

const Recent25Songs: React.FC = () => {
  const { token } = useToken();
  const { data, isLoading } = useRecentSongsInfiniteQuery(token, {
    page: 1,
  });

  const dispatchMusicPlayerPlaylistData = useMusicPlayerPlaylistDispatch();

  const handleClickOnSong = (data: SongType) => {
    dispatchMusicPlayerPlaylistData({
      type: "SET_SINGLE_SONG_ACTION",
      payload: {
        currentSong: data,
      },
    });
  };
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
                <SongCard
                  data={item}
                  key={item.id}
                  onClick={() => handleClickOnSong(item)}
                />
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
  const dispatch = usePlaylistComponentDispatch();

  return (
    <div className={getClassName(styles["library"])}>
      <ContentCardContainer title="Library" className="container">
        <ContentCard
          title="Playlists"
          Icon={Playlist}
          onClick={() =>
            dispatch({
              type: "TOGGLE",
              payload: { open: true, addToSong: undefined },
            })
          }
        />
        <ContentCard
          title="Artists"
          Icon={Artist}
          onClick={() => navigate(routes.ARTIST.endpoint)}
        />
        <ContentCard
          title="Albums"
          onClick={() => navigate(routes.ALBUM.endpoint)}
        />
        <ContentCard title="Genres" Icon={Genre} disabled={true} />
        <ContentCard title="Queue" Icon={Queue} disabled={true} />
      </ContentCardContainer>
      <Recent25Songs />
    </div>
  );
};

export default Library;
