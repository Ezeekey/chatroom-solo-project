import { useSelector } from 'react-redux';

import { Modal, Typography, Paper, Container, Button } from '@mui/material';

export default function ProfileWidget({ open, close }) {
    // Getting selected user
    const selectedUser = useSelector(store => store.selectUser);
    // Getting current user so info shows correctly
    const user = useSelector(store => store.user);

    return (
        <Modal
            open={open}
            onClose={close}
        >
            <Container>
                <Paper>
                    <Typography variant="h5">{selectedUser.username}</Typography>
                    <Typography variant="body1">{selectedUser.status}</Typography>
                    {selectedUser.privilege > 0 ?
                        <Typography variant="body1">Admin</Typography> :
                        <Typography variant="body1">User</Typography>}
                    {selectedUser.id !== user.id &&
                        <>
                            {
                                selectedUser.isBuddy ?
                                    <Typography variant='body1'>buddy</Typography> :
                                    <Typography variant='body1'>not buddy</Typography>
                            }
                            {
                                selectedUser.isBuddy ?
                                    <Button variant="contained" color="error">Remove buddy</Button> :
                                    <Button variant="contained" color="success">Add buddy</Button>
                            }
                        </>
                    }
                    <Button variant="outlined" onClick={close}>Close</Button>
                </Paper>
            </Container>
        </Modal>
    )
}