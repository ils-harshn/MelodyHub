import MusicPlayerImageWithSkeleton from "./MusicPlayerImageLoader";
import "../styles/MusicPlayer.scss";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomSongApi, getSongByIdApi, likeSongApi, neutralizeReactionApi } from "../Api";
import Skeleton from "react-loading-skeleton";
import { clearStorage, get_volume, set_volume } from "../utils";
import { SET_PREV_INDEX, SET_SONG, SET_SONG_INDEX, TOGGLE_PLAYLIST } from "../store/actions/types";
import MusicPlaylistComponent from "./MusicPlaylistComponent";

const MusicPlayer = () => {
    const [timeRangeValue, setTimeRangeValue] = useState(0);
    const [volume, setVolume] = useState(get_volume());
    const audio = useRef();

    const data = useSelector((reducers) => reducers.MusicPlayerReducer);
    const loginToken = useSelector(reducers => reducers.loginReducer.user.token);
    const [songData, setSongData] = useState({});
    const [liked, setLiked] = useState(false);

    const dispatch = useDispatch()

    const [playing, setPlaying] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);

    const [fetching, setFetching] = useState(true);
    const [canPlaySong, setCanPlaySong] = useState(false);
    const timeSlider = useRef()

    const fetchSong = async () => {
        setFetching(true)
        setCanPlaySong(false);
        setLiked(false)
        try {
            let song = await getSongByIdApi(loginToken, data.data[data.current].id);
            setSongData(song.data)
            setLiked(song.data.reaction == "like")
        } catch {
            clearStorage()
            window.location.reload()
        }
        setFetching(false)
    }

    const fetchRandomSong = async () => {
        setFetching(true)
        setCanPlaySong(false);
        setLiked(false)
        try {
            let song = await getRandomSongApi();
            setSongData(song.data)
            setLiked(song.data.reaction == "like")

            dispatch({
                type: SET_SONG, payload: {
                    song: song.data,
                    index: 0,
                    data: [song.data,],
                    playlistId: null,
                    page: null,
                    randomly: true,
                }
            })
        } catch {
            clearStorage()
            window.location.reload()
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
        } catch {
            alert("Error")
        }
    }

    const handleAudioEnded = () => {
        if (data.data.length > 1) {
            if (repeat) dispatch({ type: SET_SONG_INDEX, payload: { index: data.current } })
            else if (shuffle) dispatch({ type: SET_SONG_INDEX, payload: { index: Math.floor(Math.random() * data.data.length) } })
            else dispatch({
                type: SET_SONG_INDEX, payload: {
                    index: (data.current + 1) % data.data.length,
                }
            })
        } else {
            if (repeat) dispatch({ type: SET_SONG_INDEX, payload: { index: data.current } })
            else if (shuffle) fetchRandomSong()
        }
    }

    useEffect(() => {
        if (data.randomly == false) fetchSong()
        setTimeRangeValue(0)
        timeSlider.current.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 0%, #fff 0%, white 100%)`
    }, [data])

    return (<>

        <MusicPlaylistComponent />
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
            }} style={{ display: "none" }} onEnded={handleAudioEnded} />}
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
                <span className="material-symbols-outlined" onClick={() => setShuffle(!shuffle)}>
                    {shuffle ? "shuffle_on" : "shuffle"}
                </span>
                <span className={(data.data.length > 1 && data.current != 0) ? "material-symbols-outlined" : "material-symbols-outlined music-button-disabled"} onClick={() => {
                    if ((data.data.length > 1 && data.current != 0)) {
                        dispatch({ type: SET_PREV_INDEX })
                    }
                }}>
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
                <span className={"material-symbols-outlined"} onClick={() => {
                    if ((data.data.length > 1)) {
                        if (shuffle) dispatch({ type: SET_SONG_INDEX, payload: { index: Math.floor(Math.random() * data.data.length) } })
                        else dispatch({
                            type: SET_SONG_INDEX, payload: {
                                index: (data.current + 1) % data.data.length,
                            }
                        })
                    } else {
                        fetchRandomSong()
                    }
                }}>
                    skip_next
                </span>
                <span className="material-symbols-outlined" onClick={() => setRepeat(!repeat)}>
                    {repeat ? "repeat_one_on" : "repeat"}
                </span>
            </div>
            <div className="options-2">
                <span className="material-symbols-outlined">
                    playlist_add
                </span>
                <span className="material-symbols-outlined" onClick={() => dispatch({ type: TOGGLE_PLAYLIST })}>
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
    </>
    )
}

export default MusicPlayer;