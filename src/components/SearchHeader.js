import { useEffect, useState } from "react";
import "../styles/SearchHeader.scss"
import { useDispatch, useSelector } from "react-redux";
import { INITIATE_SEARCH_SONGS } from "../store/actionsTypes";

const SearchHeader = () => {
    const [index, setIndex] = useState(0);
    const options = [
        ["Song", "original_name"],
        ["Genre", "genre"],
        ["Artist", "artist__name"],
        ["Album", "album__title"],
        ["Year", "year"],
        ["Album Code", "album__code"]
    ]

    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    const data = useSelector((reducers) => reducers.loginReducer);
    const songsdata = useSelector(reducers => reducers.searchSongsReducer);


    useEffect(() => {
        let payload = {
            page,
            token: data.user.token,
            original_name: (index == 0 ? searchText : ""),
            genre: (index == 1 ? searchText : ""),
            artist__name: (index == 2 ? searchText : ""),
            album__title: (index == 3 ? searchText : ""),
            year: (index == 4 ? searchText : ""),
            album__code: (index == 5 ? searchText : ""),
        }
        dispatch({ type: INITIATE_SEARCH_SONGS, payload });
    }, [searchText, page, index])

    return (
        <div className="SearchHeader">
            {
                index == 4 ?
                    <input type="number" placeholder="Search" value={searchText} onChange={(e) => {
                        setPage(1);
                        setSearchText(e.target.value)
                    }} /> :
                    <input type="text" placeholder="Search" value={searchText} onChange={(e) => {
                        setPage(1);
                        setSearchText(e.target.value)
                    }} />
            }
            <div className="drop-down-container">
                <div className="current">Filter: {options[index][0]}</div>
                <div className="drop-down-for-filter">
                    {options.map((item, index) => (
                        <div className="drop-down-filter-option" key={index} onClick={() => {
                            setIndex(index)
                            setPage(1);
                            // console.log(page, "Changed")
                        }}>
                            {item[0]}
                        </div>))}
                </div>
            </div>
            {
                (!songsdata.loading && !songsdata.error) &&
                <>
                    <div className="search-song-pagination">
                        <div>
                            <button disabled={songsdata.data.previous == null} onClick={() => {
                                if (songsdata.data.previous) setPage(page => page - 1);
                            }}><span className="material-symbols-outlined">
                                    navigate_before
                                </span></button>
                            <button disabled={songsdata.data.next == null} onClick={() => {
                                if (songsdata.data.next) setPage(page => page + 1);
                            }}><span className="material-symbols-outlined">
                                    navigate_next
                                </span></button>
                        </div>
                        <div>Total Searchs: {songsdata.data.count}</div>
                    </div>
                </>
            }
        </div>
    )
}

export default SearchHeader;