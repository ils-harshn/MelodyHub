import { useLocation, useNavigate } from "react-router-dom";
import "../styles/createPlaylistMainScreen.scss"
import { useState } from "react";
import { set_and_validate_field } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { INITIATE_CREATE_PLAYLIST } from "../store/actions/types";

const CreatePlaylistMainScreen = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState(true);
    const data = useSelector((reducers) => reducers.loginReducer);
    const createPlaylistData = useSelector(reducers => reducers.createPlaylistReducer);
    const dispatch = useDispatch();
    const locationParams = new URLSearchParams(useLocation().search);
    const lastLocation = locationParams.get("location") || "/library"

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: INITIATE_CREATE_PLAYLIST, payload: {
            token: data.user.token,
            title: name,
        }})
    }

    return (
        <div id="create-playlist-main-screen">
            <div className="form-container">
                <div className="cross-button">
                    <span className="material-symbols-outlined" onClick={() => navigate(lastLocation)}>
                        cancel
                    </span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="title">Create Playlist</div>
                    <input placeholder="Enter Playlist Name" onChange={(e) => set_and_validate_field(e.target.value, setName, setNameError, "*")}/>
                    <div className="error">{ createPlaylistData.error || nameError}</div>
                    <button type="submit" disabled={ nameError || createPlaylistData.loading }>Create</button>
                    <div className="success">{ createPlaylistData.success }</div>
                </form>
            </div>
        </div>
    )
}

export default CreatePlaylistMainScreen;