import { useDispatch } from "react-redux";

import { TableCell, TableRow, Typography, Button, Icon } from "@mui/material"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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
                <Typography variant="body2">{invite.username + '\nInvites you to\n\n' + invite.room_name}</Typography>
            </TableCell>
            <TableCell>
                <Button variant="contained" color="success" onClick={accept}><ThumbUpIcon /></Button>               
            </TableCell>
            <TableCell>
                <Button variant="outlined" color="error" onClick={decline}><DeleteOutlineOutlinedIcon /></Button>
            </TableCell>
        </TableRow>
    )
}