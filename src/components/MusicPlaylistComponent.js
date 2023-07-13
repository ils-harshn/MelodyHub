import { useDispatch, useSelector } from "react-redux";
import "../styles/MusicPlaylistComponent.scss"
import { SET_SONG_INDEX } from "../store/actions/types";

const MusicPlaylistComponent = () => {
    const show = useSelector(reducers => reducers.musicPlayerPlaylistReducer.show);
    const data = useSelector((reducers) => reducers.MusicPlayerReducer);
    const dispatch = useDispatch();

    if (show) {
        return <div id="music-player-playlist">
            <h3>Your current selected playlist have {data.data.length} songs.</h3>
            <ul>
                {
                    data.data.map((item, index) => {
                        return (
                            <li key={item.id} onClick={() => dispatch({ type: SET_SONG_INDEX, payload: { index, } })}>
                                <div className={index === data.current ? "active" : ""}>
                                    <div className="index">
                                        {index + 1}
                                    </div>
                                    <div className="details">
                                        <div className="album-title">{item.album.title}</div>
                                        <div className="original-name">{item.original_name}</div>
                                        <div className="artist-names">{item.artist_set.map(item => item.name).join(", ")}</div>
                                    </div>
                                </div>
                                <div className="button">
                                    {
                                        index === data.current &&
                                        <span className="material-symbols-outlined">
                                            play_arrow
                                        </span>
                                    }
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    } else {
        return null;
    }
}

export default MusicPlaylistComponent;