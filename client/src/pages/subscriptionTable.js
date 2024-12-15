import { React, useEffect, useState } from "react"
import {
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
    IconButton,

} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Axios } from "../constant";
import Admin from "../components/admin";
import { format, parseISO } from 'date-fns';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AutoDismissAlert from "../components/AutoDismissAlert";

const SubscriptionTable = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState(null);
    const [subscriptions, setSubscriptions] = useState(null);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [convertedAmount, setConvertedAmount] = useState('');

    const currencyRates = {
        USD: 74.0,
        INR: 0.013
    };
    useEffect(() => {
        getAllSubscription();
    }, [])

    const getAllSubscription = () => {
        Axios.get('/api/admin/getAllSubscription').then(res => {
            return setSubscriptions(res.data);

        });
    }

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
        console.log(value * 2, 'value')
        setAmount(value)
        if (currency === "USD") {
            setConvertedAmount((value * currencyRates.USD).toFixed(2));
        } else {
            setConvertedAmount((value * currencyRates.INR).toFixed(2));
        }
        setSelectedSubscription((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCurrencyChange = (e) => {
        const newCurrency = e.target.value;
        setCurrency(newCurrency);
        setAmount()
        console.log(newCurrency * 2)

        if (newCurrency === 'USD') {
            setConvertedAmount((amount / currencyRates.USD).toFixed(2));
        } else {
            setConvertedAmount((amount * currencyRates.INR).toFixed(2));
        }
    }

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

    const handleClose = () => {
        setShowMessage(false);
    };
    return (
        <>
            <Admin prop='subscriptions'>
                <Grid item xs={12} sm={9} md={9} sx={{ margin: '50px' }}>
                    
                    <TableContainer component={Paper}>
                        <Table sx={{ border: '1px solid black' }}>
                            <TableHead sx={{ backgroundColor: 'rgb(0, 176, 240)', border: '1px solid black' }}>
                                <TableRow >
                                    <TableCell sx={{ border: '1px solid black', fontSize: '20px', textAlign:'center' }}><b>S.No</b></TableCell>
                                    <TableCell sx={{ border: '1px solid black', fontSize: '20px', textAlign:'center' }}><b>Trading View ID</b></TableCell>
                                    <TableCell sx={{ border: '1px solid black', fontSize: '20px', textAlign:'center' }}><b>StartDate</b></TableCell>
                                    <TableCell sx={{ border: '1px solid black', fontSize: '20px', textAlign:'center' }}><b>EndDate</b></TableCell>
                                    <TableCell sx={{ border: '1px solid black', fontSize: '20px', textAlign:'center' }}><b>Plan</b></TableCell>
                                    <TableCell sx={{ border: '1px solid black', fontSize: '20px', textAlign:'center' }}><b>Payment Mode</b></TableCell>
                                    <TableCell sx={{ border: '1px solid black', fontSize: '20px', textAlign:'center' }}><b>Subscription Status</b></TableCell>
                                    <TableCell sx={{ border: '1px solid black', fontSize: '20px', textAlign:'center' }}><b>Comments</b></TableCell>
                                    <TableCell sx={{ border: '1px solid black', fontSize: '20px', textAlign:'center' }}><b>Edit</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {subscriptions?.map((sub, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ border: '1px solid black', textAlign:'center', fontSize: '20px' }}>{index + 1}</TableCell>
                                        <TableCell sx={{ border: '1px solid black', textAlign:'center', fontSize: '20px' }}>{sub.userDetails.tradingViewID}</TableCell>
                                        <TableCell sx={{ border: '1px solid black', textAlign:'center', fontSize: '20px' }}>{new Date(sub.startDate).toLocaleDateString()}</TableCell>
                                        <TableCell sx={{ border: '1px solid black', textAlign:'center', fontSize: '20px' }}>{format(parseISO(sub.endDate), 'dd-MM-yyyy')}</TableCell>
                                        <TableCell sx={{ border: '1px solid black', textAlign:'center', fontSize: '20px' }}>{sub.plan}</TableCell>
                                        <TableCell sx={{ border: '1px solid black', textAlign:'center', fontSize: '20px' }}>{sub.paymentMode}</TableCell>
                                        <TableCell sx={{ border: '1px solid black', textAlign:'center', fontSize: '20px' }}>{sub.isExpired ? 'Expired' : 'Active'}</TableCell>
                                        <TableCell sx={{ border: '1px solid black', textAlign:'center', fontSize: '20px' }}></TableCell>
                                        <TableCell sx={{ border: '1px solid black', textAlign:'center', fontSize: '20px' }}>
                                            <IconButton aria-label='edit' onClick={() => handleSubRowClick(sub)}>
                                                <EditNoteIcon color='primary' />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>

                                ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Admin>

            <AutoDismissAlert type={isError ? "error" : "success"} message={message} open={showMessage} onClose={handleClose}></AutoDismissAlert>

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
                            style={{ marginTop: '15px' }}
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
                        value={amount || ''}
                        onChange={handleInputChange}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={3} md={3} sx={{ marginTop: '10px' }}>
                            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                                <InputLabel>Currency</InputLabel>
                                <Select
                                    value={currency}
                                    onChange={handleCurrencyChange}
                                    label="Currency"
                                >
                                    <MenuItem value="USD">USD</MenuItem>
                                    <MenuItem value="INR">INR</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={9} md={9} sx={{ marginTop: '20px' }}>
                            <Typography variant="h6">
                                Converted Amount: <b>{convertedAmount}</b> {currency === 'USD' ? '₹' : '$'}
                            </Typography>
                        </Grid>
                    </Grid>

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Access Status</InputLabel>
                        <Select
                            name="accessStatus"
                            value={selectedSubscription?.accessStatus || ''}
                            onChange={handleInputChange}
                            style={{ marginTop: '15px' }}
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
                            style={{ marginTop: '15px' }}
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
    )
}

export default SubscriptionTable;