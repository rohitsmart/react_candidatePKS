import React from 'react';
import { Card, CardContent, Typography, Grid, CardActionArea, Box, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScheduleHeaderAndForm } from './ScheduleHeaderAndForm';

const candidates = [
    {
        id: 1,
        candidateId: 'C001',
        firstName: 'John',
        lastName: 'Doe',
        candidateType: 'Front-end',
        status: 'APPLIED',
        applicationDate: '2024-08-19T10:30:00',
    },
    {
        id: 2,
        candidateId: 'C002',
        firstName: 'Jane',
        lastName: 'Smith',
        candidateType: 'Fullstack',
        status: 'INTERVIEWED',
        applicationDate: '2024-08-19T11:00:00',
    },
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
    const navigate = useNavigate();

    const handleCardClick = (candidateId) => {
        navigate(`/candidate/${candidateId}`);
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
                        <ScheduleHeaderAndForm />

            <Grid container spacing={3}>
                {candidates.map((candidate) => (
                    <Grid item xs={12} sm={6} md={4} key={candidate.candidateId}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <CardActionArea onClick={() => handleCardClick(candidate.candidateId)}>
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
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
