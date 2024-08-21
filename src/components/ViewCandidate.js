import React, { useState } from 'react';
import {
     Typography, TextField, Grid, MenuItem,
    FormControl, InputLabel, Select, Paper,
    Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, TableContainer, TablePagination
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const candidateTypes = ['Front-end', 'Back-end', 'Mobile', 'Full Stack'];
const statuses = ['APPLIED', 'INTERVIEWED', 'SELECTED', 'REJECTED', 'QUALIFYFORNEXTROUND'];
const employees = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Emily Johnson' }
];
export const ViewCandidate=()=>{

    const [candidates, setCandidates] = useState([]);

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

    return(
        <>            <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
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
    </Paper></>
    )
}