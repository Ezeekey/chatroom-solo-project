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
        dispatch({type: 'BUDDY_REQUEST', payload: selectedUser.id});
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
                    {selectedUser.id !== user.id ?
                        <>
                            {
                                selectedUser.isBuddy ?
                                    <Typography variant='body1'>buddy</Typography> :
                                selectedUser.requestSent ?
                                    <Typography variant="body1">request sent</Typography> :
                                    <Typography variant='body1'>not buddy</Typography>
                            }
                            {
                                selectedUser.isBuddy ?
                                    <Button variant="contained" color="error" onClick={removeBuddy}>Remove buddy</Button> :
                                    <Button variant="contained" color="success" disabled={selectedUser.requestSent} onClick={addBuddyRequest} >Add buddy</Button>
                            }
                        </> : <Typography variant="h5">You</Typography>
                    }
                    <Button variant="outlined" onClick={close}>Close</Button>
                </Paper>
            </Container>
        </Modal>
    )
}