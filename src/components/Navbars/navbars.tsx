import { getClassName } from "../../utils";
import Idol from "../Idol/Idol";
import styles from "./navbars.module.css";

const AuthNavbar: React.FC = () => {
  return (
    <nav className={getClassName(styles["auth-nav-bar"])}>
      <Idol />
    </nav>
  );
};

export { AuthNavbar };
