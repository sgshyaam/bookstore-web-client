import React, { useContext, useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const { loginUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            await loginUser({username, email, password});
            navigate('/');
            // window.location.href = '/';
        } catch (error) {
            alert('Login failed!');
        }
    };

    return(
        <>
        <Container sx={{width:800, paddingTop:15}}>
            <Typography variant="h4">Login</Typography>
            <form onSubmit={handleLogin}>
                <TextField 
                    label="Username"
                    variant="filled"
                    fullWidth
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField 
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField 
                    label="Password"
                    type="password"
                    variant="filled"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >Login</Button>

            </form>
        </Container>
        </>

    )
}

export default LoginForm;