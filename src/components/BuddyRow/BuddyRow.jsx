import { TableRow, TableCell, Typography } from "@mui/material"

export default function BuddyRow({buddy}) {
    return (
        <TableRow>
            <TableCell>
                <Typography>N/A</Typography>
            </TableCell>
            <TableCell>
                <Typography>{buddy.username}</Typography>
            </TableCell>
            <TableCell>
                <Typography>{buddy.status}</Typography>
            </TableCell>
            <TableCell>
                <Button variant="outlined">Options</Button>
            </TableCell>
        </TableRow>
    )
}