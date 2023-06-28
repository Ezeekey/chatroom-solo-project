import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import axios from "axios";

import { Paper, Button, Table, TableRow, TableCell, TableHead, TableBody, Modal, Container, Typography } from "@mui/material"

export default function InviteToRoomForm({ room_id }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [inviteeList, setInviteeList] = useState([]);

    const dispatch = useDispatch();

    async function getInvitees() {
        try {
            const response = await axios.get(`/api/buddy/invitee/${room_id}`);
            console.log(response.data);

            setInviteeList(response.data);
        } catch (error) {
            console.log('Getting invitee error!', error);
        }
    }

    async function sendInvite(user) {
        await dispatch({ type: 'INVITE_TO_ROOM', payload: { room_id, invitee_id: user } });
        getInvitees();
    }

    useEffect(() => {
        getInvitees();
    }, []);

    return (
        <>
            <Button variant="outlined" onClick={() => setModalOpen(true)} color="secondary">Invite to room</Button>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <Container>
                    <Paper>
                        <Typography variant="h4">Invite to room</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><Typography variant="h6">Username</Typography></TableCell>
                                    <TableCell><Typography varaint="h6">Invite?</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {inviteeList.map(buddy => 
                                    <TableRow key={buddy.user_id}>
                                        <TableCell>
                                            <Typography variant="body1">{buddy.username}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" onClick={() => sendInvite(buddy.user_id)}>Invite</Button>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Paper>
                </Container>
            </Modal>
        </>
    )
}