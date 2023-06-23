import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

export default function* buddyInviteSaga() {
    yield takeEvery('GET_BUD_INVITES', getInvites);
    yield takeEvery('ACCEPT_BUD_INVITE', acceptBudInvite);
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

function* acceptBudInvite(action) {     // Expecting buddy id
    try {
        // Contact server to accept request
        yield axios.put(`/api/buddy/invite/${action.payload}`);
        // Reget the buddy list, and invite list
        yield put({type: 'GET_BUDDY'});
        yield put({type: 'GET_BUD_INVITES'})
    } catch (error) {
        console.log('Accept buddy invite error!', error);
    }
}
