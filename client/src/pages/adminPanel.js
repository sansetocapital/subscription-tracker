import React, { useEffect, useState } from 'react';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    TableContainer,

} from '@mui/material';
import { Alert, Snackbar } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Axios } from '../constant';
import axios from 'axios';
import Layout from '../components/layout';
import { makeStyles } from '@mui/styles';
import { format, parseISO } from 'date-fns';
import moment from 'moment';
import AutoDismissAlert from '../components/AutoDismissAlert';

const useStyles = makeStyles(() => ({
    table: {
        border: '1px solid black',
        borderCollapse: 'collapse', // Collapses borders to avoid double borders
    },
    tableCell: {
        border: '1px solid black',
    },
    TableRow: {
        border: '1px solid black',
    }
}));
const AdminPanel = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState(null);
    const [subscriptions, setSubscriptions] = useState(null);
    const [open, setOpen] = useState(false);
    const [activeCount, setActiveCount] = useState(0);
    const [expiredCount, setExpiredCount] = useState(0);
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    useEffect(() => {
        getAllSubscription();
    }, [])
    useEffect(() => {
        getActiveCount();
    }, [subscriptions])

    const getAllSubscription = () => {
        Axios.get('/api/admin/getAllSubscription').then(res => {
            return setSubscriptions(res.data);

        });
    }

    const getActiveCount = () => {
        if (subscriptions && subscriptions.length > 0) {
            let active = 0;
            let expired = 0;

            subscriptions.forEach((sub) => {
                sub.active == true ? active++ : expired++;
            });
            setActiveCount(active);
            setExpiredCount(expired);
        }
    }
    const handleRowClick = (subscription) => {
        setSelectedSubscription(subscription);
        setOpenModal(true);
    };

    const handleSubRowClick = (subscription) => {
        console.log(subscription);
        setSelectedSubscription(subscription);
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedSubscription(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedSubscription((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            await Axios.post('/api/admin/manageSubscription', selectedSubscription).then(res => {
                getAllSubscription()
                setMessage(res.data.message)
                setIsError(false)
                setOpenModal(false)
                setShowMessage(true)
            })

        } catch (error) {
            setIsError(true)
            if (error.response) {
                console.error('Status Code:', error.response.status);
                console.error('Response Data:', error.response.data);
                setMessage(error.response.data)
            } else if (error.request) {
                setMessage(error.request)
                console.error('Request was made but no response received:', error.request);
            } else {
                setMessage(error.message)
                console.error('Error Message:', error.message);
            }
        }

    };

    const getDateDifference = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const differenceInMs = end - new Date(Date.now());
        const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
        return differenceInMs > 0 ? `${days} Days` : 'expired';
    };
    const handleClose = () => {
        setShowMessage(false);
    };
    return (
        <>
            <Layout role='admin' />

            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Grid item sm={10} md={10} xs={10} sx={{ margin: '20px' }}>
                        <Typography variant="h4" gutterBottom align="center">
                            Admin Panel
                        </Typography>
                    </Grid>
                    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            This is a success Alert inside a Snackbar!
                        </Alert>
                    </Snackbar>

                    <Grid item sm={10} md={5} xs={10}>
                        <TableContainer component={Paper} sx={{ border: '1px solid black' }}>
                            <Table >
                                <TableBody>
                                    <TableRow >
                                        <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>Total No of Subscribers</TableCell>
                                        <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>{activeCount + expiredCount}</TableCell>
                                        <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}></TableCell>
                                        <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>No of Active Subsribers</TableCell>
                                        <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>{activeCount}</TableCell>
                                        <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>No of Expired Subsribers</TableCell>
                                        <TableCell sx={{ border: '1px solid black', width: '25%', textAlign: 'center' }}>{expiredCount}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>


            <Grid container spacing={2} style={{padding:'10px 40px', marginTop:'20px'}}>
                {/* First Table (40% Width) */}
                <Grid item xs={12} sm={5} md={5} sx={{ margin: '0px' }}>
                    <Typography variant="h4" gutterBottom align="center">
                        User Table
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ border: '1px solid black' }}>
                        <TableHead sx={{ backgroundColor: 'rgb(0, 176, 240)', border: '1px solid black' }}>
                            <TableRow >
                                <TableCell sx={{ border: '1px solid black', fontSize: '16px' }}><b>S.No</b></TableCell>
                                <TableCell sx={{ border: '1px solid black', fontSize: '16px' }}><b>User Name</b></TableCell>
                                <TableCell sx={{ border: '1px solid black', fontSize: '16px' }}><b>Email ID</b></TableCell>
                                <TableCell sx={{ border: '1px solid black', fontSize: '16px' }}><b>WhatsApp Number</b></TableCell>
                                <TableCell sx={{ border: '1px solid black', fontSize: '16px' }}><b>TradingView ID</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {subscriptions && subscriptions?.length > 0 ? (
                                subscriptions?.map((sub, index) => (
                                    <>
                                        <TableRow key={index} sx={{ border: '1px solid black' }}>
                                            <TableCell sx={{ border: '1px solid black' }} width="6%">{index + 1}</TableCell>
                                            <TableCell sx={{ border: '1px solid black' }} width="18%">{sub.userDetails.name}</TableCell>
                                            <TableCell sx={{ border: '1px solid black' }} width="24%">
                                                <a href={''} style={{ textDecoration: 'underline' }}>{sub.userDetails.email}</a>
                                            </TableCell>
                                            <TableCell sx={{ border: '1px solid black' }} width="18%">{sub.userDetails.whatsAppNumber}</TableCell>
                                            <TableCell sx={{ border: '1px solid black' }} width="14%">{sub.userDetails.tradingViewID}</TableCell>

                                        </TableRow>
                                    </>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        {subscriptions === null ? 'Loading...' : 'No subscriptions available'}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Second Table (60% Width) */}
                <Grid item xs={12} sm={7} md={7} sx={{ margin: '0px' }}>
                    <Typography variant="h4" gutterBottom align="center">
                        Subscription Tracker Table
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ border: '1px solid black' }}>
                        <TableHead sx={{ backgroundColor: 'rgb(0, 176, 240)', border: '1px solid black' }}>
                            <TableRow >
                                <TableCell sx={{ border: '1px solid black', fontSize: '20px' }}><b>S.No</b></TableCell>
                                <TableCell sx={{ border: '1px solid black', fontSize: '20px' }}><b>Trading ViewID</b></TableCell>
                                <TableCell sx={{ border: '1px solid black', fontSize: '20px' }}><b>StartDate</b></TableCell>
                                <TableCell sx={{ border: '1px solid black', fontSize: '20px' }}><b>EndDate</b></TableCell>
                                <TableCell sx={{ border: '1px solid black', fontSize: '20px' }}><b>Plan</b></TableCell>
                                <TableCell sx={{ border: '1px solid black', fontSize: '20px' }}><b>Payment Mode</b></TableCell>
                                <TableCell sx={{ border: '1px solid black', fontSize: '20px' }}><b>Subscription Status</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subscriptions?.map((sub, index) => (
                                <TableRow key={index} onClick={() => handleSubRowClick(sub)} sx={{ cursor: 'pointer' }} >
                                    <TableCell sx={{ border: '1px solid black' }}>{index + 1}</TableCell>
                                    <TableCell sx={{ border: '1px solid black' }}>{sub.userDetails.tradingViewID}</TableCell>
                                    <TableCell sx={{ border: '1px solid black' }}>{new Date(sub.startDate).toLocaleDateString()}</TableCell>
                                    <TableCell sx={{ border: '1px solid black' }}>{format(parseISO(sub.endDate), 'dd-MM-yyyy')}</TableCell>
                                    <TableCell sx={{ border: '1px solid black' }}>{sub.plan}</TableCell>
                                    <TableCell sx={{ border: '1px solid black' }}>{sub.paymentMode}</TableCell>
                                    <TableCell sx={{ border: '1px solid black' }}>{sub.isExpired ? 'Expired' : 'Active'}</TableCell>
                                </TableRow>

                            ))
                            }
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <AutoDismissAlert type={isError ? "error" : "success"} message={message} open={showMessage} onClose={handleClose}></AutoDismissAlert>

            {/* Modal for Editing Subscription */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Edit Subscription</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        name="name"
                        label="Name"
                        value={selectedSubscription?.userDetails?.name || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        name="tradingViewId"
                        label="TradingView ID"
                        value={selectedSubscription?.userDetails?.tradingViewID || ''}
                        onChange={handleInputChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Plan</InputLabel>
                        <Select
                            name="plan"
                            value={selectedSubscription?.plan || ''}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="Free Trial">Free Trial</MenuItem>
                            <MenuItem value="1 Month">1 Month</MenuItem>
                            <MenuItem value="6 Months">6 Months</MenuItem>
                            <MenuItem value="1 Year">12 Months</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        margin="dense"
                        name="startDate"
                        label="Start Date"
                        type="date"
                        value={selectedSubscription?.startDate
                            ? new Date(selectedSubscription.startDate).toISOString().split('T')[0] : ''}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        name="endDate"
                        label="End Date"
                        type="date"
                        value={selectedSubscription?.endDate
                            ? new Date(selectedSubscription.endDate).toISOString().split('T')[0] : ''}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        name="paymentAmount"
                        label="Payment Amount (USD/INR)"
                        type="number"
                        value={selectedSubscription?.paymentAmount || ''}
                        onChange={handleInputChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Access Status</InputLabel>
                        <Select
                            name="accessStatus"
                            value={selectedSubscription?.accessStatus || ''}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="Granted">Granted</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Payment Mode</InputLabel>
                        <Select
                            name="paymentMode"
                            value={selectedSubscription?.paymentMode || ''}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="G-Pay">G-Pay</MenuItem>
                            <MenuItem value="Bank-Transfer">Bank Transfer</MenuItem>
                            <MenuItem value="Online-Purchase">Online Purchase</MenuItem>
                            <MenuItem value="Crypto-Transfer">Crypto Transfer</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveChanges} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AdminPanel;
