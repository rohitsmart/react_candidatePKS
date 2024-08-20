import React, { useState } from 'react';
import {
    Box, Typography, TextField, Button, Grid, MenuItem,
    FormControl, InputLabel, Select, FormHelperText, Paper,
    Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, TableContainer, TablePagination
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
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

    const [filters, setFilters] = useState({
        date: '',
        status: ''
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleEdit = (event) => {
  
    };

    const handleDelete = (event) => {
     
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredCandidates = candidates.filter(candidate => {
        if (filters.date && candidate.date !== filters.date) return false;
        if (filters.status && candidate.status !== filters.status) return false;
        return true;
    });

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

            <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" gutterBottom>
                        View Candidates
                    </Typography>
                    <Grid item>
                        <TextField
                            label="Filter by Date"
                            name="date"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={filters.date}
                            onChange={handleFilterChange}
                        />
                        <FormControl variant="outlined" sx={{ marginLeft: 2 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                label="Status"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {statuses.map(status => (
                                    <MenuItem key={status} value={status}>{status}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <IconButton aria-label="filter" sx={{ marginLeft: 2 }}>
                            <FilterListIcon />
                        </IconButton>
                    </Grid>
                </Grid>

                <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Candidate ID</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Candidate Type</TableCell>
                                <TableCell>Referral Employee</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCandidates
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((candidate, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{candidate.candidateId}</TableCell>
                                        <TableCell>{candidate.firstName}</TableCell>
                                        <TableCell>{candidate.lastName}</TableCell>
                                        <TableCell>{candidate.email}</TableCell>
                                        <TableCell>{candidate.phone}</TableCell>
                                        <TableCell>{candidate.status}</TableCell>
                                        <TableCell>{candidate.candidateType}</TableCell>
                                        <TableCell>
                                            {employees.find(emp => emp.id === candidate.referralEmployeeId)?.name || 'N/A'}
                                        </TableCell>
                                        <TableCell> {/* New Action cell */}
                                            <IconButton aria-label="edit" onClick={() => handleEdit(candidate)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={() => handleDelete(candidate)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component="div"
                    count={filteredCandidates.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[10, 25, 50]}
                />
            </Paper>
        </Box>
    );
};

export default CandidateSection;
