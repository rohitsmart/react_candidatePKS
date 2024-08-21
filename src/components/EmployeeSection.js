import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Paper, IconButton, Collapse, Button, Stack, Pagination } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddEmployeeSection from './AddEmployeeSection';
import ENDPOINTS from '../assests/Endpoints';

const EmployeeSection = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openView, setOpenView] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEmployees = async (page = 0) => {
            setLoading(true);
            try {
                const response = await axios.get(`${ENDPOINTS.GET_EMPLOYEES}?page=${page}&size=50`);
                setEmployees(response.data.content);
                setTotalPages(response.data.totalPages);
                setCurrentPage(response.data.number);
            } catch (error) {
                console.error('Error fetching employees:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [currentPage]);

    const handlePageChange = (event, page) => {
        setCurrentPage(page - 1);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Stack spacing={2}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => setOpenAdd(!openAdd)}
                    sx={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}
                >
                    <Typography variant="button">Add Employee</Typography>
                    <IconButton
                        size="small"
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                        onClick={() => setOpenAdd(!openAdd)}
                    >
                        {openAdd ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Button>
                <Collapse in={openAdd}>
                    <AddEmployeeSection />
                </Collapse>

                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => setOpenView(!openView)}
                    sx={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}
                >
                    <Typography variant="button">View Employee List</Typography>
                    <IconButton
                        size="small"
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                        onClick={() => setOpenView(!openView)}
                    >
                        {openView ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Button>
                <Collapse in={openView}>
                    <Box sx={{ overflowX: 'auto' }}>
                        <Grid container spacing={2} sx={{ minWidth: 700 }}>
                            <Grid item xs={12}>
                                <Paper elevation={3} sx={{ padding: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={1}>
                                            <Typography variant="h6">ID</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="h6">Name</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="h6">Email</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">Designation</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">Joining Date</Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Typography variant="h6">Action</Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Box sx={{ overflowY: 'auto', maxHeight: '60vh', width: '100%' }}>
                                {loading ? (
                                    <Typography>Loading...</Typography>
                                ) : (
                                    employees.map((employee) => (
                                        <Grid item xs={12} key={employee.empId}>
                                            <Paper elevation={1} sx={{ padding: 2 }}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={1}>
                                                        <Typography>{employee.empId}</Typography>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Typography>{employee.name}</Typography>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Typography>{employee.email}</Typography>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Typography>{employee.designation}</Typography>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Typography>{employee.joiningDate || 'N/A'}</Typography>
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <IconButton color="primary">
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton color="secondary">
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    ))
                                )}
                            </Box>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <Pagination
                                count={totalPages}
                                page={currentPage + 1}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Box>
                    </Box>
                </Collapse>
            </Stack>
        </Box>
    );
};

export default EmployeeSection;
