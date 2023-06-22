import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

export default function* buddySage() {
    yield takeEvery('GET_BUDDY', getBuddy);
    yield takeEvery('REMOVE_BUDDY', removeBuddy);
    yield takeEvery('BUDDY_REQUEST', addBuddyRequest);
}

function* getBuddy(action) {
    try {
        // Get from server
        const response = yield axios.get(`/api/buddy/`);
        // Send to store
        yield put({type: 'SET_BUDDIES', payload: response.data});
    } catch (error) {
        console.log('Buddy get error!', error);
    }
}

function* removeBuddy(action) {     // Expects buddy id NOT user id
    try {
        // Tell server to remove buddy connection from database
        const response = yield axios.delete(`/api/buddy/${action.payload}`);
        // Refresh the list
        yield put({type: 'GET_BUDDY'});
    } catch (error) {
        console.log('Buddy removal error!', error);
    }
}

function* addBuddyRequest(action) { // Expects user_id_2
    try {
        // Send the request to the server
        yield axios.post('/api/buddy', { user_id_2: action.payload });
        // Update the selected user, so the buddy button will grey out when it is clicked
        yield put({type: 'REQUEST_SENT'});
    } catch (error) {
        console.log('Buddy request error!', error);
    }
}
