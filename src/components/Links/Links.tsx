import { Link, NavLink } from "react-router-dom";
import { AType, SidebarLinkType } from "./Links.types";
import styles from "./Links.module.css";
import { getClassName } from "../../utils";

const A: React.FC<AType> = ({
  children,
  className = "",
  size = "medium",
  varient = "primary",
  underline = "underline",
  ...props
}) => {
  return (
    <Link
      className={getClassName(
        className,
        styles["link"],
        styles[size],
        styles[varient],
        underline
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export const SidebarLink: React.FC<SidebarLinkType> = ({
  title,
  Icon,
  className = "",
  ...props
}) => {
  return (
    <div className={getClassName(styles["sidebar-link"], className)}>
      <NavLink {...props}>{title}</NavLink>
      <Icon />
    </div>
  );
};

export default A;
