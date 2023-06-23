import { useHistory } from "react-router-dom/cjs/react-router-dom"

import { TableRow, TableCell, BUtton, Typography, Button } from "@mui/material"
import "./LobbyRow.css";

export default function LobbyRow({ lobby }) {
    // This is to allow the user to be directed to the chatroom
    const history = useHistory();

    function goToRoom() {   // Called when join button is pressed
        history.push(`/room/${lobby.id}`);
    }

    return (
        <TableRow onClick={goToRoom} className="lobbyRow">
            <TableCell>
                <Typography>{lobby.room_name}</Typography>
            </TableCell>
            <TableCell>
                <Typography>{lobby.username}</Typography>
            </TableCell>
            <TableCell>
                <Typography>{lobby.type}</Typography>
            </TableCell>
        </TableRow>
    )
}