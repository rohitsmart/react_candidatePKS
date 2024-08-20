import React, { useState } from 'react';
import { Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl, Grid, Box } from '@mui/material';

const designations = [
    { value: 'BACKEND_DEV', label: 'Back-end Developer' },
    { value: 'FULLSTACK_DEV', label: 'Fullstack Developer' },
    { value: 'FRONTEND_DEV', label: 'Front-end Developer' },
];

const roles = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'EMPLOYEE', label: 'Employee' },
];

const AddEmployeeSection = () => {
    const [formData, setFormData] = useState({
        email: '',
        userRole: 'ADMIN',
        empId: '',
        firstName: '',
        lastName: '',
        designation: 'BACKEND_DEV',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <Box sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
            <Typography variant="h5" gutterBottom>
                Add Employee
            </Typography>
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
                <Box sx={{ mt: 2 }}>
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default AddEmployeeSection;
