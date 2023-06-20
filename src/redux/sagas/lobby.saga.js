import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

export default function* lobbySaga() {
    yield takeEvery('GET_LOBBIES', getLobbies);
}

function* getLobbies(action) {
    try {
        // Contacting server to get lobby list
        const response = yield axios.get('/api/rooms');
        // Put the list on the server
        yield put({type: 'SET_LOBBIES', payload: response.data});
    } catch (error) {
        alert(`Oops! Lobby get error! ${error}`);
    }
}