import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { styled, keyframes } from '@mui/system';

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const statusStyles = {
    APPLICATION_RECEIVED: { color: 'red', label: 'Not Scheduled', animation: 'none' },
    INTERVIEW_SCHEDULED: { color: 'orange', label: 'Scheduled', animation: 'none' },
    INTERVIEW_COMPLETED: { color: 'blue', label: 'Completed', animation: 'none' },
    OFFER_EXTENDED: { color: 'green', label: 'Offer Extended', animation: 'none' },
    OFFER_ACCEPTED: { color: 'purple', label: 'Offer Accepted', animation: 'none' },
    OFFER_REJECTED: { color: 'darkred', label: 'Offer Rejected', animation: 'none' },
    REJECTED: { color: 'gray', label: 'Rejected', animation: 'none' },
    QUALIFIED_FOR_NEXT_ROUND: { color: 'teal', label: 'Qualified', animation: 'none' }
};

const StatusLabel = styled('div')(({ status }) => ({
    color: statusStyles[status]?.color || 'black',
    fontWeight: 'bold',
    animation: statusStyles[status]?.animation === 'pulse' ? `${blink} 1.5s infinite ease-in-out` : 'none',
}));

const CustomCard = ({ candidate, handleScheduleClick }) => {
    const isButtonDisabled = !(candidate.status === 'INTERVIEW_SCHEDULED' || candidate.status === 'APPLICATION_RECEIVED');

    return (
        <Card sx={{ minWidth: 275, mb: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {candidate.firstName} {candidate.lastName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {candidate.candidateType}
                </Typography>
                <Typography variant="body2">
                    Candidate ID: {candidate.candidateId}
                </Typography>
                <Typography variant="body2">
                    Email: {candidate.email}
                </Typography>
                <Typography variant="body2">
                    Phone: {candidate.phone}
                </Typography>
                <Typography variant="body2">
                    Status: {candidate.status}
                </Typography>
                <Typography variant="body2">
                    Application Date: {candidate.applicationDate || 'N/A'}
                </Typography>
                <Typography variant="body2">
                    Interview Date: {candidate.interviewDate || 'N/A'}
                </Typography>

                <Box sx={{ mt: 2, mb: 2 }}>
                    <StatusLabel status={candidate.status}>
                        {statusStyles[candidate.status]?.label || 'Unknown Status'}
                    </StatusLabel>
                </Box>
                <Button 
                    variant="contained" 
                    sx={{ mt: 2 }} 
                    onClick={() => handleScheduleClick(candidate)}
                    disabled={isButtonDisabled}
                >
                    {candidate.status === 'INTERVIEW_SCHEDULED' || candidate.status === 'APPLICATION_RECEIVED'
                        ? 'Update Schedule'
                        : 'Create Schedule'
                    }
                </Button>
            </CardContent>
        </Card>
    );
};

export default CustomCard;
