import { CheckBoxType, InputType, PasswordInputType } from "./Inputs.types";
import styles from "./Inputs.module.css";
import { getClassName } from "../../utils";
import { useState } from "react";
import { CheckMark, EyeClosed, EyeOpen } from "../../assests/icons";
// import { EyeClosed } from "../../assests/icons";

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

export const PasswordInput: React.FC<PasswordInputType> = ({
  className = "",
  width = "initial",
  varient = "primary",
  passwordVisibility = false,
  IconWhenVisible = EyeOpen,
  IconWhenHidden = EyeClosed,
  ...props
}) => {
  const [show, toggleShow] = useState(passwordVisibility);

  return (
    <div
      className={getClassName(styles["password"], styles[`password-${width}`])}
    >
      <input
        className={getClassName(className, styles["inputs"], styles[varient])}
        type={show ? "text" : "password"}
        {...props}
      ></input>
      <div className="icon" onClick={() => toggleShow(!show)}>
        {show ? <IconWhenVisible /> : <IconWhenHidden />}
      </div>
    </div>
  );
};

export const CheckBox: React.FC<CheckBoxType> = ({
  className = "",
  ...props
}) => {
  return (
    <div className={getClassName(className, styles["checkbox"])}>
      <input type="checkbox" {...props} />
      <CheckMark />
    </div>
  );
};
