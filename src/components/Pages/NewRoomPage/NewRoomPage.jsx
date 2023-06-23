import { useState } from "react"
import { useDispatch } from "react-redux"

import { Container, Paper, TextField, Button, Select, MenuItem, Typography } from "@mui/material"

export default function NewRoomPage() {
    const [roomName, setRoomName] = useState('');
    const [roomType, setRoomType] = useState('public');

    return (
        <Container>
            <Typography variant="h3" align="center">Create Room</Typography>
            <TextField value={roomName} onChange={e => setRoomName(e.target.value)} label="Room name" />
            <Select value={roomType} onChange={e => setRoomType(e.target.value)}>
                <MenuItem value="public">Public</MenuItem>
            </Select>
        </Container>
    )
}