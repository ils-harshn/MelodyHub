import { useEffect, useState } from "react"
import { FormTitle, FormWhenCentered } from "../../styles/Forms/FormStyled.styles";
import { FormError, FormFileInput, FormInput, FormInputGroup, FormInputLabel, FormSubmitButton, SelectItem, SelectedContainer, Selector } from "../../styles/Forms/FieldsStyled.styles";
import { CenterElementsContainerWithScaleInEffectEffect } from "../../styles/Containers/CenterElementsContainer.styles";
import { useDispatch, useSelector } from "react-redux";
import { initiateSearchAlbumAction, resetSearchAlbumAction } from "../../store/actions/searchAlbumActions";
import { initiateSearchArtistAction, resetSearchArtistAction } from "../../store/actions/searchArtistActions";
import { initiateSearchGenreAction, resetSearchGenreAction } from "../../store/actions/searchGenreActions";
import { checkSongTitleExistsAPI, createSongAPI } from "../../api/adminAPIs";
import uploadAPIs from "../../api/fileUploadAPIs";
import { useNavigate } from "react-router-dom";

const AddSong = () => {
    const [data, setData] = useState({
        artist: {
            list: [],
            current: "",
            error: null,
        },
        genre: {
            id: null,
            name: "",
            error: null,
        },
        title: {
            current: "",
            error: null,
        },
        album: {
            id: null,
            code: "",
            title: "",
            error: null,
        },
        file: {
            current: null,
            error: null,
        }
    })

    const [progress, setProgress] = useState(0)
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const token = useSelector(reducers => reducers.loginReducer.user.token)
    const searchAlbumReducerState = useSelector(reducers => reducers.searchAlbumReducer)
    const searchArtistReducerState = useSelector(reducers => reducers.searchArtistReducer)
    const searchGenreReducerState = useSelector(reducers => reducers.searchGenreReducer)


    const handleSubmit = (e) => {
        e.preventDefault()
        setProgress(0)
        setData(prev => ({
            ...prev,
            title: { ...prev.title, error: prev.title.current.length ? null: "*Required"},
            artist: { ...prev.artist, error: prev.artist.list.length ? null: "*Please select atleast one artist"},
            genre: { ...prev.genre, error: prev.genre.id ? null: "*Please select valid genre"},
            album: { ...prev.album, error: prev.album.id ? null: "*Please select valid album"},
            file: { ...prev.file, error: prev.file.current ? null: "*Required" }
        }))
        setSubmitting(true)
    }

    const submitdata = async () => {
        if (submitting && (!data.title.error && !data.artist.error && !data.genre.error && !data.album.error && !data.file.error)) {
            try {
                let apidata = await checkSongTitleExistsAPI(token, data.title.current)
                if (apidata.status == 200) {
                    if (apidata.data.count) setData(prev => ({...prev, title: { ...prev.title, error: "*Matching title"}}))
                    else {
                        let finaldata = {
                            artists: data.artist.list.map(item => item.id),
                            genre: `${data.genre.id}`,
                            title: `${data.album.code} - ${data.title.current}.mp3`,
                            original_name: data.title.current,
                            album: data.album.id,
                        }

                        const renamedFile = new File([data.file.current], finaldata.title, {
                            type: "audio/mpeg",
                        });
                        let filedata = await uploadAPIs.MP3(token, renamedFile, (progressEvent) => {
                            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            setProgress(progress)
                        })
                        finaldata["url"] = `https://drive.google.com/uc?id=${filedata.data.file_id}&export=download`
                        let finalsong = await createSongAPI(token, finaldata)
                        navigate("/")
                    }
                }
            }
            catch (err) {
                setData(prev => ({...prev, title: { ...prev.title, error: err.message}}))
            }
        }
        setSubmitting(false)
    }

    useEffect(() => {
        submitdata()
    }, [submitting])

    const handleFileChange = (e) => {
        let file = e.target.files[0]
        let error = null
        if (!file || !file.type.includes('audio/mpeg')) {
            file = null
            error = "*Please select a mp3 file."
        }
        setData(prev => ({
                ...prev,
                file: {
                    current: file,
                    error: error,
                }
        }))
    }

    return <CenterElementsContainerWithScaleInEffectEffect>
        <FormWhenCentered onSubmit={handleSubmit}>
            <FormTitle>Add Song</FormTitle>
            <FormInputGroup>
                <FormInputLabel>Album</FormInputLabel>
                <FormInput
                    type="text"
                    placeholder="Enter Album Title"
                    name="title"
                    value={data.album.title}
                    autoComplete="off"
                    onChange={
                        (e) => {
                            setData(prev => ({ ...prev, album: { id: null, code: "", title: e.target.value, error: null } }))
                            dispatch(initiateSearchAlbumAction(token, e.target.value))
                        }}
                />
                {searchAlbumReducerState.loading && <small>Loading</small>}
                {
                    (data.album?.title.length && searchAlbumReducerState.success) ?
                        <Selector>
                            {searchAlbumReducerState.success && searchAlbumReducerState.success.data.map((item) => (
                                <SelectItem onClick={() => {
                                    dispatch(resetSearchAlbumAction())
                                    setData(prev => ({ ...prev, album: { id: item.id, code: item.code, title: `${item.code} - ${item.title}`, error: null } }))
                                }} key={item.id}>{item.title}</SelectItem>
                            ))}
                        </Selector> : <></>
                }
                <FormError>{data.album.error}</FormError>
            </FormInputGroup>
            <FormInputGroup>
                <FormInputLabel>Artist</FormInputLabel>
                <SelectedContainer>
                    {
                        data.artist.list.map((item) => (
                            <SelectItem key={item.id} onClick={() => {
                                setData(prev => {
                                    return {
                                        ...prev,
                                        artist: {
                                            ...prev.artist,
                                            list: prev.artist.list.filter((artist) => artist.id !== item.id),
                                            error: null,
                                        }
                                    }
                                })
                            }}>{item.name}</SelectItem>
                        ))
                    }
                </SelectedContainer>
                <FormInput type="text" placeholder="Enter Artist Name" name="artist" value={data.artist.current}
                    onChange={
                        (e) => {
                            setData(prev => ({ ...prev, artist: { list: prev.artist.list, current: e.target.value, error: null } }))
                            dispatch(initiateSearchArtistAction(token, e.target.value))
                        }}
                    autoComplete="off"
                />
                {searchArtistReducerState.loading && <small>Loading</small>}
                {
                    (data.artist?.current.length && searchArtistReducerState.success) ?
                        <Selector>
                            {searchArtistReducerState.success && searchArtistReducerState.success.data.map((item) => (
                                <SelectItem onClick={() => {
                                    dispatch(resetSearchArtistAction())
                                    setData(prev => ({
                                        ...prev, artist: {
                                            list: [
                                                ...prev.artist.list,
                                                {
                                                    id: item.id,
                                                    name: item.name
                                                },
                                            ], current: "",
                                            error: null,
                                        }
                                    }))
                                }} key={item.id}>{item.name}</SelectItem>
                            ))}
                        </Selector> : <></>
                }
                <FormError>{data.artist.error}</FormError>
            </FormInputGroup>
            <FormInputGroup>
                <FormInputLabel>Genre</FormInputLabel>
                <FormInput type="text" placeholder="Enter Genre Name" name="genre" value={data.genre.name}
                    onChange={(e) => {
                        setData(prev => ({ ...prev, genre: { id: null, name: e.target.value, error: null } }))
                        dispatch(initiateSearchGenreAction(token, e.target.value))
                    }}
                />
                {searchGenreReducerState.loading && <small>Loading</small>}
                {
                    (data.genre?.name.length && searchGenreReducerState.success) ?
                        <Selector>
                            {searchGenreReducerState.success && searchGenreReducerState.success.data.map((item) => (
                                <SelectItem onClick={() => {
                                    dispatch(resetSearchGenreAction())
                                    setData(prev => ({ ...prev, genre: { id: item.id, name: item.name, error: null } }))
                                }} key={item.id}>{item.name}</SelectItem>
                            ))}
                        </Selector> : <></>
                }
                <FormError>{data.genre.error}</FormError>
            </FormInputGroup>
            <FormInputGroup>
                <FormInputLabel>Song Title</FormInputLabel>
                <FormInput type="text" placeholder="Enter Song Title" name="title" value={data.title.current} onChange={(e) => setData(prev => ({
                    ...prev,
                    title: {
                        current: e.target.value,
                        error: null,
                    },
                }))}/>
                <FormError>{data.title.error}</FormError>
            </FormInputGroup>
            <FormInputGroup>
                <FormInputLabel>Audio File</FormInputLabel>
                <FormFileInput placeholder="Select MP3" accept="audio/mpeg, audio/mp3" name="file" onChange={handleFileChange} />
                <FormError>{data.file.error}</FormError>
            </FormInputGroup>
            <FormSubmitButton type="submit" disabled={submitting}>
                {
                    submitting ? 
                    ((progress && progress < 100) ? `Uploading ${progress}%` : "Please Wait") : "Submit"
                }
            </FormSubmitButton>
        </FormWhenCentered>
    </CenterElementsContainerWithScaleInEffectEffect>
}

export default AddSong