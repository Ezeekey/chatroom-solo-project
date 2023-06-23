import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import InviteRow from "../../InviteRow/InviteRow";

import { Typography, Table, TableRow, TableCell, TableHead, TableBody, Container } from "@mui/material"

export default function InvitePage() {
    // Where the buddy invites are stored
    const budInvites = useSelector(store => store.budInvites);
    // Allows for the server to be called
    const dispatch = useDispatch();


    // Getting invites on first render
    useEffect(() => {
        dispatch({type: 'GET_BUD_INVITES'});
    }, []);

    return (
        <Container>
            <Typography variant="h3" align="center">Invites</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Accept?</TableCell>
                        <TableCell>Delete?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {budInvites.map(invite => <InviteRow key={invite.id} invite={invite} />)}
                </TableBody>
            </Table>
        </Container>
    )
}