import { Navigate, useParams } from "react-router-dom";
import { getClassName, isNumeric } from "../../utils";
import { HOME } from "../../router/routes";
import {
  useArtistDetail,
  useArtistSongsInfiniteQuery,
} from "../../apis/src/queryHooks";
import { Fragment, useState } from "react";
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
import { useToken } from "../../hooks/TokenHooks";
import { useMusicPlayerPlaylistDispatch } from "../../hooks/MusicPlayerPlaylistHooks";

const ArtistSongs: React.FC<ArtistDetailType> = ({ id, isError }) => {
  const { token } = useToken();
  const payload = {
    id: id,
  };
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useArtistSongsInfiniteQuery(token, payload, {
    retry: false,
    onError: () => {
      isError(true);
    },
  });

  const dispatchMusicPlayerPlaylistData = useMusicPlayerPlaylistDispatch();

  const handleClickOnSong = (
    song: SongType,
    pageNumber: number,
    index: number
  ) => {
    dispatchMusicPlayerPlaylistData({
      type: "GET_ARTIST_SONGS_INFINITE_QUERY",
      payload: {
        index: index,
        pageNumber: pageNumber,
        queryPayload: payload,
        currentSong: song,
      },
    });
  };

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
          {data.pages.map((group, pageNumber) => (
            <Fragment key={pageNumber}>
              {group.results.map((item: SongType, index: number) => (
                <SongCardLandscape
                  className="song-item"
                  data={item}
                  key={item.id}
                  index={getIndexForInfiniteQuery(pageNumber, index)}
                  onClick={() => handleClickOnSong(item, pageNumber, index)}
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

const ArtistInfo: React.FC<ArtistDetailType> = ({ id, isError }) => {
  const { token } = useToken();
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
