import { useSelector } from "react-redux";
import SearchHeader from "../../components/SearchHeader";
import "../../styles/Search.scss";
import Skeleton from "react-loading-skeleton";
import { CommonSongsComponent } from "../../components/CardSongsCollections";

const Search = () => {
    const data = useSelector(reducers => reducers.searchSongsReducer);

    return <div className="search-page">
        <SearchHeader />
        <div className="searched-songs">
            {data.loading ?
                [...Array(12)].map((item, index) => <Skeleton key={index} width={200} height={280} className="search-song-skeleton-loader" />)
                :
                <CommonSongsComponent title={"What you wanna listen?"} data={data.data.results} />
            }
        </div>
    </div>
}

export default Search;