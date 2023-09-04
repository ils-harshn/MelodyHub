import { useContext, Fragment } from "react";
import { useRecentSongsInfiniteQuery } from "../../apis/src/queryHooks";
import SongCardContainer from "../../components/Containers/Containers";
import { getClassName } from "../../utils";
import styles from "./Library.module.css";
import { TokenContext } from "../../contexts/TokenContext";
import { FullLoader } from "../../components/Loaders/Loaders";
import { SongType } from "../../apis/src/response.types";
import SongCard from "../../components/Cards/Cards";

const Recent25Songs: React.FC = () => {
  const token = useContext(TokenContext);
  const { data, isLoading } = useRecentSongsInfiniteQuery(token, {
    page: 1,
  });

  if (isLoading === true) return <FullLoader />;
  return (
    <>
      {!data || !data.pages || data.pages[0].count === 0 ? (
        <h2>Found Nothing</h2>
      ) : (
        <SongCardContainer title="History" optionTitle="See All">
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
  return (
    <div className={getClassName(styles["library"])}>
      <Recent25Songs />
    </div>
  );
};

export default Library;
