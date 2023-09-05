import { Navigate, useParams } from "react-router-dom";
import { getClassName, isNumeric } from "../../utils";
import { HOME } from "../../router/routes";
import { useAlbumDetail } from "../../apis/src/queryHooks";
import { TokenContext } from "../../contexts/TokenContext";
import { useContext } from "react";
import { AlbumDetailType } from "./Album.type";
import styles from "./AlbumDetail.module.css";
import { Skeleton } from "../../components/Loaders/Loaders";
import ImageWithLoader from "../../components/ImageWithLoader/ImageWithLoader";
import { generateURLFromID } from "../../utils/helpers/urls";

const AlbumSongs: React.FC<AlbumDetailType> = ({ id }) => {
  return <div className="songs"></div>;
};

const AlbumInfo: React.FC<AlbumDetailType> = ({ id }) => {
  const token = useContext(TokenContext);
  const { data, isLoading } = useAlbumDetail(token, {
    id,
  });
  return (
    <div className="album-info">
      {isLoading ? (
        <Skeleton className="skeleton" />
      ) : (
        <>
          <div className="image-container">
            <ImageWithLoader
              src={generateURLFromID(data.thumbnail)}
              skeleton={{
                className: "skeleton",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

const AlbumWithSongs: React.FC<AlbumDetailType> = ({ id }) => {
  return (
    <div className={getClassName(styles["album-with-songs"])}>
      <AlbumInfo id={id} />
      <AlbumSongs id={id} />
    </div>
  );
};

const AlbumDetail: React.FC = () => {
  const { id } = useParams();

  if (!id || !isNumeric(id)) {
    return <Navigate to={HOME.endpoint} />;
  }

  return <AlbumWithSongs id={parseInt(id)} />;
};

export default AlbumDetail;
