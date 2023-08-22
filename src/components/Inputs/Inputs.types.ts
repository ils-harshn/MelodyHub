import { IconType } from "../../assests/icons.types";

export type InputType = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  varient?: "primary" | "secondary";
  width?: "initial" | "full";
  passwordVisibility?: boolean;
};

export type PasswordInputType = InputType & {
  IconWhenVisible?: IconType;
  IconWhenHidden?: IconType;
};
