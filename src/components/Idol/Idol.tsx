import Logo from "../../assests/icons";
import { getClassName } from "../../utils";
import styles from "./Idol.module.css";
import IdolType from "./Idol.type";

const Idol: React.FC<IdolType> = ({ size = "large" }) => {
  return (
    <div className={getClassName(styles["idol"], styles[size])}>
      <Logo />
      ARythms
    </div>
  );
};

export default Idol;
