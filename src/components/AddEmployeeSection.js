import React, { useContext, useState } from 'react';
import { Typography, TextField, MenuItem, Select, InputLabel, FormControl, Grid, Box } from '@mui/material';
import axios from 'axios';
import ENDPOINTS from '../assests/Endpoints';
import LoadingButton from './custom/LoadingButton';
import { SnackbarContext } from '../App';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const designations = [
    { value: 'BACKEND_DEV', label: 'Back-end Developer' },
    { value: 'FULLSTACK_DEV', label: 'Fullstack Developer' },
    { value: 'FRONTEND_DEV', label: 'Front-end Developer' },
    { value: 'JUNIOR_HR', label: 'Junior HR' },
    { value: 'SENIOR_HR', label: 'Senior HR' },
    { value: 'MANAGER', label: 'Manager' },
    { value: 'HR', label: 'HR' },
    { value: 'JUNIOR_MANAGER', label: 'Junior Manager' },
    { value: 'CEO', label: 'Chief Executive Officer' },
    { value: 'SOFTWARE_ENGINEER', label: 'Software Engineer' },
    { value: 'NATIVE_DEV', label: 'Native Developer' },
    { value: 'FLUTTER_DEV', label: 'Flutter Developer' },
];


const roles = [
    { value: 'Employee', label: 'Employee' },
];

const AddEmployeeSection = ({ refreshEmployees }) => {
    const [isLoading, setIsLoading] = useState(false);
    const showSnackbar = useContext(SnackbarContext);

    const [formData, setFormData] = useState({
        email: '',
        userRole: 'ADMIN',
        empId: '',
        firstName: '',
        lastName: '',
        designation: 'BACKEND_DEV',
        joiningDate: dayjs(),
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (newValue) => {
        setFormData({ ...formData, joiningDate: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
            const joiningDate = new Date(formData.joiningDate);
            if (isNaN(joiningDate.getTime())) {
            console.error('Invalid date format');
            showSnackbar('Invalid date format', 'error');
            setIsLoading(false);
            return;
        }
            const formattedDate = joiningDate.toLocaleDateString('en-GB');
    
        const requestData = {
            userRequest: {
                email: formData.email,
                userRole: formData.userRole,
            },
            empId: formData.empId,
            firstName: formData.firstName,
            lastName: formData.lastName,
            designation: formData.designation,
            joiningDate: formattedDate,
        };
    
        try {
            const response = await axios.post(ENDPOINTS.ADD_EMPLOYEE, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log('Employee saved successfully:', response.data);
            showSnackbar('Employee saved successfully:', 'success');
            refreshEmployees();
    
        } catch (error) {
            console.error('Error saving employee:', error);
            showSnackbar('Error saving employee:', 'error');
        } finally {
            setIsLoading(false);
        }
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
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel>User Role</InputLabel>
                            <Select
                                name="userRole"
                                value={formData.userRole}
                                onChange={handleChange}
                                label="User Role"
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
                            name="firstName"
                            label="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            variant="outlined"
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
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel>Designation</InputLabel>
                            <Select
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                label="Designation"
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
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="empId"
                            label="Employee ID"
                            value={formData.empId}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DatePicker
                            label="Joining Date"
                            value={formData.joiningDate}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                            sx={{ mt: 2 }}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                    <LoadingButton type="submit" isLoading={isLoading}>
                        Save
                    </LoadingButton>
                </Box>
            </form>
        </Box>
    );
};

export default AddEmployeeSection;
