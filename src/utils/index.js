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
    return localStorage.getItem("last_played") || 120; 
}

export { validator, set_and_validate_field, set_token, get_token, remove_token, set_volume, get_volume, get_last_played_song, set_last_played_song }