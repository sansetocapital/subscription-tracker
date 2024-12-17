import React, { useState } from 'react';
import {
    Avatar,
    Button,
    TextField,
    Box,
    Typography,
    Container,
    Grid,
    Link,
    Paper,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout';
import { Axios } from '../constant';


const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('/api/admin/login', formData).then(res => {
            if (res.data.message === "success") {
                localStorage.setItem('authToken', res.data.token);
                navigate('/admin/table/users');
            }
        })
    };

    return (
        <div>
            <Layout />
            <Container component="main" maxWidth="xs">

                <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log In
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Email Address"
                                name="username"
                                autoComplete="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                            >
                                Log In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
};

export default LoginPage;
