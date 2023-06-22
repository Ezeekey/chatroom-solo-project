import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

export default function* buddySage() {
    yield takeEvery('GET_BUDDY', getBuddy);
    yield takeEvery('REMOVE_BUDDY', removeBuddy);
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
