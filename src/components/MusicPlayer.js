import MusicPlayerImageWithSkeleton from "./MusicPlayerImageLoader";
import "../styles/MusicPlayer.scss";

const MusicPlayer = () => {
    return (
        <div className="music-player">
            <MusicPlayerImageWithSkeleton src="https://drive.google.com/uc?id=1LNXKjq6kU3r460fJLh2wjAGIq2Et4lrB&export=download" />
            <div className="controls">
                <input type="range" />
                
            </div>
        </div>
    )
}

export default MusicPlayer;