const SAVE_DATA = 'temp/saveData';

const saveData = (data) => ({
    type: SAVE_DATA,
    payload: data
});

export const recieveData = (data) => dispatch => {
    dispatch(saveData(data));
};

const initialState = {};

const tempReducer = (state=initialState, action) => {
    switch(action.type){
        case SAVE_DATA:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}

export default tempReducer;