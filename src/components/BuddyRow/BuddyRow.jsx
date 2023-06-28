import { useState } from "react";
import { useDispatch } from "react-redux";

import ProfileWidget from "../ProfileWidget/ProfileWidget"

import { TableRow, TableCell, Typography } from "@mui/material"

export default function BuddyRow({ buddy }) {
    const [open, setOpen] = useState(false);

    // Allows user data to be gotten
    const dispatch = useDispatch();

    function openProfile() {
        dispatch({ type: 'GET_SELECT_USER', payload: buddy.user_id });
        setOpen(true);
    }

    return (
        <>          
            <TableRow onClick={openProfile} className="lobbyRow" tabindex={0} onKeyDown={e => {if (e.key === 'Enter'){openProfile()} }}>
                <TableCell>
                    <Typography>N/A</Typography>
                </TableCell>
                <TableCell>
                    <Typography>{buddy.username}</Typography>
                </TableCell>
                <TableCell>
                    <Typography>{buddy.status}</Typography>
                </TableCell>
            </TableRow>
            <ProfileWidget open={open} close={() => setOpen(false)} />
        </>
    )
}