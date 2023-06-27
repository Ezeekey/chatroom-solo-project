import { useState } from "react"

import { Paper, Button, Table, TableRow, TableCell, TableHead, TableBody, Modal, Container, Typography } from "@mui/material"

export default function InviteToRoomForm() {
    const [modalOpen, setModalOpen] = useState(false);

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