import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

export default function* selectUserSaga() {

}

function* selectUser(action) {  // Expects selected user id
    try {
        // Calling server to get specific user information
    } catch (error) {
        console.log('GET single user error!', error);
    }
}