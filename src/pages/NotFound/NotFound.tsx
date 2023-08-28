import { Link } from "react-router-dom";
import Idol from "../../components/Idol/Idol";
import { getClassName } from "../../utils";
import styles from "./NotFound.module.css";
import { HOME } from "../../router/routes";

const NotFound: React.FC = () => {
  return (
    <div className={getClassName(styles["not-found"])}>
      <div>
        <Idol size="large" />
        <div className="text">
          Page Not Found <Link to={HOME.endpoint}>Go to home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
