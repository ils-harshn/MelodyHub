import { LinkProps } from "react-router-dom";
import { IconType } from "../../assests/icons.types";

export type AType = LinkProps & {
  children?: string;
  size?: "small" | "medium" | "large";
  varient?: "primary" | "secondary";
  underline?: "underline-none" | "underline";
};

export type SidebarLinkType = LinkProps & {
  title: string;
  Icon: IconType;
  activeLinkType?: boolean;
};
