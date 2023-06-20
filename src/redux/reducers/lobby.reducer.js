export default function lobbyReducer(state = [], action) {
    switch (action.type) {
        case 'SET_LOBBIES':     // Expecting list of lobbies
            return action.payload;
        default: 
            return state;
    }
}