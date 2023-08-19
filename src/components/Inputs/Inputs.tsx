import { InputType } from "./Inputs.types";
import styles from "./Inputs.module.css";
import { getClassName } from "../../utils";

export const TextInput: React.FC<InputType> = ({
  className = "",
  width = "initial",
  varient = "primary",
  ...props
}) => {
  return (
    <input
      className={getClassName(
        className,
        styles["inputs"],
        styles[width],
        styles[varient]
      )}
      type={"text"}
      {...props}
    ></input>
  );
};

export const PasswordInput: React.FC<InputType> = ({
  className = "",
  width = "initial",
  varient = "primary",
  ...props
}) => {
  return (
    <div className={getClassName(styles["password"])}>
      <input
        className={getClassName(
          className,
          styles["inputs"],
          styles[width],
          styles[varient]
        )}
        type={"password"}
        {...props}
      ></input>
      <div className="icon"></div>
    </div>
  );
};
