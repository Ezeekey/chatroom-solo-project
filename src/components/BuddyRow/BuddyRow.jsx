import { useState } from "react";
import { useDispatch } from "react-redux";

import ProfileWidget from "../ProfileWidget/ProfileWidget"

import { TableRow, TableCell, Typography, Button } from "@mui/material"

export default function BuddyRow({buddy}) {
    const [open, setOpen] = useState(false);

    // Allows user data to be gotten
    const dispatch = useDispatch();

    function openProfile() {
        dispatch({type: 'GET_SELECT_USER', payload: buddy.user_id});
        setOpen(true);
    }

    return (
        <TableRow>
            <TableCell>
                <Typography>N/A</Typography>
                <ProfileWidget open={open} close={() => setOpen(false)}/>
            </TableCell>
            <TableCell>
                <Typography>{buddy.username}</Typography>
            </TableCell>
            <TableCell>
                <Typography>{buddy.status}</Typography>
            </TableCell>
            <TableCell>
                <Button variant="outlined" onClick={openProfile}>Options</Button>
            </TableCell>
        </TableRow>
    )
}