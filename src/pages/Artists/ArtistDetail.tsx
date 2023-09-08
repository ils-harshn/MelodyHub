import { Navigate, useParams } from "react-router-dom";
import { getClassName, isNumeric } from "../../utils";
import { HOME } from "../../router/routes";
import {
  useArtistDetail,
  useArtistSongsInfiniteQuery,
} from "../../apis/src/queryHooks";
import { TokenContext } from "../../contexts/TokenContext";
import { useContext, Fragment, useState } from "react";
import { ArtistDetailType } from "./Artist.type";
import styles from "./ArtistDetail.module.css";
import { FullLoader, Skeleton } from "../../components/Loaders/Loaders";
import { generateURLFromID } from "../../utils/helpers/urls";
import {
  ImageCard,
  LoadMoreCard,
  SongCardLandscape,
} from "../../components/Cards/Cards";
import { SongType } from "../../apis/src/response.types";
import {
  getArtistNameForGivenIdFromArtistSet,
  getIndexForInfiniteQuery,
} from "../../apis/src/utils";
import { SongCardLandscapeContainer } from "../../components/Containers/Containers";
import NotFound from "../NotFound/NotFound";

const ArtistSongs: React.FC<ArtistDetailType> = ({ id, isError }) => {
  const token = useContext(TokenContext);
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useArtistSongsInfiniteQuery(
    token,
    {
      id: id,
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
          title={`${getArtistNameForGivenIdFromArtistSet(
            data.pages[0].results[0].artist_set,
            id
          )}`}
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

const ArtistInfo: React.FC<ArtistDetailType> = ({ id, isError }) => {
  const token = useContext(TokenContext);
  const { data, isLoading } = useArtistDetail(
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
    <div className="artist-info">
      {isLoading ? (
        <Skeleton className="skeleton" />
      ) : (
        <>
          <div className="image-container">
            <ImageCard
              title={data.name}
              className="image-container"
              src={generateURLFromID(data.artists_thumbnail)}
            />
          </div>
        </>
      )}
    </div>
  );
};

const ArtistWithSongs: React.FC<ArtistDetailType> = ({ id, isError }) => {
  return (
    <div className={getClassName(styles["artist-with-songs"])}>
      <ArtistInfo id={id} isError={isError} />
      <ArtistSongs id={id} isError={isError} />
    </div>
  );
};

const ArtistDetail: React.FC = () => {
  const { id } = useParams();
  const [error, setError] = useState(false);

  if (!id || !isNumeric(id)) {
    return <Navigate to={HOME.endpoint} />;
  }

  if (error) {
    return <NotFound />;
  }

  return <ArtistWithSongs id={parseInt(id)} isError={setError} />;
};

export default ArtistDetail;
