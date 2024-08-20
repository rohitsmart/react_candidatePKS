import React, { useState } from 'react';
import { Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, InputLabel, FormControl, Grid, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const designations = [
    { value: 'BACKEND_DEV', label: 'Back-end Developer' },
    { value: 'FULLSTACK_DEV', label: 'Fullstack Developer' },
    { value: 'FRONTEND_DEV', label: 'Front-end Developer' },
];

const roles = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'EMPLOYEE', label: 'Employee' },
];

export const AddEmployeeSection = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        userRole: 'ADMIN',
        empId: '',
        firstName: '',
        lastName: '',
        designation: 'BACKEND_DEV',
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your API call here
        console.log(formData);
        handleClose();
    };

    return (
        <Box sx={{ mb: 2, position: 'relative' }}>
            <Typography variant="h4" gutterBottom>
                Employee Section
            </Typography>
            <IconButton color="primary" onClick={handleClickOpen} sx={{ position: 'absolute', top: 16, right: 16 }}>
                <AddIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Add Employee</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="email"
                                    label="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>User Role</InputLabel>
                                    <Select
                                        name="userRole"
                                        value={formData.userRole}
                                        onChange={handleChange}
                                        required
                                    >
                                        {roles.map((role) => (
                                            <MenuItem key={role.value} value={role.value}>
                                                {role.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="empId"
                                    label="Employee ID"
                                    value={formData.empId}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="firstName"
                                    label="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="lastName"
                                    label="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Designation</InputLabel>
                                    <Select
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleChange}
                                        required
                                    >
                                        {designations.map((designation) => (
                                            <MenuItem key={designation.value} value={designation.value}>
                                                {designation.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
};
