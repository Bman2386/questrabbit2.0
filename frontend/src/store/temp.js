const SAVE_DATA = 'temp/saveData';
const DELETE_DATA = 'temp/deleteData';

const saveData = (data) => ({
    type: SAVE_DATA,
    payload: data
});

const deleteData = () => ({
    type: DELETE_DATA
});

export const recieveData = (data) => dispatch => {  
    dispatch(saveData(data));
};
export const clearData = () => dispatch => {
    dispatch(deleteData());
};
const initialState = {};

const tempReducer = (state=initialState, action) => {
    switch(action.type){
        case SAVE_DATA:
            return Object.assign({}, state, action.payload);
        case DELETE_DATA:
            if (state.nameOfQuest) delete state.nameOfQuest;
            if (state.categoryId) delete state.categoryId;
            return state;
        default:
            return state;
    };
};

export default tempReducer;