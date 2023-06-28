import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import InviteRow from "../../InviteRow/InviteRow";
import RoomInviteRow from "../../RoomInviteRow/RoomInviteRow";

import { Typography, Table, TableRow, TableCell, TableHead, TableBody, Container, Button, Paper, Box } from "@mui/material"

export default function InvitePage() {
    // Where the buddy invites are stored
    const budInvites = useSelector(store => store.budInvites);
    const roomInvites = useSelector(store => store.roomInvites);
    // Allows for the server to be called
    const dispatch = useDispatch();

    // Tells react whether it should render lobby invites, or buddy requests
    const [whichTable, setWhichTable] = useState(true);

    // Getting invites on first render
    useEffect(() => {
        dispatch({ type: 'GET_BUD_INVITES' });
        dispatch({ type: 'GET_ROOM_INVITE' });
    }, []);

    return (
        <Container>
            <Paper>
                <Typography variant="h3" align="center">Invites</Typography>
                <Box align="center">
                    <Button variant="outlined" onClick={() => setWhichTable(!whichTable)}>{whichTable ? "Buddy requests" : "Room invites"}</Button>
                </Box>
                {
                    whichTable ?
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><Typography variant="h6">Username</Typography></TableCell>
                                    <TableCell><Typography variant="h6">Accept?</Typography></TableCell>
                                    <TableCell><Typography variant="h6">Delete?</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {budInvites.map(invite => <InviteRow key={invite.id} invite={invite} />)}
                            </TableBody>
                        </Table> :
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><Typography variant="subtitle2">Invite</Typography></TableCell>
                                    <TableCell><Typography variant="subtitle2">Accept?</Typography></TableCell>
                                    <TableCell><Typography variant="subtitle2">Delete?</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {roomInvites.map(invite => <RoomInviteRow key={invite.id} invite={invite} />)}
                            </TableBody>
                        </Table>
                }
            </Paper>
        </Container>
    )
}