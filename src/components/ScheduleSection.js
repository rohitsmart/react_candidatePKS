import React, { useState } from 'react';
import {
    Card, CardContent, Typography, Grid, CardActionArea, Box, Chip,
    Modal, Backdrop, Fade, TextField, Button, List, ListItem, ListItemText, Select, MenuItem
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const candidates = [
    {
        id: 1,
        candidateId: 'C001',
        firstName: 'John',
        lastName: 'Doe',
        candidateType: 'Front-end',
        status: 'APPLIED',
        applicationDate: '2024-08-19T10:30:00',
        schedule: true,
    },
    {
        id: 2,
        candidateId: 'C002',
        firstName: 'Jane',
        lastName: 'Smith',
        candidateType: 'Fullstack',
        status: 'INTERVIEWED',
        applicationDate: '2024-08-19T11:00:00',
        schedule: false,
    },
    // Add more candidates as needed
];

const employers = [
    { id: 'E001', name: 'Company A' },
    { id: 'E002', name: 'Company B' },
    { id: 'E003', name: 'Company C' },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'APPLIED':
            return 'blue';
        case 'INTERVIEWED':
            return 'orange';
        case 'SELECTED':
            return 'green';
        case 'REJECTED':
            return 'red';
        case 'QUALIFYFORNEXTROUND':
            return 'purple';
        default:
            return 'gray';
    }
};

export const ScheduleSection = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [interviewDate, setInterviewDate] = useState(dayjs());
    const [employerSearch, setEmployerSearch] = useState('');
    const [filteredEmployers, setFilteredEmployers] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');

    const handleCardClick = (candidate) => {
        setSelectedCandidate(candidate);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCandidate(null);
        setEmployerSearch('');
        setFilteredEmployers([]);
    };

    const handleEmployerSearch = (event) => {
        const searchTerm = event.target.value;
        setEmployerSearch(searchTerm);

        if (searchTerm.length > 0) {
            const filtered = employers.filter((employer) =>
                employer.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredEmployers(filtered);
        } else {
            setFilteredEmployers([]);
        }
    };

    const handleEmployerSelect = (employer) => {
        setEmployerSearch(employer.name);
        setFilteredEmployers([]);
    };

    const handleStatusChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const handleClearFilter = () => {
        setStatusFilter('');
    };

    const filteredCandidates = statusFilter
        ? candidates.filter((candidate) => candidate.status === statusFilter)
        : candidates;

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Scheduler
            </Typography>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Select
                    value={statusFilter}
                    onChange={handleStatusChange}
                    displayEmpty
                    sx={{ width: 200 }}
                >
                    <MenuItem value="">All Statuses</MenuItem>
                    <MenuItem value="APPLIED">Applied</MenuItem>
                    <MenuItem value="INTERVIEWED">Interviewed</MenuItem>
                    <MenuItem value="SELECTED">Selected</MenuItem>
                    <MenuItem value="REJECTED">Rejected</MenuItem>
                    <MenuItem value="QUALIFYFORNEXTROUND">Qualify for Next Round</MenuItem>
                </Select>
                <Button onClick={handleClearFilter} variant="outlined">
                    Clear All
                </Button>
            </Box>

            <Grid container spacing={3}>
                {filteredCandidates.map((candidate) => (
                    <Grid item xs={12} sm={6} md={4} key={candidate.candidateId}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <CardActionArea onClick={() => handleCardClick(candidate)}>
                                <Card
                                    sx={{
                                        backgroundColor: theme.palette.background.paper,
                                        boxShadow: theme.shadows[3],
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {candidate.firstName} {candidate.lastName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            ID: {candidate.candidateId}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Type: {candidate.candidateType}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Date: {new Date(candidate.applicationDate).toLocaleString()}
                                        </Typography>
                                        <Chip
                                            label={candidate.status}
                                            sx={{
                                                backgroundColor: getStatusColor(candidate.status),
                                                color: 'white',
                                                marginTop: theme.spacing(2),
                                            }}
                                        />
                                        {candidate.schedule ? (
                                            <div
                                                style={{
                                                    marginTop: theme.spacing(2),
                                                    color: 'blue',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.875rem',
                                                }}
                                            >
                                                Scheduled
                                            </div>
                                        ) : (
                                            <motion.div
                                                animate={{ opacity: [0, 1, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                style={{
                                                    marginTop: theme.spacing(2),
                                                    color: 'red',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.875rem',
                                                }}
                                            >
                                                Not Scheduled
                                            </motion.div>
                                        )}
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: { xs: '90%', sm: 400 },
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Schedule Interview for {selectedCandidate?.firstName} {selectedCandidate?.lastName}
                        </Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Candidate ID"
                            value={selectedCandidate?.candidateId}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ mt: 2 }}
                        />
                        <DatePicker
                            label="Interview Date"
                            value={interviewDate}
                            onChange={(newValue) => setInterviewDate(newValue)}
                            fullWidth
                            sx={{ mt: 2, width: '-webkit-fill-available' }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Employer"
                            placeholder="Enter employer's name"
                            value={employerSearch}
                            onChange={handleEmployerSearch}
                            sx={{ mt: 2 }}
                        />
                        {filteredEmployers.length > 0 && (
                            <List
                                sx={{
                                    maxHeight: 150,
                                    overflow: 'auto',
                                    border: '1px solid #ccc',
                                    borderRadius: 1,
                                    mt: 1,
                                }}
                            >
                                {filteredEmployers.map((employer) => (
                                    <ListItem
                                        button
                                        key={employer.id}
                                        onClick={() => handleEmployerSelect(employer)}
                                    >
                                        <ListItemText primary={`${employer.name} (${employer.id})`} />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleClose}
                        >
                            Schedule
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};
