import React, { useCallback, useEffect, useState } from 'react';

import { TextField, Button, Container, Typography, Grid, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';
import Layout from '../components/layout';
import AutoDismissAlert from '../components/AutoDismissAlert';
import { useLocation } from 'react-router-dom';
import { Axios } from '../constant';
import { matchIsValidTel, MuiTelInput } from 'mui-tel-input';
import { Controller, useForm } from "react-hook-form";

const PublicForm = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        tradingViewID: '',
        subscriptionID: '',
    });

    const [isError, setIsError] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { role } = props;

    const { control, handleSubmit } = useForm({
        defaultValues: {
            tel: ""
        }
    });

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            const res = await Axios.post('/api/users', {...formData, whatsAppNumber: data.tel});
            setMessage(res.data.message);
            setIsError(false);
        } catch (err) {
            if (err.response) {
                setMessage(err.response.data.message);
                setIsError(true);
            }
        } finally {
            setIsLoading(false); 
            setShowMessage(true);
        }
    };
    const handleChange = useCallback((e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    const handleClose = () => {
        setShowMessage(false);
    };
    return (
        <div>
            <Layout role={role} />
            <Container maxWidth="sm" sx={{ mt: 20, mb: 4, boxShadow: 3, p: 3, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Subscription Request
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                            <Controller
                                name="tel"
                                control={control}
                                rules={{ validate: (value) => matchIsValidTel(value) }}
                                render={({ field: { ref: fieldRef, value, ...fieldProps }, fieldState }) => (
                                    <MuiTelInput
                                        {...fieldProps}
                                        label="WhatsApp Number"
                                        defaultCountry='US'
                                        value={value ?? ''}
                                        inputRef={fieldRef}
                                        fullWidth
                                        helperText={fieldState.invalid ? "Tel is invalid" : ""}
                                        error={fieldState.invalid}
                                        required
                                    />
                                )}
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
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ height: '60px' }}
                                disabled={isLoading} 
                            >
                                {isLoading ? "Submitting..." : "Submit"}
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Container>
            <AutoDismissAlert type={isError ? "error" : "success"} message={message} open={showMessage} onClose={handleClose}></AutoDismissAlert>
        </div>

    );
};

export default PublicForm;
