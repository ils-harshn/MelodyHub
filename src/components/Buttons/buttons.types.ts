import { IconType } from "../../assests/icons.types";

export type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
  varient?: "primary" | "secondary" | "blue";
  width?: "full" | "fit";
  textcase?: "upper-case" | "lower-case" | "capitalize" | "none-text-case";
  Icon?: IconType;
  RightIcon?: IconType;
  loading?: boolean;
};

export type PlayPauseButtonType =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    varient?: "primary" | "secondary";
    size?: "medium" | "large";
    playing: boolean;
  };
