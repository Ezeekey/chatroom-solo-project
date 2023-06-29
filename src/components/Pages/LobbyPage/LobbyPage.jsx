// Functional imports
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom"
import { useEffect } from "react"

// Styling imports
import {
    Table, TableContainer, TableHead, TableBody, TableCell, Typography, Container, TableRow
    , Button, Paper
} from "@mui/material"
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

// Component imports
import LobbyRow from "../../LobbyRow/LobbyRow"

export default function LobbyPage() {
    // This is where the list of lobbies comes from
    const lobbies = useSelector(store => store.lobby);
    // This allows for the page to change when the create new room button is pressed
    const history = useHistory();

    function goToCreatePage() {
        history.push('/newroom');
    }

    return (
        <Container>
            <Paper>
                <Typography variant="h3" align="center">Lobbies</Typography>
                <Button variant="contained" onClick={goToCreatePage}>Create room<LibraryAddIcon/></Button>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6">Lobby name</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Started by:</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Lobby visibility</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lobbies.map(lobby => <LobbyRow key={lobby.id} lobby={lobby} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    )
}