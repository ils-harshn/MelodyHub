import { getClassName } from "../../utils";
import LabelType from "./Label.type";
import styles from "./Label.module.css";

const Label: React.FC<LabelType> = ({
  children,
  className = "",
  varient = "primary",
  ...props
}) => {
  return (
    <label
      className={getClassName(className, styles["label"], styles[varient])}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
