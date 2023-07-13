import SongCardComponent from "./SongCardComponent";
import "../styles/LikedSongs.scss"


const LikedSongsComponent = ({ title, data }) => {
    return (
        <div className="liked-songs">
            <div className="title">{title}</div>
            <div className="list">
                {data.results.map((item, index) => (
                    <SongCardComponent item={item.song} key={index}/>
                ))}
            </div>
        </div>
    )
}

export const CommonSongsComponent = ({ title, data }) => {
    if (data.length === 0) { title = "Found Nothing"}
    return (
        <div className="liked-songs">
            <div className="title">{title}</div>
            <div className="list">
                {data.map((item, index) => (
                    <SongCardComponent item={item} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default LikedSongsComponent;