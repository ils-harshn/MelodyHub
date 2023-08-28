import {
  CheckBoxType,
  InputType,
  InputWithIconType,
  PasswordInputType,
} from "./Inputs.types";
import styles from "./Inputs.module.css";
import { getClassName } from "../../utils";
import { useState } from "react";
import { CheckMark, EyeClosed, EyeOpen, Search } from "../../assests/icons";

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
      <div
        className={getClassName(
          "icon",
          varient === "tertiary" ? "tertiary-icon" : ""
        )}
        onClick={() => toggleShow(!show)}
      >
        {show ? <IconWhenVisible /> : <IconWhenHidden />}
      </div>
    </div>
  );
};

export const InputWithIcon: React.FC<InputWithIconType> = ({
  className = "",
  width = "initial",
  varient = "primary",
  Icon = Search,
  ...props
}) => {
  return (
    <div
      className={getClassName(
        styles["input-with-icon"],
        styles[`input-with-icon-${width}`]
      )}
    >
      <div
        className={getClassName(
          "icon",
          varient === "tertiary" ? "tertiary-icon" : ""
        )}
      >
        <Icon />
      </div>
      <input
        className={getClassName(className, styles["inputs"], styles[varient])}
        type={"text"}
        {...props}
      ></input>
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
