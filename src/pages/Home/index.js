import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { initiateUploadAction } from "../../store/actions/uploadActions"

const Home = () => {
    const dispatch = useDispatch()
    const token = useSelector(reducers => reducers.loginReducer.user.token)
    const uploadReducerState = useSelector(reducers => reducers.uploadReducer)
    const uploadProgress = useSelector(reducers => reducers.uploadReducer.uploadProgress)
    const [selectedFile, setSelectedFile] = useState(null);

    
    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedFile) {
            dispatch(initiateUploadAction(token, selectedFile))
        }
    }
    
    useEffect(() => {
        // console.log("upload reducer", uploadReducerState);
        // console.log("uploadProgress", uploadProgress)
    }, [uploadReducerState, uploadProgress])

    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="file" onChange={handleFileSelect} />
                <button type="submit" disabled={uploadReducerState.loading}>{uploadReducerState.loading ? "Loading" : "Submit"}</button>
            </form>
            <div>{uploadReducerState.uploadProgress}</div>
        </div>
    )
}

export default Home