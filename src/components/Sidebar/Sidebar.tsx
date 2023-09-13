import { Heart, Home, Library, Plus, Search } from "../../assests/icons";
import { getClassName } from "../../utils";
import Idol from "../Idol/Idol";
import { SidebarLink } from "../Links/Links";
import styles from "./Sidebar.module.css";
import * as routes from "../../router/routes";
import { SidebarSongImageType } from "./Sidebar.type";
import ImageWithLoader from "../ImageWithLoader/ImageWithLoader";
import { useEffect } from "react";
import { SIDEBAR_CONTAINER_ID, SIDEBAR_OPENER_ID } from "../../consts/ids";
import { generateURLFromID } from "../../utils/helpers/urls";
import { usePlaylistComponentDispatch } from "../../hooks/PlaylistComponentHooks";
import { useMusicPlayerPlaylistData } from "../../hooks/MusicPlayerPlaylistHooks";

const SidebarSongImage: React.FC<SidebarSongImageType> = ({
  className = "",
  ...props
}) => {
  const { currentSong } = useMusicPlayerPlaylistData();
  if (currentSong === undefined) return null;
  else
    return (
      <div
        {...props}
        className={getClassName(className, currentSong ? "show" : "hide")}
      >
        <ImageWithLoader
          src={generateURLFromID(currentSong.album.thumbnail300x300)}
          alt="Loading"
        />
      </div>
    );
};

const Sidebar: React.FC = () => {
  const playlistDispatchData = usePlaylistComponentDispatch();
  useEffect(() => {
    const sidebarcontainer = document.getElementById(SIDEBAR_CONTAINER_ID);
    const handleClick = (event: MouseEvent) => {
      if (
        (event.target as HTMLElement).id !== SIDEBAR_OPENER_ID &&
        sidebarcontainer &&
        !sidebarcontainer.contains(event.target as Node)
      ) {
        sidebarcontainer.classList.remove("open");
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const hideSideBar = () => {
    const sidebarcontainer = document.getElementById(SIDEBAR_CONTAINER_ID);
    sidebarcontainer?.classList.remove("open");
  };

  return (
    <nav className={getClassName(styles["sidebar"])}>
      <div className="logo-container">
        <Idol />
      </div>
      <div className="links">
        <SidebarLink
          Icon={Home}
          title="Home"
          to={routes.HOME.endpoint}
          onClick={hideSideBar}
        />
        <SidebarLink
          Icon={Search}
          title="Search"
          to={routes.SEARCH.endpoint}
          onClick={hideSideBar}
        />
        <SidebarLink
          Icon={Library}
          title="Your Library"
          to={routes.LIBRARY.endpoint}
          onClick={hideSideBar}
        />
      </div>
      <div className="links">
        <SidebarLink
          Icon={Plus}
          title="Create Playlist"
          to={routes.LIBRARY.endpoint}
          state={{
            openPlaylists: true,
          }}
          activeLinkType={false}
          onClick={() => {
            hideSideBar();
            playlistDispatchData({
              type: "TOGGLE",
              payload: { open: true, addToSong: undefined },
            });
          }}
        />
        <SidebarLink
          Icon={Heart}
          title="Liked Songs"
          to={routes.LIKED_SONGS.endpoint}
          onClick={hideSideBar}
        />
      </div>

      <SidebarSongImage className="image-container" />
    </nav>
  );
};

export default Sidebar;
