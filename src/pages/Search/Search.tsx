import { useContext } from "react";
import { getClassName } from "../../utils";
import styles from "./Search.module.css";
import { TokenContext } from "../../contexts/TokenContext";
import { useFilterSongs } from "../../apis/src/queryHooks";
import { FullLoader } from "../../components/Loaders/Loaders";
import SongCardContainer from "../../components/Containers/Containers";
import {
  SongType,
} from "../../apis/src/response.types";
import SongCard from "../../components/Cards/Cards";

const Search: React.FC = () => {
  const token = useContext(TokenContext);
  const { data, isLoading } = useFilterSongs(token, {
    page: 1,
  });

  if (isLoading === true) return <FullLoader />;
  return (
    <div className={getClassName(styles["search"])}>
      <SongCardContainer title="What you wanna listen?" optionTitle="Explore">
        {data.results.map((item: SongType, index: number) => {
          return <SongCard data={item} key={index} />;
        })}
      </SongCardContainer>
    </div>
  );
};

export default Search;
