import React, { useState, useEffect } from 'react';
// import { useWebRTC } from '../../hooks/useWebRTC';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Room.module.css';
import { getRoom } from '../../http';

const Room = () => {
    const { id: roomId } = useParams();
    const user = useSelector((state) => state.auth.user);

    // const { clients, provideRef } = useWebRTC(roomId, user);
    const history = useHistory();
    const [room, setRoom] = useState(null);

    const handleManualLeave = () => {
        history.push('/rooms');
    };

    useEffect(() => {
        const fetchRoom = async () => {
            const { data } = await getRoom(roomId);
            setRoom((prev) => data);
        };

        fetchRoom();
    }, [roomId]);

    return (
        <div>
            <h3>This is the room component</h3>
        </div>
    );
};

export default Room;
