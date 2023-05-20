import { useEffect, useState } from "react";
import "../styles/SearchHeader.scss"
import { useDispatch, useSelector } from "react-redux";
import { INITIATE_SEARCH_SONGS } from "../store/actions/searchSongsActions";

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

    const dispatch = useDispatch();
    const data = useSelector((reducers) => reducers.loginReducer);


    useEffect(() => {
        let payload = {
            page: 1, 
            token: data.user.token,
            original_name: (index==0 ? searchText: ""),
            genre: (index==1 ? searchText: ""),
            artist__name: (index==2 ? searchText: ""),
            album__title: (index==3 ? searchText: ""),
            year: (index==4 ? searchText: ""),
            album__code: (index==5 ? searchText: ""),
        }
        dispatch({ type: INITIATE_SEARCH_SONGS, payload });
    }, [searchText])

    return <div className="SearchHeader">
        <input type="text" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
        <div className="drop-down-container">
            <div className="current">Filter: {options[index][0]}</div>
            <div className="drop-down-for-filter">
                {options.map((item, index) => (
                <div className="drop-down-filter-option" key={index} onClick={() => setIndex(index)}>
                    {item[0]}
                </div>))}
            </div>
        </div>
    </div>
}

export default SearchHeader;