import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as recentSongsActions from "../../store/actions/recentSongsActions";
import LikedSongsComponent from "../../components/CardSongsCollections";
import MainLoader from "../../components/MainLoader";
import "./index.scss"

const Library = () => {
    const data = useSelector((reducers) => reducers.loginReducer);
    const dispatch = useDispatch();
    const recentSongsData = useSelector((reducers) => reducers.recentSongsReducers);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch({ type: recentSongsActions.INITIATE_RECENT_SONGS, payload: { page: page, token: data.user.token } });
    }, [])

    return (
        <div className="library-page">
            <div className="recent-songs-list">
                {
                    recentSongsData.loading ? <MainLoader /> :
                        recentSongsData.data.results.length > 0 &&
                        <div className="container">
                            <LikedSongsComponent title={"Recent Songs"} data={recentSongsData.data} />
                        </div>
                }
            </div>
        </div>
    )
}

export default Library;