import { useState } from "react"
import { FormTitle, FormWhenCentered } from "../../styles/Forms/FormStyled.styles";
import { FormError, FormFileInput, FormInput, FormInputGroup, FormInputLabel, FormSubmitButton, SelectItem, Selector } from "../../styles/Forms/FieldsStyled.styles";
import { CenterElementsContainerWithScaleInEffectEffect } from "../../styles/Containers/CenterElementsContainer.styles";
import { useDispatch, useSelector } from "react-redux";
import { initiateSearchAlbumAction, resetSearchAlbumAction } from "../../store/actions/searchAlbumActions";
import { initiateSearchArtistAction, resetSearchArtistAction } from "../../store/actions/searchArtistActions";

const AddSong = () => {
    const [data, setData] = useState({
        artist: {
            list: [],
            current: "",
        },
        genre: "",
        title: "",
        album: {
            id: null,
            title: "",
        },
    })

    const dispatch = useDispatch()
    const token = useSelector(reducers => reducers.loginReducer.user.token)
    const searchAlbumReducerState = useSelector(reducers => reducers.searchAlbumReducer)
    const searchArtistReducerState = useSelector(reducers => reducers.searchArtistReducer)

    return <CenterElementsContainerWithScaleInEffectEffect>
        <FormWhenCentered>
            <FormTitle>Add Song</FormTitle>
            <FormInputGroup>
                <FormInputLabel>Album</FormInputLabel>
                <FormInput
                    type="text"
                    placeholder="Enter Album Title"
                    name="title"
                    value={data.album.title}
                    onChange={
                        (e) => {
                            setData(prev => ({ ...prev, album: { id: null, title: e.target.value } }))
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
                                    setData(prev => ({ ...prev, album: { id: item.id, title: item.title } }))
                                }} key={item.id}>{item.title}</SelectItem>
                            ))}
                        </Selector> : <></>
                }
                <FormError></FormError>
            </FormInputGroup>
            <FormInputGroup>
                <FormInputLabel>Artist</FormInputLabel>
                <Selector>
                    {
                        data.artist.list.map((item) => (
                            <SelectItem key={item.id} onClick={() => {
                                setData(prev => {
                                    return {
                                        ...prev,
                                        artist: {
                                            ...prev.artist,
                                            list: prev.artist.list.filter((artist) => artist.id !== item.id)
                                        }
                                    }
                                })
                            }}>{item.name}</SelectItem>
                        ))
                    }
                </Selector>
                <FormInput type="text" placeholder="Enter Artist Name" name="artist" value={data.artist.current}
                    onChange={
                        (e) => {
                            setData(prev => ({ ...prev, artist: { list: prev.artist.list, current: e.target.value } }))
                            dispatch(initiateSearchArtistAction(token, e.target.value))
                        }}
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
                                            ], current: ""
                                        }
                                    }))
                                }} key={item.id}>{item.name}</SelectItem>
                            ))}
                        </Selector> : <></>
                }
                <FormError></FormError>
            </FormInputGroup>
            <FormInputGroup>
                <FormInputLabel>Genre</FormInputLabel>
                <FormInput type="text" placeholder="Enter Genre Name" name="genre" value={data.genre}
                    onChange={(e) => setData(prev => ({ ...prev, genre: e.target.value }))}
                />
                {/* {
                    data.genre?.length ?
                        <Selector>
                            {searchedAlbums.map((item) => (
                                <SelectItem>{item.title}</SelectItem>
                            ))}
                        </Selector> : <></>
                } */}
                <FormError></FormError>
            </FormInputGroup>
            <FormInputGroup>
                <FormInputLabel>Song Title</FormInputLabel>
                <FormInput type="text" placeholder="Enter Song Title" name="title" />
                <FormError></FormError>
            </FormInputGroup>
            <FormInputGroup>
                <FormInputLabel>Audio File</FormInputLabel>
                <FormFileInput placeholder="Select Image" accept='audio/*' name="file" />
                <FormError></FormError>
            </FormInputGroup>
            <FormSubmitButton type="submit">
                {false ? "Checking..." : "Submit"}
            </FormSubmitButton>
        </FormWhenCentered>
    </CenterElementsContainerWithScaleInEffectEffect>
}

export default AddSong