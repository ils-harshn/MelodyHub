// import { useMusicPlayerDispatch } from "../../hooks/MusicPlayerHooks";
import SongCard from "../../components/Cards/Cards";
import SongCardContainer from "../../components/Containers/Containers";
import { getClassName } from "../../utils";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  // const dispatch = useMusicPlayerDispatch();
  return (
    <div className={getClassName(styles["home"])}>
      {/* <button
        onClick={() => {
          dispatch({
            type: "TOGGLE",
          });
        }}
      >
        Toggle Music Player
      </button> */}
      <h3>Recent Songs</h3>
      <SongCardContainer>
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
      </SongCardContainer>
    </div>
  );
};

export default Home;
