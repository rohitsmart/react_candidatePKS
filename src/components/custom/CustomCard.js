import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const CustomCard = ({ candidate, handleEditClick }) => {
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
        <Button 
          variant="contained" 
          sx={{ mt: 2 }} 
          onClick={() => handleEditClick(candidate)}
        >
          Edit
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
