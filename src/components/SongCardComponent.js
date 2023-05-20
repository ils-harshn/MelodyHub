import "../styles/SongCardComponent.scss";
import ImageWithSkeleton from "./ImageLoader";

const SongCardComponent = ({ item }) => {
    return (
        <div className="song-card-component" key={item.id}>
            <div className="song-img">
                <ImageWithSkeleton src={item.album.thumbnail300x300} />
            </div>
            <div className="song-title">
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