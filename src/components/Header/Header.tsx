import { getClassName } from "../../utils";
import { InputWithIcon } from "../Inputs/Inputs";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <div className={getClassName(styles["header"])}>
      <div className="search-input">
        <InputWithIcon
          varient="tertiary"
          placeholder="What do you want to listen to?"
          width="full"
        />
      </div>
    </div>
  );
};

export default Header;
