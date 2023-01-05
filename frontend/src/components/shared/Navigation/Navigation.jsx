import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../http';
import styles from './Navigation.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {setAuth} from '../../../store/authSlice';

const Navigation = () => {
    const brandStyle = {
        color:'#fff',
        textDecoration:'none',
        fontWeight:'bold',
        fontSize:'22px',
        display:'flex',
        alignItems:'center',
    };
    const logoText={
        marginLeft:'10px',
    };

    const dispatch = useDispatch();
    const {isAuth} = useSelector(state => state.auth);
    async function logoutUser(){
        //
        try{
            const { data } = await logout();
            //clear store
            dispatch(setAuth(data));
        }catch(error){
            console.log(error)
        }
    }
    return (

        <nav className={`${styles.navbar} container`}>
            <Link style={brandStyle} to="/">
                <img src="/images/llogo.png" alt="logo"/> {/*why do we what inline styles? because the .module.css file cannot modify child elements ie <LINK> in this case and further downwards */}
                <span style={logoText}>CodersHouse</span>
            </Link> 
            {isAuth && <button onClick={logoutUser}>Logout</button>} 
            {/*this is called 'short circuit'*/}
        </nav>
    );        
};

export default Navigation;