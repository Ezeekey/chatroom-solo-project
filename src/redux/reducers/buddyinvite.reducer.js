export default function buddyInviteReducer(state = [], action) {
    switch (action.type) {
        case 'SET_BUD_INVITES':
            return action.payload;
        default:
            return state;
    }
}