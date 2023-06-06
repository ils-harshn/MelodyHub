import { useEffect } from "react";
import EmptyHeader from "../../components/EmptyHeader";
import "./Home.scss";
import MainLoader from "../../components/MainLoader";
import { useDispatch, useSelector } from "react-redux";
import * as likedSongsActions from "../../store/actionsTypes"
import LikedSongsComponent, { CommonSongsComponent } from "../../components/CardSongsCollections";
import * as mostViewedSongsActions from "../../store/actionsTypes";


const Home = () => {
    // const loading = true;
    const dispatch = useDispatch();
    const likedSongs = useSelector((reducers) => reducers.likedSongsReducers)
    const mostViewedSongs = useSelector((reducers) => reducers.mostViewedSongsReducer)
    const data = useSelector((reducers) => reducers.loginReducer);

    useEffect(() => {
        dispatch({ type: likedSongsActions.INITIATE_LIKED_SONGS, payload: { page: 1, token: data.user.token } });
        dispatch({ type: mostViewedSongsActions.INITIATE_GET_MOST_VIEWED_SONGS, payload: { token: data.user.token } });
    }, [])

    return (<>
        {
            likedSongs.loading || mostViewedSongs.loading ? <MainLoader /> :
                <div className="home-page">
                    <EmptyHeader />
                    {likedSongs.data.results.length > 0 && 
                    <div className="container">
                        <LikedSongsComponent title={"Liked Songs"} data={likedSongs.data} />
                    </div>
                    }
                    <div className="container" >
                        <CommonSongsComponent title={"Most Viewed Songs"} data={mostViewedSongs.data} />
                    </div>
                </div>
        }
    </>
    )
}

export default Home;