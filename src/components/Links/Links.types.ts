import { LinkProps } from "react-router-dom";

export type AType = LinkProps & {
    children?: string;
    size?: "small" | "medium" | "large";
};