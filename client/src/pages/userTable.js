import { React, useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    TableContainer,

} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Axios } from "../constant";
import Admin from "../components/admin";


const UserTable = () => {
    const [userData, setUserData] = useState(null);

    const getAllUserData = async () => {
        let res = await Axios.get('/api/admin/getAllUsers');
        console.log(res.data)
        return setUserData(res.data);
    }

    useEffect(() => {
        getAllUserData();
    }, []);

    return (
        <>
            <Admin prop='users'>
                <Grid item xs={12} sm={8} md={8} sx={{ margin: '50px' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ border: '1px solid black'}}>
                            <TableHead sx={{ backgroundColor: 'rgb(0, 176, 240)', border: '1px solid black' }}>
                                <TableRow>
                                    <TableCell sx={{ border: '1px solid black', fontSize: '20px', textAlign:'center' }}><b>S.No</b></TableCell>
                                    <TableCell sx={{ border: '1px solid black', fontSize: '20px', textAlign:'center'  }}><b>User Name</b></TableCell>
                                    <TableCell sx={{ border: '1px solid black', fontSize: '20px', textAlign:'center'  }}><b>Email ID</b></TableCell>
                                    <TableCell sx={{ border: '1px solid black', fontSize: '20px', textAlign:'center'  }}><b>WhatsApp Number</b></TableCell>
                                    <TableCell sx={{ border: '1px solid black', fontSize: '20px', textAlign:'center'  }}><b>TradingView ID</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {userData && userData?.length > 0 ? (
                                    userData?.map((user, index) => (
                                        <>
                                            <TableRow key={index} sx={{ border: '1px solid black' }}>
                                                <TableCell sx={{ border: '1px solid black', textAlign:'center', fontSize: '20px'  }} width="2%">{index + 1}</TableCell>
                                                <TableCell sx={{ border: '1px solid black', textAlign:'center', fontSize: '20px'  }} width="20%">{user.name}</TableCell>
                                                <TableCell sx={{ border: '1px solid black', textAlign:'center', fontSize: '20px'  }} width="33%">
                                                    <a href={''} style={{ textDecoration: 'underline', fontSize: '20px' }}>{user.email}</a>
                                                </TableCell>
                                                <TableCell sx={{ border: '1px solid black', textAlign:'center', fontSize: '20px'  }} width="25%">{user.whatsAppNumber}</TableCell>
                                                <TableCell sx={{ border: '1px solid black', textAlign:'center', fontSize: '20px'  }} width="17%">{user.tradingViewID}</TableCell>

                                            </TableRow>
                                        </>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center">
                                            {userData === null ? 'Loading...' : 'No subscriptions available'}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Admin>
        </>
    )
}

export default UserTable;