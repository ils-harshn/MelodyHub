import "../styles/SongCardComponent.scss";
import ImageWithSkeleton from "./ImageLoader";

const SongCardComponent = () => {
    return (
        <div className="song-card-component">
            <div className="song-img">
                <ImageWithSkeleton src="https://drive.google.com/uc?id=1LNXKjq6kU3r460fJLh2wjAGIq2Et4lrB&export=download" />
            </div>
            <div className="song-title">
                12 Saal
            </div>
            <div className="album">Honey (2000) sd sd sd kjsdkj hsdkj hskdj hskjdh</div>
            <div className="artists">J Star, Extra</div>
            <div className="views">
                12 views
            </div>
        </div>
    )
}

export default SongCardComponent;