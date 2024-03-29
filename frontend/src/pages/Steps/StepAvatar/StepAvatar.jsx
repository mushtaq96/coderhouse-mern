import React, { useEffect } from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import styles from './StepAvatar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setAvatar } from '../../../store/activateSlice';
import {activate} from '../../../http';
import {setAuth} from '../../../store/authSlice';
import Loader from '../../../components/shared/Loader/Loader';


const StepAvatar = ({onNext}) => {
    const {name, avatar} = useSelector((state)=>state.activate);
    const dispatch = useDispatch();
    const [image, setImage] = useState('/images/profilePic-sample.png');
    const [loading, setLoading] = useState(false);
    const [unmounted, setUnMounted] = useState(false);

    function captureImage(e){
        const file = e.target.files[0];
        //convert to base 64 stream
        const reader = new FileReader();
        reader.readAsDataURL(file);//it takes time to load
        reader.onloadend = function(){
            console.log(reader.result);
            setImage(reader.result);//processed base64 stream
            dispatch(setAvatar(reader.result));
        };
        
        console.log(e)
    }
    async function submit(){
        if(!name || !avatar) return;
        setLoading(true); //start the animation 
        //use try catch for server requests
        try{
            const {data} = await activate({name, avatar}); //maybe this promise is not successfull
            if(data.auth){
                //check if component has not unmounted
                if(!unmounted) dispatch(setAuth(data));
            }
            console.log(data);      
        }catch(error){
            console.log(error);
        }finally{
            // if(isMounted) 
            setLoading(false);//runs after try or catch phase    
        }

    }

    //once the component is rendered, this will run once
    useEffect(()=>{
        return()=>{
            //if i have any event listeners, i have to remove it here
            setUnMounted(true);
        }
    }, []);

    if(loading) return <Loader message={"Activation in progress..."}/>;
    return( 
    <>
        <Card title={`Okay, ${name}`} icon="goggle-emoji">
            <p className={styles.subHeading}>How's this photo? </p>
            <div className={styles.avatarWrapper}>
                <img className={styles.avatarImage} src={image} alt="avatar"/>
            </div>

            <div>
                <input
                    onChange={captureImage}
                    id="avatarInput" type="file" className={styles.avatarInput}/>
                <label className={styles.avatarLabel} htmlFor="avatarInput">Choose a different photo</label>
            </div>
            <div>
                <Button onClick={submit} text="Next" />
            </div>
        </Card>
    </>
    );
};

export default StepAvatar;


// clean up funciton
// when we use useEffect, inside it we can return a function to clean up
// why? If we have listeners inside we can remove