import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

export default function* buddySage() {
    yield takeEvery('GET_BUDDY', getBuddy);
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
