import React from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import TextInput from '../../../components/shared/TextInput/TextInput';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setName} from '../../../store/activateSlice';
import styles from './StepName.module.css';

const StepName = ({onNext}) => {
  const {name} = useSelector((state)=>state.activate);
  const dispach = useDispatch();
  //const [fullname, setFullname] = useState('');//good to understand - if we return back from profile photo screen to full name, component is rendered again. Making full name empty
  const [fullname, setFullname] = useState(name);//takes from the store

  function nextStep(){
    if(!fullname){
      return; // if no input dont proceed ahead
    }

    //pass action inside dispatch fucntion
    dispach(setName(fullname));//this saves the full name in the store
    onNext();
  }
    return (
    <>
 
        <Card title="What is your full name?" icon="goggle-emoji">
          <TextInput value={fullname} onChange={(e) =>setFullname(e.target.value)} />

          <p className={styles.paragraph}>
            People use real names at codershouse :) 
          </p>
          <div>
            <Button onClick={nextStep} text="Next" />
          </div>
        </Card>

    </>
    );
};

export default StepName;