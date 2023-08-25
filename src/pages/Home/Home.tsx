import { useMusicPlayerDispatch } from "../../hooks/MusicPlayerHooks";

const Home: React.FC = () => {
  const dispatch = useMusicPlayerDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch({
            type: "TOGGLE",
          });
        }}
      >
        Toggle Music Player
      </button>
    </div>
  );
};

export default Home;
