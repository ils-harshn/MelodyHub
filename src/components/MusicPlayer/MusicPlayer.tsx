import { getClassName } from "../../utils";
import MusicPlayerType from "./MusicPlayer.types";
import styles from "./MusicPlayer.module.css";
import { useEffect, useState } from "react";
import { TRIOLOGY_ID } from "../../consts/ids";

const MusicPlayer: React.FC<MusicPlayerType> = ({ className = "" }) => {
  const [open, setOpen] = useState<"open" | "">("");

  const handleOpen = () => {
    setOpen((open) => (open === "" ? "open" : ""));
  };

  useEffect(() => {
    const ele = document.getElementById(TRIOLOGY_ID);
    if (ele) {
      ele.style.height = open === "open" ? "calc(100vh - 90px)" : "100vh";
    }
  }, [open]);

  return (
    <>
      <div onClick={handleOpen}>Tggle</div>
      <div
        className={getClassName(className, styles["music-player"], open)}
      ></div>
    </>
  );
};

export default MusicPlayer;
