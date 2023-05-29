import MusicPlayerImageWithSkeleton from "./MusicPlayerImageLoader";
import "../styles/MusicPlayer.scss";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getSongByIdApi, likeSongApi, neutralizeReactionApi } from "../Api";
import Skeleton from "react-loading-skeleton";
import { get_volume, set_volume } from "../utils";

const MusicPlayer = () => {
    const [timeRangeValue, setTimeRangeValue] = useState(0);
    const [volume, setVolume] = useState(get_volume());
    const audio = useRef();

    const data = useSelector((reducers) => reducers.MusicPlayerReducer);
    const loginToken = useSelector(reducers => reducers.loginReducer.user.token);
    const [songData, setSongData] = useState({});
    const [liked, setLiked] = useState(false);

    const [playing, setPlaying] = useState(false);

    const [fetching, setFetching] = useState(true);
    const [canPlaySong, setCanPlaySong] = useState(false);
    const timeSlider = useRef()

    const fetchSong = async () => {
        setFetching(true)
        setCanPlaySong(false);
        setLiked(false)
        try {
            let song = await getSongByIdApi(loginToken, data.current);
            setSongData(song.data)
            setLiked(song.data.reaction == "like")
        } catch {
            alert("Please reload the page")
        }
        setFetching(false)
    }

    const handleNeutralizeReaction = async () => {
        try {
            if (fetching == false) {
                await neutralizeReactionApi(loginToken, songData.id);
                setLiked(false);
            }
        } catch { }
    }

    const handleLikeReaction = async () => {
        try {
            if (fetching == false) {
                await likeSongApi(loginToken, songData.id)
                setLiked(true)
            }
        } catch { }
    }

    useEffect(() => {
        fetchSong()
        setTimeRangeValue(0);
        timeSlider.current.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 0%, #fff 0%, white 100%)`
    }, [data])

    return (
        <div className="music-player">
            {fetching == false && <audio ref={audio} src={songData.url} onTimeUpdate={() => {
                let value = (audio.current.currentTime * 100) / audio.current.duration;
                setTimeRangeValue(value)
                timeSlider.current.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${value}%, #fff ${value}%, white 100%)`
            }} onCanPlay={() => {
                setCanPlaySong(true)
                audio.current.volume = volume / 100;
                if (playing) {
                    setPlaying(true)
                    audio.current.play();
                }
            }} style={{ display: "none" }} />}
            <input type="range" className="timer-range" min={0} max={100} value={timeRangeValue} step={0.02} ref={timeSlider} onChange={(e) => {
                if (canPlaySong) {
                    let value = (e.target.value * audio.current.duration) / 100;
                    setTimeRangeValue(e.target.value);
                    audio.current.currentTime = value;
                    e.target.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${e.target.value}%, #fff ${e.target.value}%, white 100%)`
                }
            }}></input>
            {
                fetching ?
                    <Skeleton className="skeleton-loader-img-music-player" /> :
                    <MusicPlayerImageWithSkeleton src={songData.album.thumbnail300x300} />
            }
            <div className="song-details">
                {
                    fetching ?
                        <>
                            <div className="title loading">Loeam the gua tha</div>
                            <div className="artists loading">Loeam the gua tha</div>
                        </> :
                        <>
                            <div className="title">{songData.original_name}</div>
                            <div className="artists">{songData.artist_set.map(item => item.name).join(", ")}</div>
                        </>
                }

            </div>
            <div className="options-1">
                {liked ?
                    <span className={"material-symbols-outlined liked"} onClick={handleNeutralizeReaction}>
                        favorite
                    </span>
                    :
                    <span className={"material-symbols-outlined"} onClick={handleLikeReaction}>
                        favorite
                    </span>
                }
            </div>
            <div className="controls">
                <span className="material-symbols-outlined">
                    {/* shuffle */}
                    shuffle_on
                </span>
                <span className="material-symbols-outlined">
                    skip_previous
                </span>
                {
                    canPlaySong ?
                        playing ?
                            <span className="material-symbols-outlined" onClick={() => {
                                if (canPlaySong) {
                                    setPlaying(false)
                                    audio.current.pause();
                                }
                            }}>
                                stop_circle
                            </span> :
                            <span className="material-symbols-outlined" onClick={() => {
                                if (canPlaySong) {
                                    setPlaying(true)
                                    audio.current.play();
                                }
                            }}>
                                play_circle
                            </span>
                        : <span className="material-symbols-outlined cycle">
                            downloading
                        </span>
                }
                <span className="material-symbols-outlined">
                    skip_next
                </span>
                <span className="material-symbols-outlined">
                    repeat
                    {/* repeat_one_on */}
                    {/* repeat_on */}
                </span>
            </div>
            <div className="options-2">
                <span className="material-symbols-outlined">
                    playlist_add
                </span>
                <span className="material-symbols-outlined">
                    queue_music
                </span>
                <span className="material-symbols-outlined">
                    volume_up
                    {/* volume_off */}
                </span>
                <input type="range" min={0} max={100} value={volume} className="volume-range" onChange={(e) => {
                    setVolume(e.target.value);
                    audio.current.volume = (e.target.value) / 100;
                    set_volume(e.target.value)
                }}></input>
            </div>
        </div>
    )
}

export default MusicPlayer;