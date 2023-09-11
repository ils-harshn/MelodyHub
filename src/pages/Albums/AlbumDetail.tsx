import { Navigate, useParams } from "react-router-dom";
import { getClassName, isNumeric } from "../../utils";
import { HOME } from "../../router/routes";
import {
  useAlbumDetail,
  useAlbumSongsInfiniteQuery,
} from "../../apis/src/queryHooks";
import { Fragment, useState } from "react";
import { AlbumDetailType } from "./Album.type";
import styles from "./AlbumDetail.module.css";
import { FullLoader, Skeleton } from "../../components/Loaders/Loaders";
import { generateURLFromID } from "../../utils/helpers/urls";
import {
  ImageCard,
  LoadMoreCard,
  SongCardLandscape,
} from "../../components/Cards/Cards";
import { SongType } from "../../apis/src/response.types";
import { getIndexForInfiniteQuery } from "../../apis/src/utils";
import { SongCardLandscapeContainer } from "../../components/Containers/Containers";
import NotFound from "../NotFound/NotFound";
import { useToken } from "../../hooks/TokenHooks";

const AlbumSongs: React.FC<AlbumDetailType> = ({ id, isError }) => {
  const { token } = useToken();
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useAlbumSongsInfiniteQuery(
    token,
    {
      id,
    },
    {
      retry: false,
      onError: () => {
        isError(true);
      },
    }
  );
  return (
    <div className="songs primary-scroll-bar">
      {isLoading ? (
        <FullLoader />
      ) : !data || !data.pages || data.pages[0].count === 0 ? (
        <h2>Found Nothing</h2>
      ) : (
        <SongCardLandscapeContainer
          title={`${data.pages[0].results[0].album.title} (${data.pages[0].results[0].album.year})`}
          optionTitle="Play All"
        >
          {data.pages.map((group, index) => (
            <Fragment key={index}>
              {group.results.map((item: SongType, i: number) => (
                <SongCardLandscape
                  className="song-item"
                  data={item}
                  key={item.id}
                  index={getIndexForInfiniteQuery(index, i)}
                />
              ))}
            </Fragment>
          ))}
          {hasNextPage ? (
            <LoadMoreCard
              varient="secondary"
              isLoading={isFetching || isLoading || isFetchingNextPage}
              isDisabled={isFetching || isLoading || isFetchingNextPage}
              title="Load More Songs"
              onClick={() => fetchNextPage()}
            />
          ) : null}
        </SongCardLandscapeContainer>
      )}
    </div>
  );
};

const AlbumInfo: React.FC<AlbumDetailType> = ({ id, isError }) => {
  const { token } = useToken();
  const { data, isLoading } = useAlbumDetail(
    token,
    {
      id,
    },
    {
      retry: false,
      onError: () => {
        isError(true);
      },
    }
  );
  return (
    <div className="album-info">
      {isLoading ? (
        <Skeleton className="skeleton" />
      ) : (
        <>
          <div className="image-container">
            <ImageCard
              title={data.title}
              className="image-container"
              src={generateURLFromID(data.thumbnail)}
            />
          </div>
        </>
      )}
    </div>
  );
};

const AlbumWithSongs: React.FC<AlbumDetailType> = ({ id, isError }) => {
  return (
    <div className={getClassName(styles["album-with-songs"])}>
      <AlbumInfo id={id} isError={isError} />
      <AlbumSongs id={id} isError={isError} />
    </div>
  );
};

const AlbumDetail: React.FC = () => {
  const { id } = useParams();
  const [error, setError] = useState(false);

  if (!id || !isNumeric(id)) {
    return <Navigate to={HOME.endpoint} />;
  }

  if (error) {
    return <NotFound />;
  }

  return <AlbumWithSongs id={parseInt(id)} isError={setError} />;
};

export default AlbumDetail;
