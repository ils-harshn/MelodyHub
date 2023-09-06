import { useDebounce } from "@uidotdev/usehooks";
import { useArtistsInfiniteQuery } from "../../apis/src/queryHooks";
import { ArtistType } from "../../apis/src/response.types";
import { ImageCard, LoadMoreCard } from "../../components/Cards/Cards";
import { ImageCardContainer } from "../../components/Containers/Containers";
import { InputWithIcon } from "../../components/Inputs/Inputs";
import { TokenContext } from "../../contexts/TokenContext";
import { getClassName } from "../../utils";
import { generateURLFromID } from "../../utils/helpers/urls";
import styles from "./Artist.module.css";
import { useContext, Fragment, useState } from "react";
import { ArtistsPayloadType } from "../../apis/src/payload.types";
import { FullLoader } from "../../components/Loaders/Loaders";
import { useNavigate } from "react-router-dom";
import { ARTIST_SONGS } from "../../router/routes";

const Artist: React.FC = () => {
  const navigate = useNavigate();
  const token = useContext(TokenContext);
  const [filterBoxData, setFilterBoxData] = useState<ArtistsPayloadType>({
    text: "",
    option: "name",
  });

  const debouncedFilterBoxData = useDebounce(filterBoxData, 500);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useArtistsInfiniteQuery(token, {
    text: debouncedFilterBoxData.text,
    option: debouncedFilterBoxData.option,
  });

  return (
    <div className={getClassName(styles["artist"])}>
      <div className="filter-box">
        <div className="title">Artists</div>
        <div className="inputs-with-filters">
          <InputWithIcon
            className="remove-arrows-from-input"
            placeholder="Search Artist"
            varient="secondary"
            width="full"
            value={filterBoxData.text}
            onChange={(e) =>
              setFilterBoxData((prev) => ({
                ...prev,
                text: e.target.value,
              }))
            }
          />
        </div>
      </div>

      {isLoading ? (
        <FullLoader />
      ) : !data || !data.pages || data.pages[0].count === 0 ? (
        <h2>Found Nothing</h2>
      ) : (
        <ImageCardContainer title="">
          {data.pages.map((group, index) => (
            <Fragment key={index}>
              {group.results.map((item: ArtistType) => (
                <ImageCard
                  title={item.name}
                  key={item.id}
                  src={generateURLFromID(item.artists_thumbnail300x300)}
                  optionTitle=""
                  onClick={() => navigate(ARTIST_SONGS.endpoint(item.id))}
                />
              ))}
            </Fragment>
          ))}
          {hasNextPage ? (
            <LoadMoreCard
              isLoading={isFetching || isLoading || isFetchingNextPage}
              isDisabled={isFetching || isLoading || isFetchingNextPage}
              title="Load More Albums"
              onClick={() => fetchNextPage()}
            />
          ) : null}
        </ImageCardContainer>
      )}
    </div>
  );
};

export default Artist;
