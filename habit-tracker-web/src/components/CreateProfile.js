import { register, signInWithGoogle } from "../hooks/useAuth";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import store from "../store";
import { useSelector } from "react-redux";
import { selectUser,setProfile } from "../slices/authSlice";
import { useNavigate } from 'react-router';
import { updateUserProfile } from "../Api";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import { Stack } from "@mui/material";
import { styleColors } from "../colors";

const makeTwoDigits = (time) => {
    const timeString = `${time}`;
    if (timeString.length === 2) return time
    return `0${time}`
  }

const CreateProfile = () => {

    const [name,setName] = useState()
    const [age,setAge] = useState()
    const [height,setHeight] = useState()
    const [rise, setRise] = useState(null);
    const [sleep, setSleep] = useState(null);      
    const user = useSelector(selectUser);
    let navigate = useNavigate();
    console.log(user)    
    return (
        <div style={{ backgroundColor:"white",display: 'flex', flexDirection:"column", alignItems: 'center', }} >              
            <h3>
                Complete your profile
            </h3>

                
                    <Stack spacing={3} width={"100%"} alignItems={"center"} justifyContent={"center"} paddingY={2}>
                    <TextField  id="name" label="Name" value={name} onChange={(text)=>setName(text.target.value)} variant="outlined" />
                    <TextField  id="age" label="Age" type="number" value={age} onChange={(text)=>setAge(text.target.value)} variant="outlined" />
                    <TextField  id="height" label="Height" type="number" value={height} onChange={(text)=>setHeight(text.target.value)} variant="outlined" />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                            label="Rise time"
                            value={rise}                          
                            onChange={(newValue) => {
                            setRise(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            label="Sleep time"
                            value={sleep}                           
                            onChange={(newValue) => {
                            setSleep(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>  
                    </Stack>                  
                
                <Button sx={{backgroundColor:styleColors.themeColor}} variant="contained" onClick={ async()=>{
                                                            let diz = {
                                                                    username: name,
                                                                    height: height,
                                                                    age:age,                   
                                                                    rise_time: makeTwoDigits(rise.getHours())+':'+makeTwoDigits(rise.getMinutes()),
                                                                    sleep_time: makeTwoDigits(sleep.getHours())+':'+makeTwoDigits(sleep.getMinutes()),                       
                                                                    };
                                                            store.dispatch(setProfile(diz));
                                                            await updateUserProfile(user.uid,user.api_token,diz).then(navigate("/home"))
                                                            }}>Let's start
                </Button>
                      
        </div>
    )
  }
  
  export default CreateProfile;