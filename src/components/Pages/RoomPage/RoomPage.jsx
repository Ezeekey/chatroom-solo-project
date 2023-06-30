// Functional imports
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// Style import
import { Typography, Container, Paper, Box, Button } from "@mui/material";
import './RoomPage.css';
import Swal from "sweetalert2";
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

// Component import
import MessageBox from "../../MessageBox/MessageBox";
import PostMessageForm from "../../PostMessageForm/PostMessageForm";
import InviteToRoomForm from "../../InviteToRoomForm/InviteToRoomForm";

let scrolls = 0;

// Dirty hax
let roomId = 0;
let messageList = [];
const updateMessagesEvent = new Event('message_got');
// Filthy, but functional. This may be the only way to do it

// START websocket

// Connecting to server
const socket = io('/');

// START websocket functions

// Recieving messages
socket.on('GIVE_MESSAGES', messages => {
    messageList = messages;
    // This is to trigger the DOM to rerender
    document.dispatchEvent(updateMessagesEvent);
});
// Successful changes to messages
socket.on('MESSAGE_SUCCESS', e => {
    // Get new message list
    socket.emit('GET_MESSAGES', roomId);
});

// END websocket functions

// END websocket

export default function RoomPage() {
    // Allows thing to focus
    let anchor = null;

    // This will allow for the room id to be gotten
    const param = useParams();
    roomId = param.id;

    // Holds the room name
    const [roomName, setRoomName] = useState('');
    const [creatorId, setCreatorId] = useState(0);
    // Holds room membership, if this array is greater than 0 than this means the user is a member
    const [membership, setMembership] = useState([]);
    // Holds type so the app knows if it should kick user from room if not a member when it is private
    const [roomType, setRoomType] = useState('');
    // Holds each chat message
    const [messages, setMessages] = useState([]);

    // Hold the user data here
    const user = useSelector(store => store.user);

    // Allows for the room to be deleted, and also redirect to the lobby
    const dispatch = useDispatch();
    const history = useHistory();


    // On first render
    useEffect(() => {
        // Getting the name of the room
        axios.get(`/api/rooms/details/${param.id}`)
            .then(response => {
                setRoomName(response.data.room_name);
                setCreatorId(response.data.creator_id);
                setRoomType(response.data.type);
            })
            .catch(error => console.log('Getting room name error!', error));
        // Getting room membership
        getMembership();

        // Getting the messages from the chat on start
        socket.emit('GET_MESSAGES', param.id);
        // Enable receiving messages
        socket.emit('JOIN_ROOM', param.id);

        // This hackery has been done because having socket listeners inside of a react conponent causes a severe bug
        // The event here allows for the chat display to update as new messages come in
        document.addEventListener('message_got', e => {
            setMessages(messageList);
        });
        scrolls = 0;
    }, []);


    useEffect(() => {
        scrollToBottom();
        console.log('Use effect fired');
    }, [messages]);


    function scrollToBottom() {
        console.log('Fired');
        // Only scrolls to bottom on first get
        if (scrolls > 0) {
            return;
        }

        // Scroll chat box to bottom
        anchor.focus();
        scrolls++;
    }


    async function getMembership() {
        try {
            // Contact server
            const response = await axios.get(`/api/rooms/membership/${param.id}`);
            if (response.data.length === 0 && roomType !== 'public' && roomType !== '' && user.privilege < 2) {
                // User is not a member and is in a private room
                history.push('/lobby');
            }
            setMembership(response.data);
        } catch (error) {
            console.log('Membership error!', error);
        }
    }


    function deleteRoom() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Once you delete a room, it can not be undone',
            icon: 'warning',
            showConfirmButton: true,
            showDenyButton: true
        }).then(result => {
            if (result.isConfirmed) {
                dispatch({ type: 'DELETE_ROOM', payload: param.id });
                history.push('/lobby');
                Swal.fire('DELETED', '', 'success');
            } else {
                Swal.fire('The room is safe!', 'For now', 'success');
            }
        })
    }


    async function handleMemberButton() {
        await removeMembership();
        // Refresh the data
        getMembership();
    }

    async function removeMembership() {
        try {
            await axios.delete(`/api/rooms/membership/${membership[0].id}`);
        } catch (error) {
            console.log('Membership removal error!', error);
        }
    }

    return (
        <Container>
            <Paper>
                <Typography variant="h3"> {roomName} </Typography>
                <Typography variant="h6">You are: {user.username}</Typography>
                {
                    (user.privilege > 0 || user.id === creatorId) &&
                    <Button variant="outlined" color="error" onClick={deleteRoom}>Delete room <DeleteIcon /></Button>
                }
                {membership.length > 0 &&
                    <>
                        <Button
                            variant="outlined"
                            color="warning"
                            onClick={handleMemberButton}
                        >
                            End room membership<CancelIcon />
                        </Button>
                        <InviteToRoomForm room_id={roomId} />
                    </>
                }

                <Box id="messageBox">
                    <div id="boxAnchor" tabIndex={-1} ref={e => anchor = e}></div>
                    {messages.map(message => <MessageBox key={message.id} message={message} socket={socket} room_id={param.id} />)}
                </Box>
                <PostMessageForm socket={socket} />
            </Paper>
        </Container>
    )
}