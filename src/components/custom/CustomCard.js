import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { styled, keyframes } from '@mui/system';

// Animation for the label
const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

// Styled components for labels
const StatusLabel = styled('div')(({ scheduled }) => ({
  color: scheduled ? 'green' : 'red',
  fontWeight: 'bold',
  animation: `${blink} 1.5s infinite ease-in-out`,
}));

const CustomCard = ({ candidate, handleScheduleClick }) => {
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
          Email: {candidate.email}
        </Typography>
        <Typography variant="body2">
          Phone: {candidate.phone}
        </Typography>
        <Typography variant="body2">
          Status: {candidate.status}
        </Typography>

        {/* Displaying the scheduling status with animated label */}
        <Box sx={{ mt: 2, mb: 2 }}>
          <StatusLabel scheduled={candidate.scheduled}>
            {candidate.scheduled ? 'Scheduled' : 'Not Scheduled'}
          </StatusLabel>
        </Box>

        {/* Display appropriate button based on the scheduling status */}
        <Button 
          variant="contained" 
          sx={{ mt: 2 }} 
          onClick={() => handleScheduleClick(candidate)}
        >
          {candidate.scheduled ? 'Update Schedule' : 'Create Schedule'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
