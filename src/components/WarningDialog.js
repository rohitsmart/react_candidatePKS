import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const WarningDialog = ({ open, onClose, onConfirm }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>{"Warning"}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                This candidate is already scheduled. Are you sure you want to reschedule?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                Cancel
            </Button>
            <Button onClick={onConfirm} color="secondary" autoFocus>
                Proceed
            </Button>
        </DialogActions>
    </Dialog>
);

export default WarningDialog;
