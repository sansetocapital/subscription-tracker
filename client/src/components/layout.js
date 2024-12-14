import React, { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Menu,
    MenuItem,
    useMediaQuery,
    Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useTheme } from "@mui/material/styles";



const Layout = (props) => {
    const { role } = props;
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setANchorEI] = useState(null);

    const gotoSubscriptionPage = (role) => {
        if (role === 'admin')
            navigate('/admin/subscription'); 
        else
            navigate('/user/subscription'); 
    };
    const gotoAdminPanel = () => {
        navigate('/admin');
    }

    const handleMenuOpen = (event) => {
        setANchorEI(event.currentTarget)
    }
    const handleMenuClose = () => {
        setANchorEI(null);
    }
    return (
        <AppBar position="static" sx={{ backgroundColor: '#333' }}>
            <Toolbar>
                {/* Menu Button (useful for mobile views) */}
                {isMobile && (
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenuOpen}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                {/* Brand Name or Logo */}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    SANSETO Subscription Management Portal
                </Typography>
                {!isMobile && (
                    <>
                        {role === 'admin' ? (
                            <>
                                <Button color="inherit" onClick={gotoAdminPanel}>
                                    Admin Panel
                                </Button>
                                <Button color="inherit" onClick={() => gotoSubscriptionPage('admin')}>
                                    Subscription
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button color="inherit">Home</Button>
                                <Button color="inherit">About</Button>
                                <Button color="inherit" onClick={() => gotoSubscriptionPage('user')}>
                                    Subscription
                                </Button>
                                <Button color="inherit">Services</Button>
                                <Button color="inherit">Contact</Button>
                            </>
                        )}
                    </>
                )}

                {isMobile && (
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        keepMounted
                    >
                        {role === 'admin' ? (
                            <>
                                <MenuItem onClick={gotoAdminPanel}>Admin Panel</MenuItem>
                                <MenuItem onClick={() => gotoSubscriptionPage('admin')}>
                                    Subscription
                                </MenuItem>
                            </>
                        ) : (
                            <>
                                <MenuItem>Home</MenuItem>
                                <MenuItem>About</MenuItem>
                                <MenuItem onClick={() => gotoSubscriptionPage('user')}>
                                    Subscription
                                </MenuItem>
                                <MenuItem>Services</MenuItem>
                                <MenuItem>Contact</MenuItem>
                            </>
                        )}
                    </Menu>
                )}

            </Toolbar>
        </AppBar>
    )
}

export default Layout;