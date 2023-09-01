import { getClassName } from "../../utils";
import { InputWithIcon, SelectInput } from "../Inputs/Inputs";
import styles from "./Header.module.css";
import { SEARCH } from "../../router/routes";
import {
  useSearchBoxData,
  useSearchBoxDispatch,
} from "../../hooks/SearchBoxHooks";
import { useNavigate } from "react-router-dom";
import { FilterSelectorOptionType } from "./Header.types";

const SearchAndFilters: React.FC = () => {
  const navigate = useNavigate();
  const searchBoxData = useSearchBoxData();
  const dispatch = useSearchBoxDispatch();

  const options: FilterSelectorOptionType[] = [
    { value: "original_name", label: "Song" },
    { value: "album__title", label: "Album" },
    { value: "artist__name", label: "Artist" },
    { value: "genre", label: "Genre" },
    { value: "year", label: "Year" },
    { value: "album__code", label: "Album Code" },
  ];

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "TOGGLE",
      payload: {
        text: e.target.value || "",
        page: searchBoxData.page,
        option: searchBoxData.option,
      },
    });
  };

  const onFilterOptionChange = (option: FilterSelectorOptionType | null) => {
    console.log(option);
    dispatch({
      type: "TOGGLE",
      payload: {
        text: searchBoxData.text,
        page: searchBoxData.page,
        option: option ? option.value : searchBoxData.option,
      },
    });
  };

  return (
    <div className="search-input">
      <InputWithIcon
        className="remove-arrows-from-input"
        varient="tertiary"
        placeholder="What do you want to listen to?"
        width="full"
        value={searchBoxData.text}
        onFocus={() => {
          navigate(SEARCH.endpoint);
        }}
        onChange={handleTextChange}
        type={searchBoxData.option === "year" ? "number" : "text"}
      />
      <div className="search-options">
        Filter By:{" "}
        <SelectInput
          size="small"
          className="option-selector"
          options={options}
          onChange={(newValue: unknown) =>
            onFilterOptionChange(newValue as FilterSelectorOptionType)
          }
        />
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <div className={getClassName(styles["header"])}>
      <SearchAndFilters />
    </div>
  );
};

export default Header;
