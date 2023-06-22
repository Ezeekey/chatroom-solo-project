import { useSelector, useDispatch } from 'react-redux';

import { Modal, Typography, Paper, Container, Button } from '@mui/material';
import Swal from 'sweetalert2';

export default function ProfileWidget({ open, close }) {
    // Getting selected user
    const selectedUser = useSelector(store => store.selectUser);
    // Getting current user so info shows correctly
    const user = useSelector(store => store.user);

    // For handling anything to do with contacting the server
    const dispatch = useDispatch();


    function removeBuddy() {
        close();
        Swal.fire({
            title: 'Are you sure?',
            text: 'You may have some explaining to do if you didn\'t mean to do this',
            icon: 'warning',
            showConfirmButton: true,
            showDenyButton: true
        }).then(result => {
            if(result.isConfirmed) {
                dispatch({type: 'REMOVE_BUDDY', payload: selectedUser.buddy_id});
                Swal.fire('Get outta here!', '', 'success');
            } else {
                Swal.fire('Got it!', 'Nothing happened', 'success');
            }
        })
    }

    function addBuddyRequest() {

    }

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
                                    <Button variant="contained" color="error" onClick={removeBuddy}>Remove buddy</Button> :
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