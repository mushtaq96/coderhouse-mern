import React from 'react';
import RoomCard from '../../components/shared/RoomCard/RoomCard';
import styles from './Rooms.module.css'

//dummy data
const rooms = [
    {
        id: 1,
        topic: 'Which framework best for frontend ?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/monkey-avatar.png',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 3,
        topic: 'What’s new in machine learning?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/monkey-avatar.png',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 4,
        topic: 'Why people use stack overflow?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/monkey-avatar.png',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 5,
        topic: 'Artificial inteligence is the future?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/monkey-avatar.png',
            },
        ],
        totalPeople: 40,
    },
];
const Rooms = () => {
    return (
        <>
            <div className='container'>
                this is rooms components
                <div className={styles.roomsHeader}>
                    <div className={styles.left}>
                        <span className={styles.heading}>All voice rooms</span>     
                        <div className={styles.searchBox}>
                            <img src="images/search-icon.png" alt="search"/>
                            <input type="text" className={styles.searchInput}/>
                        </div> 

                    </div>
                    <div className={styles.right}>
                        <button className={styles.startRoomButton}>
                            <img src="images/add-room-icon.png" alt="add-room"/>
                            <span>Start a room</span>
                        </button>
                    </div>
                </div>

                <div className={styles.roomList}>
                    {rooms.map((room)=>(
                            <RoomCard key={room.id} room={room}/>
                    ))}
                </div>
            </div>
        </>
        
    );
};
export default Rooms;