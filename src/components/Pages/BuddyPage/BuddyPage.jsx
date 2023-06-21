import { Table, TableRow, TableCell, TableHead, TableBody, Typography, Button, Container } from "@mui/material"

export default function BuddyPage() {
    return (
        <Container>
            <Typography variant="h3" align="center">Buddies</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h6">Avatar</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6">Name</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6">Status</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6">Options</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                </TableBody>
            </Table>
        </Container>
    )
}