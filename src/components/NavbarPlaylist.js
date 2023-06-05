import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlaylistsApi } from "../Api";
import { useSelector } from "react-redux";

const NavbarPlaylist = () => {
    const [playlistsData, setPlaylistsData] = useState();
    const [loading, setLoading] = useState(true);
    const data = useSelector((reducers) => reducers.loginReducer);

    const fetchPlaylistData = async () => {
        setLoading(true)
        let playlist_data = await getPlaylistsApi(data.user.token);
        setPlaylistsData(playlist_data.data.results.slice(0, 5))
        setLoading(false)
    }

    useEffect(() => {
        fetchPlaylistData()
    }, [])

    return (
        <div className="playlist-list">
            {loading ?
                <>
                    <div className="title">Playlists</div>
                    <div className="list">
                        <Link className={"loading"}>Arjit songs with Shreya</Link>
                        <Link className={"loading"}>Mohammad Rafi Sahid songs</Link>
                        <Link className={"loading"}>KK with Atif songs</Link>
                        <Link className={"loading"}>Lightings</Link>
                        <Link className={"loading"}>Erok</Link>
                    </div>
                </> :
                playlistsData.length == 0 ? <div className="title none">
                    <div className="list"><a></a></div>
                </div> : <>
                    <div className="title">Playlists</div>
                    <div className="list">
                        {
                            playlistsData.map((item, index) =>
                                <Link to={`/playlist/${item.title}`} key={index}>{item.title}</Link>
                            )}
                    </div>
                </>
            }
        </div>
    )
}

export default NavbarPlaylist;