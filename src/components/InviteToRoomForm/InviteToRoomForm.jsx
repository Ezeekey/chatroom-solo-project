import { useEffect, useState } from "react"
import axios from "axios";

import { Paper, Button, Table, TableRow, TableCell, TableHead, TableBody, Modal, Container, Typography } from "@mui/material"

export default function InviteToRoomForm({ room_id }) {
    const [modalOpen, setModalOpen] = useState(false);

    async function getInvitees() {
        try {
            const response = await axios.get(`/api/buddy/invitee/${room_id}`);
            console.log(response.data);
        } catch (error) {
            console.log('Getting invitee error!', error);
        }
    }

    useEffect(() => {
        getInvitees();
    }, []);

    return (
        <>
            <Button variant="outlined" onClick={() => setModalOpen(true)}>Henlo</Button>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <Container>
                    <Paper>
                        <Typography variant="h1">Argh</Typography>
                    </Paper>
                </Container>
            </Modal>
        </>
    )
}