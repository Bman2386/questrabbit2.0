
export const RECEIVE_DATA = 'RECEIVE_DATA';

const recieveData = data => ({
    type: RECEIVE_DATA,
    data
});

export const saveData = data => dispatch=> dispatch(recieveData(data));