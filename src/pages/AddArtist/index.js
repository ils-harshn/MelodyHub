import { useFormik } from "formik"
import { CenterElementsContainerWithScaleInEffectEffect } from "../../styles/Containers/CenterElementsContainer.styles"
import { FormCancelButton, FormError, FormFileInput, FormInput, FormInputGroup, FormInputLabel, FormInputNumber, FormSubmitButton } from "../../styles/Forms/FieldsStyled.styles"
import { FormGroupTwoColumn, FormTitle, FormWhenCentered } from "../../styles/Forms/FormStyled.styles"
import { validateYearOnKeyDown } from "../../helpers/regex"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { initiateAddAlbumAction, resetAddAlbumAction } from "../../store/actions/addAlbumActions"
import { useEffect, useState } from "react"
import { resizeImage } from "../../helpers/imageResizers"
import AddAlbumConfirmStyled from "../../styles/Containers/AddAlbumConfirmStyled.styles"
import { Loader, LoaderInScreenCenter } from "../../styles/Loaders/Loaders.styles"
import { checkAlbumCodeExistsAPI, checkAlbumTitleExistsAPI, checkArtistNameExistsAPI } from "../../api/adminAPIs"
import { initiateAddArtistAction, resetAddArtistAction } from "../../store/actions/addArtistActions"
import validationSchema, { initialValues } from "../../formSchemas/addArtistFormSchema"

const ConfirmAddArtistForm = ({ data, setOpenConfirmation }) => {
    const token = useSelector(reducers => reducers.loginReducer.user.token)
    const addArtistReducerState = useSelector(reducers => reducers.addArtistReducer)
    const dispatch = useDispatch()
    const [resizing, setResizing] = useState(true)
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image1Progress, setImage1Progress] = useState(0)
    const [image2Progress, setImage2Progress] = useState(0)
    const navigate = useNavigate()

    const resizeImages = async () => {
        const resizedimage1 = await resizeImage(data.file, data.name, 300, 300)
        const resizedimage2 = await resizeImage(data.file, data.name, 1200, 1200)
        setImage1(resizedimage1)
        setImage2(resizedimage2)
        setResizing(false)
    }

    const progressTracker = (setImageProgress) => {
        return (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setImageProgress(progress)
        }
    }

    useEffect(() => {
        resizeImages()
    }, [])

    useEffect(() => {
        if (addArtistReducerState.success) {
            navigate("/")            
        }
    }, [addArtistReducerState])

    if (resizing) {
        return <LoaderInScreenCenter>
            <Loader />
        </LoaderInScreenCenter>
    }

    return <AddAlbumConfirmStyled>
        <div className="preview-container">
            <FormInputGroup>
                <FormInputLabel>Artist Name</FormInputLabel>
                <FormInput value={data.name} disabled />
            </FormInputGroup>
            <div className="image-preview">
                <img src={URL.createObjectURL(image1)} />
            </div>
            <div className="status">
                {
                    image1Progress > 0 && image1Progress < 100 ?
                        <p>Uploading Image for 300x300: {image1Progress}%</p> :
                        image2Progress > 0 && image2Progress < 100 ?
                            <p>Uploading Image for 1200x1200: {image2Progress}%</p> :
                            addArtistReducerState.loading && <p>Please Wait</p>
                }
            </div>
            <div className="status-error">
                { addArtistReducerState.error && <p>{addArtistReducerState.error}</p> }
            </div>
            
            <FormGroupTwoColumn>
                <FormSubmitButton disabled={addArtistReducerState.loading} onClick={() => dispatch(
                    initiateAddArtistAction(token, data.name, image1, image2, progressTracker(setImage1Progress), progressTracker(setImage2Progress))
                )}>Confirm</FormSubmitButton>
                <FormCancelButton disabled={addArtistReducerState.loading} onClick={() => setOpenConfirmation(false)}>Back</FormCancelButton>
            </FormGroupTwoColumn>
        </div>
    </AddAlbumConfirmStyled>
}

const AddArtistForm = () => {
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const token = useSelector(reducers => reducers.loginReducer.user.token)

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: (values) => {
            checkForm(values)
        }
    })

    const checkForm = async (values) => {
        try {
            let names = await checkArtistNameExistsAPI(token, values.name)
            if (names && names.data.length) {
                names.data.length && formik.setFieldError("name", "Artist already exists")
            } else {
                setOpenConfirmation({
                    name: values.name,
                    file: values.file
                })
            }
        } catch (err) {
            formik.setFieldError("name", err.message)
        }
        formik.setSubmitting(false)
    }


    const handleChange = (e) => {
        let { name, value } = e.target;
        formik.setFieldTouched(name, true);
        formik.setFieldValue(name, value);
    }

    if (openConfirmation) {
        return <ConfirmAddArtistForm data={openConfirmation} setOpenConfirmation={setOpenConfirmation} />
    }

    return <FormWhenCentered onSubmit={formik.handleSubmit}>
        <FormTitle>Add Artist</FormTitle>
        <FormInputGroup>
            <FormInputLabel>Artist Name</FormInputLabel>
            <FormInput type="text" placeholder="Enter Artist Name" name="name" onChange={handleChange} value={formik.values.name} />
            <FormError>{formik.touched.name ? formik.errors.name : ""}</FormError>
        </FormInputGroup>
        <FormInputGroup>
            <FormInputLabel>Thumbnail Image</FormInputLabel>
            <FormFileInput placeholder="Select Image" accept='image/*' name="file" onChange={(event) => {
                const file = event.currentTarget.files[0];
                formik.setFieldValue('file', file);
            }} />
            <FormError>{formik.touched.file ? formik.errors.file : ""}</FormError>
        </FormInputGroup>
        <FormSubmitButton type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Checking..." : "Submit"}
        </FormSubmitButton>
    </FormWhenCentered>
}

const AddArtist = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(resetAddArtistAction())
    }, [])
    return <>
        <CenterElementsContainerWithScaleInEffectEffect>
            <AddArtistForm />
        </CenterElementsContainerWithScaleInEffectEffect>
    </>
}

export default AddArtist