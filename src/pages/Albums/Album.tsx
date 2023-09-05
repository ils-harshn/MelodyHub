import { useDebounce } from "@uidotdev/usehooks";
import { useAlbumsInfiniteQuery } from "../../apis/src/queryHooks";
import { AlbumType } from "../../apis/src/response.types";
import { ImageCard, LoadMoreCard } from "../../components/Cards/Cards";
import { ImageCardContainer } from "../../components/Containers/Containers";
import { InputWithIcon, SelectInput } from "../../components/Inputs/Inputs";
import { TokenContext } from "../../contexts/TokenContext";
import { getClassName } from "../../utils";
import { generateURLFromID } from "../../utils/helpers/urls";
import styles from "./Album.module.css";
import { useContext, Fragment, useState } from "react";
import { AlbumsPayloadType } from "../../apis/src/payload.types";
import { AlbumsSelectorOptionType } from "./Album.type";

const Album: React.FC = () => {
  const token = useContext(TokenContext);
  const [filterBoxData, setFilterBoxData] = useState<AlbumsPayloadType>({
    text: "",
    option: "title",
  });

  const debouncedFilterBoxData = useDebounce(filterBoxData, 500);

  const options: AlbumsSelectorOptionType[] = [
    { value: "title", label: "Name" },
    { value: "year", label: "Year" },
    { value: "code", label: "Code" },
  ];

  const defaultValue: AlbumsSelectorOptionType = {
    value: "title",
    label: "Name",
  };

  const onFilterOptionChange = (option: AlbumsSelectorOptionType | null) => {
    setFilterBoxData((prev) => ({
      ...prev,
      option: option ? option.value : filterBoxData.option,
    }));
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useAlbumsInfiniteQuery(token, {
    text: debouncedFilterBoxData.text,
    option: debouncedFilterBoxData.option,
  });

  return (
    <div className={getClassName(styles["album"])}>
      <div className="filter-box">
        <div className="title">Albums</div>
        <div className="inputs-with-filters">
          <InputWithIcon
            className="remove-arrows-from-input"
            placeholder="Search Album"
            varient="secondary"
            width="full"
            value={filterBoxData.text}
            onChange={(e) =>
              setFilterBoxData((prev) => ({
                ...prev,
                text: e.target.value,
              }))
            }
            type={filterBoxData.option === "year" ? "number" : "text"}
          />
          <div className="filters">
            <div className="title">Filter By: </div>
            <SelectInput
              defaultValue={defaultValue}
              size="small"
              className="option-selector"
              options={options}
              onChange={(newValue: unknown) =>
                onFilterOptionChange(newValue as AlbumsSelectorOptionType)
              }
            />
          </div>
        </div>
      </div>
      {!data || !data.pages || data.pages[0].count === 0 ? (
        <h2>Found Nothing</h2>
      ) : (
        <ImageCardContainer title="">
          {data.pages.map((group, index) => (
            <Fragment key={index}>
              {group.results.map((item: AlbumType) => (
                <ImageCard
                  title={item.title}
                  key={item.id}
                  src={generateURLFromID(item.thumbnail300x300)}
                  optionTitle={`${item.year}`}
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

export default Album;
