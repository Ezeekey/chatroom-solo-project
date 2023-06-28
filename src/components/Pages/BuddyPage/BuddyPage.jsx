import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";

import BuddyRow from "../../BuddyRow/BuddyRow"

import { Table, TableRow, TableCell, TableHead, TableBody, Typography, Container, Paper } from "@mui/material"

export default function BuddyPage() {
    // To dispatch to store
    const dispatch = useDispatch();
    // Storing all the buddies here
    const buddies = useSelector(store => store.buddy);
    const user = useSelector(store => store.user);

    // On page render
    useEffect(() => { dispatch({ type: 'GET_BUDDY', payload: user.id }) }, []);

    return (
        <Container>
            <Paper>
                <Typography variant="h3" align="center">Buddies</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h6">Avatar</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">Name</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">Status</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {buddies.map(buddy => buddy.accepted && <BuddyRow key={buddy.id} buddy={buddy} />)}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    )
}