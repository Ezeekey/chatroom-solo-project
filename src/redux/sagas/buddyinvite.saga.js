import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

export default function* buddyInviteSaga() {
    yield takeEvery('GET_BUD_INVITES', getInvites);
}

function* getInvites(action) {
    try {
        // Call server to get invites
        const response = yield axios.get('/api/buddy/invites');
        // Give to store
        yield put({type: 'SET_BUD_INVITES', payload: response.data});
    } catch (error) {
        console.log('Getting buddy invites error!', error);
    }
}
