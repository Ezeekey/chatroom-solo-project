import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

export default function* lobbySaga() {
    yield takeEvery('GET_LOBBIES', getLobbies);
    yield takeEvery('CREATE_ROOM', createRoom);
    yield takeEvery('DELETE_ROOM', deleteRoom);
}

function* getLobbies(action) {
    try {
        // Contacting server to get lobby list
        const response = yield axios.get('/api/rooms');
        // Put the list on the server
        yield put({type: 'SET_LOBBIES', payload: response.data});
    } catch (error) {
        console.log(`Oops! Lobby get error! ${error}`);
    }
}

function *createRoom(action) {  // Expecting {room_name, type}
    try {
        // Telling server to make new room
        yield axios.post('/api/rooms/', {room_name: action.payload.room_name, type: action.payload.type});
        // Refresh the room list
        yield put({type: 'GET_LOBBIES'});
    } catch (error) {
        console.log('Room creation error!', error);
    }
}

function *deleteRoom(action) {  // Expecting room id
    try {
        // Telling server to delete room
        yield axios.delete(`/api/rooms/${action.payload}`);
        // Refresh the room list
        yield put({type: 'GET_LOBBIES'});
    } catch (error) {
        console.log('Room deletion error!', error);
    }
}