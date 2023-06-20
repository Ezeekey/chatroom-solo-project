// Functional imports
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom"
import { useEffect } from "react"

// Styling imports
import { Table, TableContainer, TableHead, TableBody, TableCell, Typography, Container, TableRow
        , Button } from "@mui/material"

// Component imports
import LobbyRow from "../../LobbyRow/LobbyRow"

export default function LobbyPage() {
    // This is where the list of lobbies comes from
    const lobbies = useSelector(store => store.lobby);
    // This is how redux will be contacted to get lobbies
    const dispatch = useDispatch();
    useEffect(() => {dispatch({type: 'GET_LOBBIES'})}, []);

    return (
        <Container>
            <Typography variant="h3" align="center">Lobbies</Typography>
            <Button variant="contained">Create room</Button>
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
                            <TableCell>
                                <Typography variant="h6">Join?</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lobbies.map(lobby => <LobbyRow key={lobby.id} lobby={lobby} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}