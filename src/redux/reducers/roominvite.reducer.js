export default function roomInviteReducer(state = [], action) {
    switch(action.type) {
        case 'SET_ROOM_INVITE':
            return action.payload;
        default:
            return state;
    }
}