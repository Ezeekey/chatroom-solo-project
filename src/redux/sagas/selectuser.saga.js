import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

export default function* selectUserSaga() {
    yield takeEvery('GET_SELECT_USER', selectUser);
}

function* selectUser(action) {  // Expects selected user id
    try {
        // Calling server to get specific user information
        const newUser = yield axios.get(`/api/user/${action.payload}`);
        // Send the new user to the store
        yield put({type: 'SET_SELECT_USER', payload: newUser.data});
    } catch (error) {
        console.log('GET single user error!', error);
    }
}