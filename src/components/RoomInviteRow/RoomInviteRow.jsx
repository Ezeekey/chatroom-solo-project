import { useDispatch } from "react-redux";

import { TableCell, TableRow, Typography, Button } from "@mui/material"

export default function RoomInviteRow({ invite }) {
    // Used to contact the server
    const dispatch = useDispatch();


    function accept() {
        dispatch({type: 'ACCEPT_ROOM_INVITE', payload: {room_id: invite.room_id, invite_id: invite.id}});
    }

    function decline() {
        dispatch({type: 'REJECT_ROOM_INVITE', payload: invite.id});
    }

    return (
        <TableRow>
            <TableCell>
                <Typography variant="body1">{invite.username}</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body1">{invite.room_name}</Typography>
            </TableCell>
            <TableCell>
                <Button variant="contained" color="success" onClick={accept}>Accept</Button>               
            </TableCell>
            <TableCell>
                <Button variant="outlined" color="error" onClick={decline}>Decline</Button>
            </TableCell>
        </TableRow>
    )
}