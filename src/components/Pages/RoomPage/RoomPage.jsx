// Functional imports
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom/cjs/react-router-dom";

// Style import
import { List, Typography } from "@mui/material";

// Component import

export default function RoomPage() {
    const param = useParams();

    return (
        <Typography variant="h1"> HI {param.id} </Typography>
    )
}