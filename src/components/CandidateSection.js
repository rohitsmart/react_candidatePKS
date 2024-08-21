import React, { useState } from 'react';
import {
    Box, Typography, TextField, Button, Grid, MenuItem, Paper} from '@mui/material';

import { useEffect } from 'react';
import { ViewCandidate } from './ViewCandidate';
const employees = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Emily Johnson' }
];

const candidateTypes = ['Front-end', 'Back-end', 'Mobile', 'Full Stack'];
const statuses = ['APPLIED', 'INTERVIEWED', 'SELECTED', 'REJECTED', 'QUALIFYFORNEXTROUND'];

const CandidateSection = () => {
    useEffect(() => {
        document.title = 'Candidate';
    }, []);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        status: '',
        highSchoolPassOut: '',
        intermediatePassOut: '',
        bachelorPassOut: '',
        masterPassOut: '',
        cvUrl: '',
        candidateType: '',
        referralEmployeeId: '',
        dob: '',
        address: '',
        city: '',
        state: ''
    });
    const [candidates, setCandidates] = useState([]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setCandidates([...candidates, { candidateId: candidates.length + 1, ...formData }]);
        console.log('Form submitted:', formData);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            status: '',
            highSchoolPassOut: '',
            intermediatePassOut: '',
            bachelorPassOut: '',
            masterPassOut: '',
            cvUrl: '',
            candidateType: '',
            referralEmployeeId: '',
            dob: '',
            address: '',
            city: '',
            state: ''
        });
    };
    return (
        <Box sx={{ flexGrow: 1, padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Candidate Management
            </Typography>
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Add New Candidate
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h6" gutterBottom>
                        Basic Details
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>

                    <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
                        Qualification Details
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="High School Pass Out Year"
                                name="highSchoolPassOut"
                                value={formData.highSchoolPassOut}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Intermediate Pass Out Year"
                                name="intermediatePassOut"
                                value={formData.intermediatePassOut}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Bachelor Degree"
                                name="bachelorDegree"
                                value={formData.bachelorDegree}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Bachelor Pass Out Year"
                                name="bachelorPassOut"
                                value={formData.bachelorPassOut}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Master Degree"
                                name="masterDegree"
                                value={formData.masterDegree}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Master Pass Out Year"
                                name="masterPassOut"
                                value={formData.masterPassOut}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>

                    <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
                        Address Details
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="State"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                multiline
                                rows={4}
                                value={formData.address}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>

                    <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
                        Referral Details
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                label="Status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                SelectProps={{
                                    native: false,
                                }}
                                helperText="Candidate status"
                            >
                                {statuses.map(status => (
                                    <MenuItem key={status} value={status}>{status}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                label="Candidate Type"
                                name="candidateType"
                                value={formData.candidateType}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                SelectProps={{
                                    native: false,
                                }}
                                helperText="Type of candidate"
                            >
                                {candidateTypes.map(type => (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="CV URL"
                                name="cvUrl"
                                value={formData.cvUrl}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                label="Referral Employee"
                                name="referralEmployeeId"
                                value={formData.referralEmployeeId}
                                onChange={handleChange}
                                variant="outlined"
                                SelectProps={{
                                    native: false,
                                }}
                                helperText="Referred by"
                            >
                                {employees.map(emp => (
                                    <MenuItem key={emp.id} value={emp.id}>{emp.name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 3 }}
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
            <ViewCandidate/>
        </Box>
    );
};

export default CandidateSection;
