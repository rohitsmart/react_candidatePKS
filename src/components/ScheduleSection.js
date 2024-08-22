import React, { useState } from 'react';
import {
    Card, CardContent, Typography, Grid, CardActionArea, Box, Chip,
    Modal, Backdrop, Fade, TextField, Button, List, ListItem, ListItemText, Select, MenuItem,
    Autocomplete,
    CircularProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import WarningDialog from './WarningDialog';
import { useEffect } from 'react';
import axios from 'axios';
import ENDPOINTS from '../assests/Endpoints';

export const ScheduleSection = ({ onScheduleConfirmed }) => {
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        date: '',
        status: ''
    });
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [candidates, setCandidates] = useState([]);
    const [totalCandidates, setTotalCandidates] = useState(0);
    const [open, setOpen] = useState(false);
    const [warningOpen, setWarningOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [interviewDate, setInterviewDate] = useState(dayjs());
    const [employerSearch, setEmployerSearch] = useState('');
    const [filteredEmployers, setFilteredEmployers] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');

    const theme = useTheme();

    useEffect(() => {
        document.title = 'Schedule';
        if (searchQuery) {
            fetchEmployees(searchQuery);
        } else {
            setEmployees([]);
        }
        fetchCandidates();
    }, [filters, page, rowsPerPage, searchQuery]);

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

    const handleEmployeeSelect = (event, value) => {
        if (value) {

            setSearchQuery(value.fullName);
        } else {
        }
    };

    const fetchCandidates = async () => {
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
        }
    };

    const handleCardClick = (candidate) => {
        if (candidate.schedule) {
            setSelectedCandidate(candidate);
            setWarningOpen(true);
        } else {
            setSelectedCandidate(candidate);
            setOpen(true);
        }
    };

    const handleWarningClose = () => {
        setWarningOpen(false);
        setSelectedCandidate(null);
    };

    const handleWarningConfirm = () => {
        setWarningOpen(false);
        if (selectedCandidate) {
            onScheduleConfirmed(selectedCandidate.candidateId);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCandidate(null);
        setEmployerSearch('');
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
                    <MenuItem value="APPLICATION_RECEIVED">Application Received</MenuItem>
                    <MenuItem value="INTERVIEW_SCHEDULED">Interview Scheduled</MenuItem>
                    <MenuItem value="INTERVIEW_COMPLETED">Interview Completed</MenuItem>
                    <MenuItem value="OFFER_EXTENDED">Offer Extended</MenuItem>
                    <MenuItem value="OFFER_ACCEPTED">Offer Accepted</MenuItem>
                    <MenuItem value="OFFER_REJECTED">Offer Rejected</MenuItem>
                    <MenuItem value="REJECTED">Rejected</MenuItem>
                    <MenuItem value="QUALIFIED_FOR_NEXT_ROUND">Qualified for Next Round</MenuItem>
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
                                        boxShadow: theme.shadows[5],
                                        borderRadius: 2,
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.03)',
                                            boxShadow: theme.shadows[8],
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {candidate.firstName} {candidate.lastName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ID: {candidate.candidateId}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Type: {candidate.candidateType}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Date: {new Date(candidate.applicationDate).toLocaleDateString()}
                                        </Typography>
                                        <Chip
                                            label={candidate.status}
                                            sx={{
                                                backgroundColor: getStatusColor(candidate.status),
                                                color: 'white',
                                                marginTop: 2,
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                marginTop: 2,
                                                height: '60px',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    right: 0,
                                                    padding: 1,
                                                }}
                                            >
                                                {candidate.status === 'INTERVIEW_SCHEDULED' ? (
                                                    <Typography
                                                        variant="body2"
                                                        color="primary"
                                                        sx={{ fontWeight: 'bold' }}
                                                    >
                                                        Scheduled
                                                    </Typography>
                                                ) : (
                                                    <motion.div
                                                        animate={{ opacity: [0, 1, 0] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    >
                                                        <Typography
                                                            variant="body2"
                                                            color="error"
                                                            sx={{ fontWeight: 'bold' }}
                                                        >
                                                            Not Scheduled
                                                        </Typography>
                                                    </motion.div>
                                                )}
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            <WarningDialog
                open={warningOpen}
                onClose={handleWarningClose}
                onConfirm={handleWarningConfirm}
            />

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
                            sx={{ mt: 2, width: '100%' }}
                        />
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
                        <Box sx={{ mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    handleClose();
                                }}
                            >
                                Confirm
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleClose}
                                sx={{ ml: 2 }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case 'APPLICATION_RECEIVED':
            return 'blue';
        case 'INTERVIEW_SCHEDULED':
            return 'orange';
        case 'INTERVIEW_COMPLETED':
            return 'green';
        case 'OFFER_EXTENDED':
            return 'purple';
        case 'OFFER_ACCEPTED':
            return 'teal';
        case 'OFFER_REJECTED':
            return 'red';
        case 'REJECTED':
            return 'grey';
        case 'QUALIFIED_FOR_NEXT_ROUND':
            return 'yellow';
        default:
            return 'default';
    }
};

