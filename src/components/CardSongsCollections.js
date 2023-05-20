import SongCardComponent from "./SongCardComponent";
import "../styles/LikedSongs.scss"


const CardSongsCollections = ({ title }) => {
    return (
        <div className="liked-songs">
            <div className="title">{title}</div>
            <div className="list">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
                    <SongCardComponent />
                ))}
            </div>
        </div>
    )
}

export default CardSongsCollections;