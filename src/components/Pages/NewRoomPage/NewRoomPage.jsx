import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import { Container, Paper, TextField, Button, Select, MenuItem, Typography } from "@mui/material"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function NewRoomPage() {
    // Form variables
    const [roomName, setRoomName] = useState('');
    const [roomType, setRoomType] = useState('public');

    // This will allow the cancel button to bring the user back to the room page
    const history = useHistory();

    // This will allow the server to be contacted so rooms can be made
    const dispatch = useDispatch();


    function goBack() {
        history.push('/lobby');

        // Clear inputs just to make sure
        setRoomName('');
        setRoomType('public');
    }

    function createRoom() {
        dispatch({type: 'CREATE_ROOM', payload: {room_name: roomName, type: roomType}});
        goBack();
    }

    return (
        <Container align="center">
            <Paper>
                <Typography variant="h3">Create Room</Typography>
                <TextField value={roomName} onChange={e => setRoomName(e.target.value)} label="Room name" />
                <Select value={roomType} onChange={e => setRoomType(e.target.value)}>
                    <MenuItem value="public">Public</MenuItem>
                    <MenuItem value="private">Private</MenuItem>
                </Select>
                <Container align="center">
                    <Button variant="contained" color="success" onClick={createRoom}>Create<ArrowUpwardIcon/></Button>
                    <Button variant="outlined" onClick={goBack}>Cancel</Button>
                </Container>
            </Paper>
        </Container>
    )
}