import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { initiateUploadAction } from "../../store/actions/uploadActions"
import { Link } from "react-router-dom"

const Home = () => {
    // const dispatch = useDispatch()
    // const token = useSelector(reducers => reducers.loginReducer.user.token)
    // const uploadReducerState = useSelector(reducers => reducers.uploadReducer)
    // const [selectedFile, setSelectedFile] = useState(null);
    // const [progress, setProgress] = useState(0)

    
    // const handleFileSelect = (event) => {
    //     setSelectedFile(event.target.files[0]);
    //     setProgress(0)
    // };
    
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     if (selectedFile) {
    //         dispatch(
    //             initiateUploadAction(
    //                 token, 
    //                 selectedFile,
    //                 // callback for onUpload
    //                 (progressEvent) => {
    //                     setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100))
    //                 }
    //             )
    //         )
    //     }
    // }

    return (
        <div>
            {/* <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="file" onChange={handleFileSelect} />
                <button type="submit" disabled={uploadReducerState.loading}>{uploadReducerState.loading ? "Loading" : "Submit"}</button>
            </form>
            <div>{progress}</div> */}
            <Link to={"add-album"}>Add Album</Link>
        </div>
    )
}

export default Home