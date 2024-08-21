import React, { useState } from 'react';
import {
    Box, Typography, TextField, Button, Grid, MenuItem, Paper,
    CircularProgress,
    Autocomplete
} from '@mui/material';

import { useEffect } from 'react';
import { ViewCandidate } from './ViewCandidate';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import axios from 'axios';
import ENDPOINTS from '../assests/Endpoints';

const candidateTypes = ['Front-end', 'Back-end', 'Mobile', 'Full Stack'];
const statuses = ['APPLIED', 'INTERVIEWED', 'SELECTED', 'REJECTED', 'QUALIFYFORNEXTROUND'];

const CandidateSection = () => {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [candidate, setCandidate] = useState({
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
        referralEmployeeId: 0,
        dob: dayjs(),
        address: '',
        city: '',
        state: ''
    });

    useEffect(() => {
        document.title = 'Candidate';
    }, []);

    useEffect(() => {
        if (searchQuery) {
            fetchEmployees(searchQuery);
        } else {
            setEmployees([]); // Clear employees if search query is empty
        }
    }, [searchQuery]);

    const fetchEmployees = async (query) => {
        setLoading(true);
        try {
            const response = await axios.get(`${ENDPOINTS.SEARCH_EMPLOYEES}?search=${query}`);
            setEmployees(response.data.employeeData || []);
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        if (e && e.target) {
            const { name, value } = e.target;
            setCandidate((prevState) => ({
                ...prevState,
                [name]: value
            }));
        } else if (dayjs.isDayjs(e)) {
            setCandidate((prevState) => ({
                ...prevState,
                dob: e,
            }));
        }
    };

    const handleEmployeeSelect = (event, value) => {
        if (value) {
            setCandidate((prevState) => ({
                ...prevState,
                referralEmployeeId: value.empId
            }));
            setSearchQuery(value.fullName); // Set the search query to the selected employee's name
        } else {
            setCandidate((prevState) => ({
                ...prevState,
                referralEmployeeId: 0
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedDate = candidate.dob ? candidate.dob.format('YYYY-MM-DD') : '';

        const candidateData = {
            ...candidate,
            dob: formattedDate
        };

        console.log('Form submitted:', candidateData);

        setCandidate({
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
            referralEmployeeId: 0,
            dob: dayjs(),
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
                                value={candidate.firstName}
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
                                value={candidate.lastName}
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
                                value={candidate.email}
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
                                value={candidate.phone}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DatePicker
                                label="Date Of Birth"
                                value={candidate.joiningDate}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                                sx={{ mt: 2 }}
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
                                value={candidate.highSchoolPassOut}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Intermediate Pass Out Year"
                                name="intermediatePassOut"
                                value={candidate.intermediatePassOut}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Bachelor Degree"
                                name="bachelorDegree"
                                value={candidate.bachelorDegree}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Bachelor Pass Out Year"
                                name="bachelorPassOut"
                                value={candidate.bachelorPassOut}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Master Degree"
                                name="masterDegree"
                                value={candidate.masterDegree}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Master Pass Out Year"
                                name="masterPassOut"
                                value={candidate.masterPassOut}
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
                                value={candidate.city}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="State"
                                name="state"
                                value={candidate.state}
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
                                value={candidate.address}
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
                                value={candidate.status}
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
                                value={candidate.candidateType}
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
                                value={candidate.cvUrl}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                <Autocomplete
                    freeSolo
                    options={employees}
                    getOptionLabel={(option) => `${option.empId} - ${option.fullName}`}
                    loading={loading}
                    onInputChange={(event, newValue) => {
                        setSearchQuery(newValue);
                    }}
                    onChange={handleEmployeeSelect}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Referral Employee"
                            variant="outlined"
                            helperText="Referred by"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={24} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                )
                            }}
                        />
                    )}
                    renderOption={(props, option) => (
                        <li {...props}>
                            {`${option.empId} - ${option.fullName}`}
                        </li>
                    )}
                />
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
            <ViewCandidate />
        </Box>
    );
};

export default CandidateSection;
