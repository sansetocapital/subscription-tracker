import React, { useEffect, useState } from 'react';
import {Snackbar, Alert} from '@mui/material';

const AutoDismissAlert = ({ type, message, open, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let timer;
        if (open) {
            timer = setTimeout(() => {
                onClose();  
            }, 4000);
        }

        return () => clearTimeout(timer);  
    }, [open, onClose]);


    return (
          <Snackbar open={open} autoHideDuration={4000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} sx={{marginTop:'50px'}} >
            <Alert onClose={onClose} severity={type} size="sm">
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AutoDismissAlert;