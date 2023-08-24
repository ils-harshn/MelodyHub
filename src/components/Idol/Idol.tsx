import Logo from "../../assests/icons";
import { getClassName } from "../../utils";
import styles from "./Idol.module.css";
import IdolType from "./Idol.type";

const Idol: React.FC<IdolType> = ({ className = "", size = "large" }) => {
  return (
    <div className={getClassName(className, styles["idol"], styles[size])}>
      <Logo />
      ARythms
    </div>
  );
};

export default Idol;
