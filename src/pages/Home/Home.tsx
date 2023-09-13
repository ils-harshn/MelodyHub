import { useMostPopularSongs } from "../../apis/src/queryHooks";
import SongCard from "../../components/Cards/Cards";
import SongCardContainer from "../../components/Containers/Containers";
import { getClassName } from "../../utils";
import styles from "./Home.module.css";
import { FullLoader } from "../../components/Loaders/Loaders";
import { SongType } from "../../apis/src/response.types";
import { useToken } from "../../hooks/TokenHooks";
import { useMusicPlayerPlaylistDispatch } from "../../hooks/MusicPlayerPlaylistHooks";

const Home: React.FC = () => {
  const { token } = useToken();
  const { data, isLoading } = useMostPopularSongs(token);
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
    <div className={getClassName(styles["home"])}>
      <SongCardContainer title="Most Popular Songs" optionTitle="Explore">
        {data.map((item: SongType, index: number) => {
          return (
            <SongCard
              data={item}
              key={index}
              onClick={() => handleClickOnSong(item)}
            />
          );
        })}
      </SongCardContainer>
    </div>
  );
};

export default Home;
