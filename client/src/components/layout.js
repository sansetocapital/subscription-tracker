import React, { useEffect } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button
} from '@mui/material'
import { useNavigate } from 'react-router-dom';


const Layout = (props) => {
    const {role} = props;
    const navigate = useNavigate();


    const gotoSubscriptionPage = (role) => {
        if(role==='admin')
            navigate('/admin/subscription'); // Navigate to the Services page
        else 
            navigate('/user/subscription'); // Navigate to the Services page
    };
    const gotoAdminPanel = () =>{
        navigate('/admin');
    }
    return (
        <AppBar position="static" sx={{ backgroundColor: '#333' }}>
            <Toolbar>
                {/* Menu Button (useful for mobile views) */}
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    {/* <MenuIcon /> */}
                </IconButton>

                {/* Brand Name or Logo */}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Subscription Management Portal
                </Typography>
                {
                    role=="admin" ? 
                    <>
                        <Button color="inherit" onClick={gotoAdminPanel}>Admin Panel</Button>
                        <Button color="inherit"  onClick={()=>gotoSubscriptionPage('admin')}>Subscription</Button>
                    </> : 
                    <>
                        <Button color="inherit">Home</Button>
                        <Button color="inherit">About</Button>
                        <Button color="inherit"  onClick={()=>gotoSubscriptionPage('user')}>Subscription</Button>
                        <Button color="inherit">Services</Button>
                        <Button color="inherit">Contact</Button>
                    </>
                }
                
            </Toolbar>
        </AppBar>
    )
}

export default Layout;