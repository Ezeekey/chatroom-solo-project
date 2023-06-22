import { useSelector } from 'react-redux';

import { Modal, Typography } from '@mui/material';

export default function ProfileWidget({ user, open, close }) {
    const selectedUser = useSelector(store => store.selectedUser);

    return (
        <Modal
            open={open}
            onClose={close}
        >
            <Typography variant="h1">Uuuh hi?</Typography>
        </Modal>
    )
}