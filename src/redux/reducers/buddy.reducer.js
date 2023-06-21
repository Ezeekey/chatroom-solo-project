export default function buddyReducer(state = [], action) {
    switch(action.type){
        case 'SET_BUDDIES':     // Expecting [{username, id, user_id, accepted}]
            return action.payload;
        default:
            return state;
    }
}