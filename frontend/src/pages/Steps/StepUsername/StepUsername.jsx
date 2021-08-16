import React from 'react';

const StepUsername = ({onNext}) => {
    return( 
    <>
        <div>StepUsername component</div>
        <button onClick={onNext}>Next</button>
    </>
    );
};

export default StepUsername;