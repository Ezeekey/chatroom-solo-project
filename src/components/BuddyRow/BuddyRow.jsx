import { useState } from "react"

import ProfileWidget from "../ProfileWidget/ProfileWidget"

import { TableRow, TableCell, Typography, Button } from "@mui/material"

export default function BuddyRow({buddy}) {
    const [open, setOpen] = useState(false);

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
                <Button variant="outlined" onClick={() => setOpen(true)}>Options</Button>
            </TableCell>
        </TableRow>
    )
}