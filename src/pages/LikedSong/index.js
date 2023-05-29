import { useSelector } from "react-redux";
import "./index.scss";
import { useEffect, useState } from "react";
import { getLikedSongsApi } from "../../Api";

const LikedSongPage = () => {
    const [songsData, setSongsData] = useState({
        count: 0,
        next: null,
        previous: null,
        results: [],
    });
    const data = useSelector((reducers) => reducers.loginReducer);
    const [page, setPage] = useState(1);
    const [fetchingMore, setFetchingMore] = useState(false);

    const fetchSong = async () => {
        try {
            setFetchingMore(true)
            let songsApiData = await getLikedSongsApi(data.user.token, page);
            setSongsData((prevSongsData => {
                return {
                    count: songsApiData.data.count,
                    next: songsApiData.data.next,
                    previous: songsApiData.data.previous,
                    results: [...prevSongsData.results, ...songsApiData.data.results]
                }
            }))
            setFetchingMore(false)
        } catch {
            console.log("Error")
        }
    }

    useEffect(() => {
        fetchSong()
    }, [page])

    useEffect(() => {
        console.log(page)
    }, [songsData])

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
                    element.scrollHeight) && songsData.next && fetchingMore == false) {
                    setPage(prevPage => prevPage + 1)
                }
            }}>
                {
                    (fetchingMore && page == 1) ? <table className="table loading">
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

                        songsData.results.length ?
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
                                        songsData.results.map((item, index) => (
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

                                    {
                                        fetchingMore &&
                                        (
                                            <>
                                                <tr className="loading">
                                                    <th scope="row">00</th>
                                                    <td>Lorem ipsum dolor</td>
                                                    <td>Lorem ipsum dolor</td>
                                                    <td>Lorem</td>
                                                    <td>0000</td>
                                                    <td>00</td>
                                                </tr>
                                                <tr className="loading">
                                                    <th scope="row">00</th>
                                                    <td>Lorem ipsum dolor</td>
                                                    <td>Lorem ipsum dolor</td>
                                                    <td>Lorem</td>
                                                    <td>0000</td>
                                                    <td>00</td>
                                                </tr>
                                            </>
                                        )
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