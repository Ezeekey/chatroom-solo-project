import { useDispatch } from "react-redux"

import { TableRow, TableCell, Typography, Button } from "@mui/material"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';

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
                <Button variant="contained" color="success" onClick={acceptRequest}><PersonAddIcon/></Button>
            </TableCell>
            <TableCell>
                <Button variant="outlined" color="error" onClick={deleteRequest}><DeleteIcon/></Button>
            </TableCell>
        </TableRow>
    )
}