import { Container, Typography, Paper } from "@mui/material";

export default function MessageBox({ message }) {
    return (
        <Container>
            <Paper variant="outlined">
                <Typography variant="h6">{message.username}</Typography>
                <Typography variant="body1">{message.content}</Typography>
                <Typography variant="caption">{message.time_posted}</Typography>
            </Paper>
        </Container>
    )
}