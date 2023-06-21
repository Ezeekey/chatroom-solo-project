import { useSelector } from "react-redux";
import { useState } from "react";

import { Container, Typography, Paper, Button, Modal, Box, TextField } from "@mui/material";

export default function MessageBox({ message, socket, room_id }) {
    // Modal input states
    const [newContent, setNewContent] = useState(message.content);
    const [modalOpen, setModalOpen] = useState(false);

    // For getting user id
    const user = useSelector(store => store.user);


    function editMessage() {
        socket.emit('EDIT_MESSAGE', {user_id: user.id, message_id: message.id, content: newContent, room_id});
        setModalOpen(false);
    }

    return (
        <Container>
            <Paper variant="outlined">
                <Container>
                    <Typography variant="h6">{message.username}</Typography>
                    <Typography variant="body1">{message.content}</Typography>
                    <Typography variant="caption">{message.time_posted}</Typography>
                </Container>
                {message.user_id === user.id && <Button variant="outlined" color="warning" onClick={() => {setModalOpen(true); setNewContent(message.content)}}>Edit</Button>}
            </Paper>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <Container>
                    <Paper>
                        <Typography variant="h5">New message</Typography>
                        <TextField label="Message content" multiline minRows={2} value={newContent} onChange={e => setNewContent(e.target.value)} />
                        <Button variant="outlined" onClick={() => setModalOpen(false)}>Close</Button>
                        <Button variant="contained" color="warning" onClick={editMessage}>edit</Button>
                        <Button variant="contained" color="error">delete</Button>
                    </Paper>
                </Container>
            </Modal>
        </Container>
    )
}