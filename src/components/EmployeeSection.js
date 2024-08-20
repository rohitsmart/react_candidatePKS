import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, IconButton, Collapse, Button, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddEmployeeSection from './AddEmployeeSection';
import { useEffect } from 'react';
const employees = [
    { id: 1, name: 'John Doe', email: 'john@example.com', designation: 'Software Engineer', joiningDate: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', designation: 'Product Manager', joiningDate: '2022-09-01' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', designation: 'Designer', joiningDate: '2021-07-18' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', designation: 'Marketing', joiningDate: '2020-11-11' },
];

const EmployeeSection = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openView, setOpenView] = useState(true);
    useEffect(() => {
        document.title = 'Employee';
    }, []);

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
                    <AddEmployeeSection/>
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
                                        <Grid item xs={2}>
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
                                        <Grid item xs={2}>
                                            <Typography variant="h6">Action</Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Box sx={{ overflowY: 'auto', maxHeight: '60vh', width: '100%' }}>
                                {employees.map((employee) => (
                                    <Grid item xs={12} key={employee.id}>
                                        <Paper elevation={1} sx={{ padding: 2 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={1}>
                                                    <Typography>{employee.id}</Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography>{employee.name}</Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography>{employee.email}</Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography>{employee.designation}</Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography>{employee.joiningDate}</Typography>
                                                </Grid>
                                                <Grid item xs={2}>
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
                                ))}
                            </Box>
                        </Grid>
                    </Box>
                </Collapse>
            </Stack>
        </Box>
    );
};

export default EmployeeSection;
