import { TableRow, TableCell, BUtton, Typography, Button } from "@mui/material"

export default function LobbyRow({ lobby }) {
    return (
        <TableRow>
            <TableCell>
                <Typography>{lobby.room_name}</Typography>
            </TableCell>
            <TableCell>
                <Typography>{lobby.username}</Typography>
            </TableCell>
            <TableCell>
                <Typography>{lobby.type}</Typography>
            </TableCell>
            <TableCell>
                <Button variant="contained" color="success">Join</Button>
            </TableCell>
        </TableRow>
    )
}