import * as React from 'react';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/authSlice";
import { register } from "../hooks/useAuth";
import { styles } from "../styles";

const RegisterPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullName] = useState('');

    return (
        <div className="pages-wrapper">
            <div className="pages-inner">
                <div className="heading-container">
                    <h3>
                        Sign up
                    </h3>
                </div>

                <Stack spacing={3} width={"100%"} alignItems={"center"} justifyContent={"center"} paddingY={2} >
                    <TextField inputProps={styles.formWebLabel} id="name" label="Name" value={fullname} onChange={(text) => setFullName(text.target.value)} variant="outlined" />
                    <TextField inputProps={styles.formWebLabel} id="email" label="Email" value={email} onChange={(text) => setEmail(text.target.value)} variant="outlined" />
                    <TextField inputProps={styles.formWebLabel} type="password" id="password" label="Password" value={password} onChange={(text) => setPassword(text.target.value)} variant="outlined" />
                </Stack>

                <div style={styles.flexColumnCenter}>
                    <Button style={styles.buttonWeb} variant="contained" onClick={() => register(email, password, fullname)}>Register</Button>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;