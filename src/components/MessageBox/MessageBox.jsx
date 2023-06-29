import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import ProfileWidget from "../ProfileWidget/ProfileWidget";

import { Container, Typography, Paper, Button, Modal, Box, TextField } from "@mui/material";
import Swal from "sweetalert2";
import moment from "moment/moment";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MessageBox({ message, socket, room_id }) {
    // Modal input states
    const [newContent, setNewContent] = useState(message.content);
    const [modalOpen, setModalOpen] = useState(false);
    const [userInfoOpen, setInfoOpen] = useState(false);

    // For getting user id
    const user = useSelector(store => store.user);

    // For getting id of user on select for widget
    const dispatch = useDispatch();

    function editMessage() {
        socket.emit('EDIT_MESSAGE', { user_id: user.id, message_id: message.id, content: newContent, room_id });
        setModalOpen(false);
    }

    function openInfo() {
        dispatch({ type: 'GET_SELECT_USER', payload: message.user_id });
        setInfoOpen(true);
    }


    function deleteMessage() {
        // Close the material modal before popping up the sweet alerty message
        setModalOpen(false);

        Swal.fire({
            title: 'Are you sure?',
            showDenyButton: true,
            denyButtonText: 'No',
            showConfirmButton: true,
            confirmButtonText: 'Yes',
            icon: 'warning'
        }).then(result => {
            if (result.isConfirmed) {
                // Actually delete
                socket.emit('DELETE_MESSAGE', { user_id: user.id, message_id: message.id, room_id });
                // Deletion message
                Swal.fire(
                    'DELETED',
                    'The message has been deleted',
                    'success'
                );
            } else {
                Swal.fire('Not deleted', 'The message has not been deleted', 'info')
            }
        });
    }

    return (
        <Container>
            <Paper variant="outlined">
                <Container>
                    <Box align="left" width="80%" display="inline-block">
                        <Typography variant="subtitle2" onClick={openInfo}>{message.username}</Typography>
                        <Typography variant="body1">{message.content}</Typography>
                        <Typography variant="caption">{moment(message.time_posted).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                    </Box>
                    {message.user_id === user.id && !message.marked_for_delete && <Box display="inline-block" align="right" width="20%"><Button variant="outlined" color="warning" onClick={() => { setModalOpen(true); setNewContent(message.content) }}><EditIcon /></Button></Box>}
                </Container>
                {user.privilege > 0 && <Button variant="outlined" color="error" onClick={deleteMessage}>delete<DeleteIcon/></Button>}
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
                        <Button variant="contained" color="warning" onClick={editMessage}>edit<EditIcon /></Button>
                        <Button variant="contained" color="error" onClick={deleteMessage}>delete<DeleteIcon/></Button>
                    </Paper>
                </Container>
            </Modal>
            <ProfileWidget open={userInfoOpen} close={() => setInfoOpen(false)} />
        </Container>
    )
}