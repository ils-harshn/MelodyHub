import { useContext, useEffect, useRef } from "react";
import ThemeContext from "../../contexts/ThemeContext";
import styles from "./OptionSelector.module.css";
import { getClassName } from "../../utils";
import { OPTION_SELECTOR_OPENER } from "../../consts/ids";
import { Bolt, CollapseIn, CollapseOut, Logout } from "../../assests/icons";
import { themes } from "../../contexts/Context.types";
import { SelectInput } from "../Inputs/Inputs";
import Label from "../Label/Label";
import { ThemeOptionType } from "./OptionSelector.types";
import { useState } from "react";
import { useToken, useTokenDispatch } from "../../hooks/TokenHooks";

const LogoutOutOption: React.FC = () => {
  const { token } = useToken();
  const dispatch = useTokenDispatch();

  if (token === "") return null;

  return (
    <>
      <div
        className="logout-box"
        onClick={() =>
          dispatch({
            type: "REMOVE_TOKEN",
          })
        }
      >
        <Label varient="secondary">Logout</Label>
        <div className="logout-button">
          <Logout />
        </div>
      </div>
    </>
  );
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

const CollapseBox = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => alert("Error while entering fullscreen"));
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => setIsFullscreen(false))
          .catch((err) => alert("Error while exiting fullscreen"));
      }
    }
  };

  return (
    <div className="collapse-box">
      <Label varient="secondary">Toggle Screen Resolution</Label>
      <div onClick={toggleFullscreen} className="collapse-box-toggler">
        {isFullscreen ? <CollapseIn /> : <CollapseOut />}
      </div>
    </div>
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
        <div className="option">
          <CollapseBox />
        </div>
        <div className="option">
          <LogoutOutOption />
        </div>
      </div>
    </div>
  );
};

export default OptionSelector;
