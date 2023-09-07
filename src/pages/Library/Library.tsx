import { useContext, Fragment, useState } from "react";
import { useRecentSongsInfiniteQuery } from "../../apis/src/queryHooks";
import SongCardContainer, {
  ContentCardContainer,
} from "../../components/Containers/Containers";
import { getClassName } from "../../utils";
import styles from "./Library.module.css";
import { TokenContext } from "../../contexts/TokenContext";
import { FullLoader } from "../../components/Loaders/Loaders";
import { SongType } from "../../apis/src/response.types";
import SongCard, { ContentCard } from "../../components/Cards/Cards";
import { Artist, Genre, Playlist, Queue } from "../../assests/icons";
import { useNavigate } from "react-router-dom";
import * as routes from "../../router/routes";
import { PlaylistFetcherComponent } from "../../components/PlaylistFetcher/PlaylistFetcher";

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
