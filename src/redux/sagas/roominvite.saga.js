import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

export default function* roomInviteSaga() {
    yield takeEvery('GET_ROOM_INVITE', getInvite);
    yield takeEvery('ACCEPT_ROOM_INVITE', acceptInvite);
    yield takeEvery('REJECT_ROOM_INVITE', rejectRequest);
}


function* getInvite() {
    try {
        // Getting invites from server, and sending them to store
        const response = yield axios.get('/api/rooms/invite');
        yield put({type: 'SET_ROOM_INVITE', payload: response.data});
    } catch (error) {
        console.log('Room invite get error!', error);
    }
}

function* acceptInvite(action) {    // Expects {room_id, invite_id}
    try {
        // Create new membership row, then delete the invite
        yield axios.post('/api/rooms/membership', {room_id: action.payload.room_id});
        yield axios.delete(`/api/rooms/invite/${action.payload.invite_id}`);
        // Refresh the invite list
        yield put({type: 'GET_ROOM_INVITE'});
    } catch (error) {
        console.log('Invitation accept error!', error);
    }
}

function* rejectRequest(action) {   // Expects invite_id
    try {
        // Simply delete request, then refresh
        yield axios.delete(`/api/rooms/invite/${action.payload}`);
        yield put({type: 'GET_ROOM_INVITE'});
    } catch (error) {
        console.log('Invite rejection error!', error);
    }
}
