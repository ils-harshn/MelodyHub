import { IconType } from "../../assests/icons.types";

type Input = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export type InputType = Input & {
  varient?: "primary" | "secondary";
  width?: "initial" | "full";
  passwordVisibility?: boolean;
};

export type PasswordInputType = InputType & {
  IconWhenVisible?: IconType;
  IconWhenHidden?: IconType;
};

export type CheckBoxType = Input;
