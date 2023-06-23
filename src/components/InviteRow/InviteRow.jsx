import { useDispatch } from "react-redux"

import { TableRow, TableCell, Typography, Button } from "@mui/material"

export default function InviteRow({ invite }) {
    // Used to contact server
    const dispatch = useDispatch();

    function deleteRequest() {
        dispatch({type: 'REMOVE_BUDDY', payload: invite.id})
    }

    function acceptRequest() {
        dispatch({type: 'ACCEPT_BUD_INVITE', payload: invite.id});
    }

    return (
        <TableRow>
            <TableCell>
                <Typography variant="body1">{invite.username}</Typography>
            </TableCell>
            <TableCell>
                <Button variant="contained" color="success" onClick={acceptRequest}>Accept</Button>
            </TableCell>
            <TableCell>
                <Button variant="outlined" color="error" onClick={deleteRequest}>Delete</Button>
            </TableCell>
        </TableRow>
    )
}