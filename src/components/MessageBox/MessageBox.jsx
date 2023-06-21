import { useSelector } from "react-redux";

import { Container, Typography, Paper, Button } from "@mui/material";

export default function MessageBox({ message }) {
    // For getting user id
    const user = useSelector(store => store.user);

    return (
        <Container>
            <Paper variant="outlined">
                <Container>
                    <Typography variant="h6">{message.username}</Typography>
                    <Typography variant="body1">{message.content}</Typography>
                    <Typography variant="caption">{message.time_posted}</Typography>
                </Container>
                {message.user_id === user.id && <Button variant="contained" color="warning">Hello</Button>}
            </Paper>
        </Container>
    )
}