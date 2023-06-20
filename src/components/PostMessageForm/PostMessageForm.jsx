import { useState } from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";

import { Button, TextField, Container } from "@mui/material"

export default function PostMessageForm({socket}) {
    const [input, setInput] = useState('');

    // Getting user id
    const user = useSelector(store => store.user);
    // Getting room id
    const param = useParams();

    function submit() {
        // Post the message to the server
        socket.emit('POST_MESSAGE', {user_id: user.id, room_id: param.id, content: input});
        // Clear the input
        setInput('');
    }

    return (
        <Container>
            <TextField fullWidth multiline minRows={2} value={input} onChange={e => setInput(e.target.value)} />
            <Button variant="contained" onClick={submit}>Post</Button>
        </Container>
    )
}