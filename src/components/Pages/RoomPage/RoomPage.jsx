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

// START websocket

// Connecting to server
const socket = io('/');

// END websocket

export default function RoomPage() {
    // This will allow for the room id to be gotten
    const param = useParams();

    // Holds the room name
    const [roomName, setRoomName] = useState('');
    // Argh
    // Holds each chat message
    const [messages, setMessages] = useState([]);

    socket.on('GIVE_MESSAGES', messages => {
        setMessages(messages);
    })

    useEffect(() => {
        // Getting the name of the room
        axios.get(`/api/rooms/${param.id}`)
            .then(response => setRoomName(response.data.room_name))
            .catch(error => console.log('Getting room name error!', error));
        // Getting the messages from the chat on start
        socket.emit('GET_MESSAGES', param.id);
    }, []);

    return (
        <Container>
            <Typography variant="h3"> {roomName} </Typography>
            {messages.map(message => <MessageBox key={message.id} message={message} />)}
        </Container>
    )
}