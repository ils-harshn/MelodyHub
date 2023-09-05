import { Navigate, useParams } from "react-router-dom";
import { isNumeric } from "../../utils";
import { HOME } from "../../router/routes";

const AlbumSongs: React.FC = () => {
  const { id } = useParams();

  if (!id || !isNumeric(id)) {
    return <Navigate to={HOME.endpoint} />;
  }

  return <div>{id}</div>;
};

export default AlbumSongs;
