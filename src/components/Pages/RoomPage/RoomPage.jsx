// Functional imports
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

// Style import
import { List, Typography, Container } from "@mui/material";

// Component import
import MessageBox from "../../MessageBox/MessageBox";
import PostMessageForm from "../../PostMessageForm/PostMessageForm";

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
    // This will allow for the room id to be gotten
    const param = useParams();
    roomId = param.id;

    // Holds the room name
    const [roomName, setRoomName] = useState('');
    // Argh
    // Holds each chat message
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Getting the name of the room
        axios.get(`/api/rooms/${param.id}`)
            .then(response => setRoomName(response.data.room_name))
            .catch(error => console.log('Getting room name error!', error));
        // Getting the messages from the chat on start
        socket.emit('GET_MESSAGES', param.id);
        // Enable receiving messages
        socket.emit('JOIN_ROOM', param.id);

        // This hackery has been done because having socket listeners inside of a react conponent causes a severe bug
        // The event here allows for the chat display to update as new messages come in
        document.addEventListener('message_got', e => {
            setMessages(messageList);
        });
    }, []);

    return (
        <Container>
            <Typography variant="h3"> {roomName} </Typography>
            {messages.map(message => <MessageBox key={message.id} message={message} socket={socket} />)}
            <PostMessageForm socket={socket} />
        </Container>
    )
}