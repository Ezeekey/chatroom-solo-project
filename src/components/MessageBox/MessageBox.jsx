import { useSelector } from "react-redux";
import { useState } from "react";

import { Container, Typography, Paper, Button, Modal, Box, TextField } from "@mui/material";

export default function MessageBox({ message, socket }) {
    // Modal input states
    const [newContent, setNewContent] = useState(message.content);
    const [modalOpen, setModalOpen] = useState(false);

    // For getting user id
    const user = useSelector(store => store.user);

    return (
        <Container>
            <Paper variant="outlined">
                <Container>
                    <Typography variant="h6">{message.username}</Typography>
                    <Typography variant="body1">{message.content}</Typography>
                    <Typography variant="caption">{message.time_posted}</Typography>
                </Container>
                {message.user_id === user.id && <Button variant="outlined" color="warning" onClick={() => setModalOpen(true)}>Edit</Button>}
            </Paper>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <Container>
                    <Paper>
                        <Typography variant="h5">New message</Typography>
                        <TextField label="Message content" multiline minRows={2} />
                        <Button variant="outlined">Close</Button>
                        <Button variant="contained" color="warning">edit</Button>
                        <Button variant="contained" color="error">delete</Button>
                    </Paper>
                </Container>
            </Modal>
        </Container>
    )
}