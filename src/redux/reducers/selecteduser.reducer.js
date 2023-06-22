export default function selectedUserReducer (state = {}, action) {
    switch(action.type) {
        case 'SET_SELECT_USER':
            return action.payload;
        default:
            return state;
    }
}