import { IconType } from "../../assests/icons.types";
import { Props as ReactSelectType } from "react-select";

type Input = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export type InputType = Input & {
  varient?: "primary" | "secondary" | "tertiary";
  width?: "initial" | "full";
};

export type InputWithIconType = React.InputHTMLAttributes<HTMLInputElement> & {
  Icon?: IconType;
  varient?: "primary" | "secondary" | "tertiary";
  width?: "initial" | "full";
};

export type PasswordInputType = InputType & {
  IconWhenVisible?: IconType;
  IconWhenHidden?: IconType;
  passwordVisibility?: boolean;
};

export type CheckBoxType = Input;

export type SelectInputType = ReactSelectType & {
  size?: "small" | "large";
};
