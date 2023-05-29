import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import { useEffect, useState } from "react";
import * as likedSongsActions from "../../store/actions/likedSongsActions"

const LikedSongPage = () => {
    const dispatch = useDispatch();
    const likedSongs = useSelector((reducers) => reducers.likedSongsReducers)
    const [songsList, setSongsList] = useState([]);
    const data = useSelector((reducers) => reducers.loginReducer);
    const [page, setPage] = useState(1);
    const [fetchingMore, setFetchingMore] = useState(false);

    useEffect(() => {
        dispatch({ type: likedSongsActions.INITIATE_LIKED_SONGS, payload: { page, token: data.user.token } });
    }, [page])

    useEffect(() => {
        if (likedSongs.loading == false) {
            setSongsList(prevSongs => [...prevSongs, ...likedSongs.data.results])
        }
    }, [likedSongs])



    return (
        <div className="liked-songs-page">
            <div className="jumbotron">
                <span className="material-symbols-outlined">
                    favorite
                </span>
                <div className="description">
                    <h1>Favorite Songs</h1>
                    <div>A blend of music that have been liked by you.</div>
                    <div>Containing about: 50 songs.</div>
                </div>
                <div className="options">
                    <span className="material-symbols-outlined play-arrow">
                        play_arrow
                    </span>
                </div>
            </div>
            <div className="liked-songs-main" onScroll={(e) => {
                const element = e.target;
                if ((element.scrollTop + element.clientHeight >=
                    element.scrollHeight) && likedSongs.data.next) {
                    setFetchingMore(true)
                    setPage(prevPage => prevPage + 1)
                }
            }}>
                {
                    (likedSongs.loading && !fetchingMore) ? <table className="table loading">
                        <thead>
                            <tr>
                                <th>INDEX</th>
                                <th>TITLE</th>
                                <th>ALBUM</th>
                                <th>CODE</th>
                                <th>YEAR</th>
                                <th>LISTENS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(24)].map((_, index) => (
                                <tr key={index}>
                                    <th scope="row">00</th>
                                    <td>Lorem ipsum dolor</td>
                                    <td>Lorem ipsum dolor</td>
                                    <td>Lorem</td>
                                    <td>0000</td>
                                    <td>00</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> :

                        songsList && songsList.length ?
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>INDEX</th>
                                        <th>TITLE</th>
                                        <th>ALBUM</th>
                                        <th>CODE</th>
                                        <th>YEAR</th>
                                        <th>LISTENS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        songsList.map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.song.original_name}</td>
                                                <td>{item.song.album.title}</td>
                                                <td>{item.song.album.code}</td>
                                                <td>{item.song.album.year}</td>
                                                <td>{item.song.views}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table> :
                            <div className="not-found">
                                Not liked any songs yet.
                            </div>
                }
            </div>
        </div>
    )
}

export default LikedSongPage;