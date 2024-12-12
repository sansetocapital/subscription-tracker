import React, { useEffect, useState } from 'react';

import { TextField, Button, Container, Typography, Grid, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';
import Layout from '../components/layout';
import AutoDismissAlert from '../components/AutoDismissAlert';
import { useLocation } from 'react-router-dom';

const PublicForm = (props) => {
    const [formData, setFormData] = useState([]);
    
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [subscription, setSubscription] = useState('');
    const {role} = props;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // alert('Form Submitted!');
        axios.post('http://localhost:9000/api/users', formData).then(res => {
                setMessage(res.data.message)
                setIsError(false)
                setShowMessage(true)
        }).catch(err=>{
            if(err.response){
                setMessage(err.response.data.message)
                setIsError(true)
                setShowMessage(true)
            }
        })
        
    };
    const displayMessage = (isError, message) =>{
        if(isError) {
            setIsError(true)
            setMessage(message)
            setShowMessage(true)
        }
        else{
            setIsError(false)
            setMessage(message)
            setShowMessage(true)
        }
        setTimeout(()=>{setShowMessage(false)}, 4000);
    } 
    const handleClose = () => {
        setShowMessage(false); 
    };
    return (
        <div>
            <Layout role={role}/>
            <Container maxWidth="sm" sx={{ mt: 4, mb: 4, boxShadow: 3, p: 3, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Subscription Request
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                name="name"
                                fullWidth
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                fullWidth
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="TradingView ID"
                                name="tradingViewID"
                                fullWidth
                                value={formData.tradingViewID}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="WhatsApp Number"
                                name="whatsAppNumber"
                                fullWidth
                                value={formData.whatsappNumber}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-helper-label">Plan</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                onChange={handleChange}
                                name="subscriptionID"
                                fullWidth
                                label="Plan"
                                value={formData.subscriptionID}
                            >
                                <MenuItem value={0}>Free Trial</MenuItem>
                                <MenuItem value={1}>1 Month</MenuItem>
                                <MenuItem value={2}>6 Months + 1month Free</MenuItem>
                                <MenuItem value={3}>1 year + 2 months Free</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{height:'60px'}}>
                                Submit
                            </Button>
                        </Grid>
                        
                    </Grid>
                </form>
            </Container>
            <AutoDismissAlert type={isError? "error":"success"} message = {message} open={showMessage} onClose={handleClose}></AutoDismissAlert>
        </div>
        
    );
};

export default PublicForm;
