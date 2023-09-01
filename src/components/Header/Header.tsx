import { getClassName } from "../../utils";
import { InputWithIcon, SelectInput } from "../Inputs/Inputs";
import styles from "./Header.module.css";
import { SEARCH } from "../../router/routes";
import {
  useSearchBoxData,
  useSearchBoxDispatch,
} from "../../hooks/SearchBoxHooks";
import { useNavigate } from "react-router-dom";

const SearchAndFilters: React.FC = () => {
  const navigate = useNavigate();
  const searchBoxData = useSearchBoxData();
  const dispatch = useSearchBoxDispatch();

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

  return (
    <div
      className="search-input"
    >
      <InputWithIcon
        varient="tertiary"
        placeholder="What do you want to listen to?"
        width="full"
        value={searchBoxData.text}
        onFocus={() => navigate(SEARCH.endpoint)}
        onChange={handleTextChange}
      />
      <div className="search-options">
        Filter By: <SelectInput />
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
