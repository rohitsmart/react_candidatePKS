import React, { useState, useEffect } from 'react';
import {
    Typography, TextField, Grid, MenuItem,
    FormControl, InputLabel, Select, Paper,
    Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, TableContainer, TablePagination, CircularProgress
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import ENDPOINTS from '../assests/Endpoints';

const statuses = ['APPLIED', 'INTERVIEWED', 'SELECTED', 'REJECTED', 'QUALIFYFORNEXTROUND'];

export const ViewCandidate = () => {
    const [candidates, setCandidates] = useState([]);
    const [totalCandidates, setTotalCandidates] = useState(0);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        date: '',
        status: ''
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);

    useEffect(() => {
        fetchCandidates();
    }, [filters, page, rowsPerPage]);

    const fetchCandidates = async () => {
        setLoading(true);
        const params = {
            fromDate: filters.date,
            status: filters.status,
            page: page,
            size: rowsPerPage
        };
        try {
            const response = await axios.get(ENDPOINTS.FETCH_ALL_CANDIDATES, { params });
            const data = response.data;
            setCandidates(data.candidates);
            setTotalCandidates(data.totalCandidates);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEdit = (candidate) => {
        // Implement edit functionality
    };

    const handleDelete = (candidate) => {
        // Implement delete functionality
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
            <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        View Candidates
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} container justifyContent="flex-end" alignItems="center">
                    <TextField
                        label="Filter by Date"
                        name="date"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={filters.date}
                        onChange={handleFilterChange}
                        sx={{ marginRight: 2 }}
                    />
                    <FormControl variant="outlined" sx={{ marginRight: 2, minWidth: 120 }}>
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
                    <IconButton aria-label="filter" sx={{ color: 'primary.main' }}>
                        <FilterListIcon />
                    </IconButton>
                </Grid>
            </Grid>

            {loading ? (
                <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
                    <CircularProgress />
                </Grid>
            ) : (
                <>
                    <TableContainer component={Paper} sx={{ marginTop: 3, border: '1px solid #ddd' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {['Candidate ID', 'First Name', 'Last Name', 'Email', 'Phone','Application Date', 'Candidate Type', 'Referral Employee','Status', 'Actions'].map(header => (
                                        <TableCell key={header} sx={{ fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {candidates.map((candidate, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{candidate.candidateId || 'N/A'}</TableCell>
                                        <TableCell>{candidate.firstName}</TableCell>
                                        <TableCell>{candidate.lastName}</TableCell>
                                        <TableCell>{candidate.email}</TableCell>
                                        <TableCell>{candidate.phone}</TableCell>
                                        <TableCell>{candidate.applicationDate}</TableCell>
                                        <TableCell>{candidate.candidateType}</TableCell>
                                        <TableCell>{candidate.referralEmployee || 'N/A'}</TableCell>
                                        <TableCell>{candidate.status}</TableCell>
                                        <TableCell>
                                            <IconButton aria-label="edit" onClick={() => handleEdit(candidate)} sx={{ color: 'primary.main' }}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={() => handleDelete(candidate)} sx={{ color: 'error.main' }}>
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
                        count={totalCandidates}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 20, 50]}
                        sx={{ marginTop: 2 }}
                    />
                </>
            )}
        </Paper>
    );
};
