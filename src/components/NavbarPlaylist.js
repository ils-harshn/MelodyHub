import { useState } from "react";
import { Link } from "react-router-dom";

const NavbarPlaylist = () => {

    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 2000)

    return (
        <div className="playlist-list">
            <div className="title">Playlists</div>
            {loading ?
                <div className="list">
                    <Link className={"loading"}>Arjit songs with Shreya</Link>
                    <Link className={"loading"}>Mohammad Rafi Sahid songs</Link>
                    <Link className={"loading"}>KK with Atif songs</Link>
                    <Link className={"loading"}>Lightings</Link>
                    <Link className={"loading"}>Erok</Link>
                </div> :
                <div className="list">
                    <Link to={"/playlistname/"}>Arjit songs with Shreya</Link>
                    <Link to={"/playlistname/"}>Mohammad Rafi Sahid songs</Link>
                    <Link to={"/playlistname/"}>KK with Atif songs</Link>
                    <Link to={"/playlistname/"}>Lightings</Link>
                    <Link to={"/playlistname/"}>Erok</Link>
                </div>
            }
        </div>
    )
}

export default NavbarPlaylist;