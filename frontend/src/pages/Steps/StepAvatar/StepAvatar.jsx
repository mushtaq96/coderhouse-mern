import React from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import styles from './StepAvatar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setAvatar } from '../../../store/activateSlice';
import {activate} from '../../../http'


const StepAvatar = ({onNext}) => {
    const {name, avatar} = useSelector((state)=>state.activate);
    const dispatch = useDispatch();
    const [image, setImage] = useState('/images/profilePic-sample.png');
    function captureImage(e){
        const file = e.target.files[0];
        //convert to base 64 stream
        const reader = new FileReader();
        reader.readAsDataURL(file);//it takes time to load
        reader.onloadend = function(){
            console.log(reader.result);
            setImage(reader.result);//processed base64 stream
            dispatch(setAvatar(reader.result));
        }
        
        console.log(e)
    }
    async function submit(){
        //use try catch for server requests
        try{
            const {data} = await activate({name, avatar})      
            console.log(data);      
        }catch(error){
            console.log(error);
        }

    }
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