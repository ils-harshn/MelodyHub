import { Heart, Home, Library, Plus, Search } from "../../assests/icons";
import { getClassName } from "../../utils";
import Idol from "../Idol/Idol";
import { SidebarLink } from "../Links/Links";
import styles from "./Sidebar.module.css";
import * as routes from "../../router/routes";
import { SidebarSongImageType } from "./Sidebar.type";
import { useState } from "react";
import { Loader } from "../Loaders/Loaders";

const ImageWithLoader: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      {!loaded && <Loader />}
      <img
        src={
          "https://drive.google.com/uc?id=15IFPEtrZ9_aZ_a0T1ZeraswlNvElvkb0&export=download"
        }
        alt={"loading"}
        onLoad={handleImageLoad}
        style={{ display: loaded ? "block" : "none" }}
      />
    </>
  );
};

const SidebarSongImage: React.FC<SidebarSongImageType> = ({ ...props }) => {
  return (
    <div {...props}>
      <ImageWithLoader />
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <nav className={getClassName(styles["sidebar"])}>
      <div className="logo-container">
        <Idol />
      </div>
      <div className="links">
        <SidebarLink Icon={Home} title="Home" to={routes.HOME.endpoint} />
        <SidebarLink Icon={Search} title="Search" to={routes.SEARCH.endpoint} />
        <SidebarLink
          Icon={Library}
          title="Your Library"
          to={routes.LIBRARY.endpoint}
        />
      </div>
      <div className="links">
        <SidebarLink
          Icon={Plus}
          title="Create Playlist"
          to={routes.CREATE_PLAYLIST.endpoint}
        />
        <SidebarLink
          Icon={Heart}
          title="Liked Songs"
          to={routes.LIKED_SONGS.endpoint}
        />
      </div>

      <SidebarSongImage className="image-container" />
    </nav>
  );
};

export default Sidebar;
