import { useContext, useEffect, useRef } from "react";
import ThemeContext from "../../contexts/ThemeContext";
import styles from "./OptionSelector.module.css";
import { getClassName } from "../../utils";
import { OPTION_SELECTOR_OPENER } from "../../consts/ids";
import { Bolt } from "../../assests/icons";
import { ThemeTypes, themes } from "../../contexts/Context.types";
import { SelectInput } from "../Inputs/Inputs";
import Label from "../Label/Label";

type ThemeOptionType = {
  value: ThemeTypes;
  label: ThemeTypes;
};

const ThemeChanger: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const options: ThemeOptionType[] = themes.map((themeName) => ({
    value: themeName,
    label: themeName,
  }));

  const onChange = (option: ThemeOptionType | null) => {
    themeContext?.toggleTheme(option ? option.value : "light");
  };

  return (
    <>
      <Label varient="secondary">Select Theme (Change)</Label>
      <SelectInput
        defaultValue={{
          value: themeContext?.theme,
          label: themeContext?.theme,
        }}
        options={options}
        onChange={(newValue: unknown) => onChange(newValue as ThemeOptionType)}
      />
    </>
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
        className={getClassName(
          styles["option-selector"],
          "primary-scroll-bar"
        )}
        ref={optionSelectorRef}
      >
        <div className="title">Settings</div>
        <div className="option">
          <ThemeChanger />
        </div>
      </div>
    </div>
  );
};

export default OptionSelector;
