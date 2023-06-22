export default function selectedUserReducer (state = {}, action) {
    switch(action.type) {
        case 'SET_SELECT_USER':
            return action.payload;
        case 'REQUEST_SENT':
            return {...state, requestSent: true};
        default:
            return state;
    }
}