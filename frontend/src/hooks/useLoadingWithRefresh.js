import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";

export function useLoadingWithRefresh(){
    const [loading, setLoading] = useState(true);
    const dispatch=useDispatch();
    useEffect(()=>{
        //server request
        (async() =>{
            try{
                const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`,
                {
                    withCredentials: true,
                });

                //dispatch inside store
                dispatch(setAuth(data));
                setLoading(false);

                console.log(data);
            }catch(error){
                console.log(error);
                setLoading(false);
            }
            
        })();
    },[]);   

    return {loading};
}