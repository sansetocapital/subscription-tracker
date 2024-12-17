import { React, useEffect, useState } from "react"
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    Paper,
    TableContainer,
    CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Axios } from "../constant";
import Layout from "../components/layout";


const Admin = ({ children, prop }) => {
    const [counts, setCounts] = useState(null);


    useEffect(() => {
        getActiveCount();
    }, []);

    const getActiveCount = async () => {
        let res = await Axios.get('/api/admin/getUserCounts');
        return setCounts(res.data);

    }
    return (
        <>
            <Layout role='admin' />
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ alignItems: 'center', justifyContent: 'center', marginTop: '30px' }}>
                    <Grid item sm={10} md={10} xs={10} sx={{ margin: '20px' }}>
                        <Typography variant="h4" gutterBottom align="center">
                            {prop === 'users' ? <b>User Table</b> : <b>Subscription Tracker Table</b>}
                        </Typography>
                    </Grid>
                    <Grid item sm={10} md={8} xs={8} sx={{ textAlign: 'center' }}>
                        {!counts ? <CircularProgress /> :
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableRow >

                                            <TableCell sx={{ textAlign: 'center', fontSize: '24px' }}>Total Subscribers</TableCell>
                                            <TableCell sx={{ textAlign: 'center', fontSize: '30px', color: 'blue', fontWeight: 'bold' }}>{counts?.total || 0 }</TableCell>
                                            <TableCell sx={{ textAlign: 'center', fontSize: '24px' }}>Active Subsribers</TableCell>
                                            <TableCell sx={{ textAlign: 'center', fontSize: '30px', color: 'green', fontWeight: 'bold' }}>{counts?.active || 0 }</TableCell>
                                            <TableCell sx={{ textAlign: 'center', fontSize: '24px' }}>Expired Subsribers</TableCell>
                                            <TableCell sx={{ textAlign: 'center', fontSize: '30px', color: 'red', fontWeight: 'bold' }}>{counts?.expired || 0}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }

                    </Grid>
                    {children}
                </Grid>


            </Box>
        </>
    )
};

export default Admin;