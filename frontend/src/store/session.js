import csrfFetch from './csrf';

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    };
};

const removeCurrentUser = () => {
    return {
        type: REMOVE_CURRENT_USER
    };
};

const storeCSRFToken = response => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
}

export const signin = (user) => async (dispatch) => { // rename to signup?
    const { username, password, adventurer, avg_rating, total_ratings,
         elite, pitch, family_crest, realm, star_sign } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
            adventurer: adventurer,
            avg_rating: avg_rating,
            total_ratings: total_ratings,
            elite: elite,
            pitch: pitch,
            family_crest: family_crest,
            realm: realm,
            star_sign: star_sign
        })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};
export const updateUser = (user) => async (dispatch) => {
    const { id, username, family_crest, realm, star_sign } = user;
    const response = await csrfFetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            username: username,
            family_crest: family_crest,
            realm: realm,
            star_sign: star_sign
        })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};

export const login = (user) => async (dispatch) => {
    const { username, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch("/api/session", {
        method: "DELETE"
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return response;
};

export const restoreSession = () => async dispatch => { 
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    let data 
    try{
        data = await response.json();
    } catch {
        data = await response.text();
        debugger
    }
    if (data) storeCurrentUser(data.user);
    if (data) dispatch(setCurrentUser(data.user));
    return response;
};

const initialState = {
    user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return { ...state, user: action.payload };
        case REMOVE_CURRENT_USER:
            return { ...state, user: null };
        default:
            return state;
    }
};

export default sessionReducer;