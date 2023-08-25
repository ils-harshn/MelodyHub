import { getClassName } from "../../utils";
import MusicPlayerType from "./MusicPlayer.types";
import styles from "./MusicPlayer.module.css";
// import { useState } from "react";
// import { TRIOLOGY_ID } from "../../consts/ids";

const MusicPlayer: React.FC<MusicPlayerType> = ({ className = "" }) => {
  //   const [open, setOpen] = useState<"open" | "">("");
  //   const ele = document.getElementById(TRIOLOGY_ID);

  //   const handleOpen = () => {
  //     setOpen((open) => {
  //       const returnValue = open === "" ? "open" : "";
  //       if (ele) {
  //         ele.style.height =
  //           returnValue === "open" ? "calc(100vh - 90px)" : "100vh";
  //       }
  //       return returnValue;
  //     });
  //   };

  return (
    <div
      //   className={getClassName(className, styles["music-player"], open)}
      className={getClassName(className, styles["music-player"])}
    ></div>
  );
};

export default MusicPlayer;
