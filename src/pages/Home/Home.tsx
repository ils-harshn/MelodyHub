import { useMostPopularSongs } from "../../apis/src/queryHooks";
import SongCard from "../../components/Cards/Cards";
import SongCardContainer from "../../components/Containers/Containers";
import { getClassName } from "../../utils";
import styles from "./Home.module.css";
import { FullLoader } from "../../components/Loaders/Loaders";
import { SongType } from "../../apis/src/response.types";
import { useToken } from "../../hooks/TokenHooks";

const Home: React.FC = () => {
  const { token } = useToken();
  const { data, isLoading } = useMostPopularSongs(token);

  if (isLoading === true) return <FullLoader />;
  return (
    <div className={getClassName(styles["home"])}>
      <SongCardContainer title="Most Popular Songs" optionTitle="Explore">
        {data.map((item: SongType, index: number) => {
          return <SongCard data={item} key={index} />;
        })}
      </SongCardContainer>
    </div>
  );
};

export default Home;
