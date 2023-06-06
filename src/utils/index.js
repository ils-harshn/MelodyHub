const validator = {
    "email": (email) => {
        let validatorReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;  //Javascript reGex for Email Validation.
        return {
            is_valid: (email.length > 0) && validatorReg.test(email),
            msg: email.length ? "*Please enter valid email address" : "*Required",
        };
    },
    "password": (password) => {
        let validatorReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/g;
        return {
            "is_valid": password.length && (validatorReg.test(password)),
            "msg": password.length ? "*Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character:" : "*Required"
        }
    },
    "*": (value) => ({
        is_valid: value.length > 0,
        msg: "*Required",
    }),
}

const set_and_validate_field = (value, setValue, setError, validator_field) => {
    setValue(value);
    let { is_valid, msg } = validator[validator_field](value);
    if (is_valid) setError(false)
    else setError(msg)
    return { is_valid, msg } 
}

const set_token = (token, rememberMe=false) => {
    if (rememberMe) localStorage.setItem("token", token);
    else sessionStorage.setItem("token", token);
}

const get_token = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
}

const remove_token = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
}

const set_volume = (volume) => {
    localStorage.setItem("vol", volume);
}

const get_volume = () => {
    let volume = parseInt(localStorage.getItem("vol"));
    
    return volume || 100;
}

const set_last_played_song = (id) => {
    localStorage.setItem("last_played", id);
}

const get_last_played_song = () => {
    return JSON.parse(localStorage.getItem("last_played")) || {
        "id": 400,
        "album": {
            "id": 239,
            "code": "LAK",
            "title": "Love Aaj Kal",
            "year": 2009,
            "thumbnail300x300": "https://drive.google.com/uc?id=1LNXKjq6kU3r460fJLh2wjAGIq2Et4lrB&export=download",
            "thumbnail": "https://drive.google.com/uc?id=1MjslXO8Qd7m4nRI0IlgAP6nnRCpanVl1&export=download",
            "uploaded_at": "2015-10-08T20:52:34+05:30"
        },
        "artist_set": [
            {
                "id": 16,
                "name": "Mohit Chauhan",
                "artists_thumbnail": "https://drive.google.com/uc?id=1udsn0VrjB2VRfXoEQXEBTLX9U06nB0th&export=download",
                "artists_thumbnail300x300": "https://drive.google.com/uc?id=1ebbQ3oim_GpDrYrMm_A6b-ztlps5hkWD&export=download"
            }
        ],
        "reaction": "neutral",
        "genre": {
            "id": 3,
            "name": "Hindi"
        },
        "title": "LAK - Dooriyan.mp3",
        "url": "https://drive.google.com/uc?id=12p0SqwQ1QExVge5kXPRm65ysMe2OPzqp&export=download",
        "original_name": "Dooriyan",
        "views": 184,
        "uploaded_at": "2021-04-11T01:55:12+05:30"
    }; 
}


const parseLikedSongs = (data) => {
    return data.map(item => item.song);
}

export { validator, set_and_validate_field, set_token, get_token, remove_token, set_volume, get_volume, get_last_played_song, set_last_played_song, parseLikedSongs }