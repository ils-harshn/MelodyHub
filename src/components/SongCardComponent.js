import { useDispatch, useSelector } from "react-redux";
import "../styles/SongCardComponent.scss";
import ImageWithSkeleton from "./ImageLoader";
import { SET_SONG_ID } from "../store/actions/types";

const SongCardComponent = ({ item }) => {
    const dispatch = useDispatch();
    const musicPlayerData = useSelector((reducers) => reducers.MusicPlayerReducer);

    return (
        <div className="song-card-component" key={item.id} onClick={() => dispatch({ type: SET_SONG_ID, payload: { id: item.id } })}>
            <div className="song-img">
                <ImageWithSkeleton src={item.album.thumbnail300x300} />
            </div>
            <div className={item.id == musicPlayerData.current ? "song-title active": "song-title"}>
                {item.original_name}
            </div>
            <div className="album">{item.album.title} ({item.album.year})</div>
            <div className="artists">{item.artist_set.map(item => item.name).join(", ")}</div>
            <div className="views">
                {item.views} listened
            </div>
        </div>
    )
}

export default SongCardComponent;