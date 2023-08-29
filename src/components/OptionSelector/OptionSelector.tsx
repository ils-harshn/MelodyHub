import { useContext, useEffect, useRef } from "react";
import ThemeContext from "../../contexts/ThemeContext";
import styles from "./OptionSelector.module.css";
import { getClassName } from "../../utils";
import { OPTION_SELECTOR_OPENER } from "../../consts/ids";
import { Bolt } from "../../assests/icons";
import { themes } from "../../contexts/Context.types";

const ThemeChanger: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  console.log(themes)
  return (
    <button
      className="theme-changer"
      onClick={() =>
        themeContext?.toggleTheme(
          themeContext.theme === "light" ? "dark" : "light"
        )
      }
    >
      {themeContext?.theme === "light" ? "D" : "L"}
    </button>
  );
};

const OptionSelector: React.FC = () => {
  const optionSelectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        (event.target as HTMLElement).id !== OPTION_SELECTOR_OPENER &&
        optionSelectorRef.current &&
        !optionSelectorRef.current.contains(event.target as Node)
      ) {
        optionSelectorRef.current.classList.remove("open");
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [optionSelectorRef]);

  const openOptionSelector = () => {
    optionSelectorRef.current?.classList.add("open");
  };

  return (
    <div className={getClassName(styles["option-selector-container"])}>
      <div
        className="opener"
        onClick={openOptionSelector}
        id={OPTION_SELECTOR_OPENER}
      >
        <Bolt />
      </div>
      <div
        className={getClassName(styles["option-selector"])}
        ref={optionSelectorRef}
      >
        <ThemeChanger />
      </div>
    </div>
  );
};

export default OptionSelector;
