import { getClassName } from "../../utils";
import styles from "./Library.module.css";

const Library: React.FC = () => {
  return <div className={getClassName(styles["library"])}>Library</div>;
};

export default Library;
