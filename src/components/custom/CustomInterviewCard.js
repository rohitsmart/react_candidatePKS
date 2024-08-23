import React from 'react';
import { Card, CardContent, Typography, Grid, Chip } from '@mui/material';

const CustomInterviewCard = ({ interview }) => {
  const { interviewId, candidateName, candidateType, applicationDate, interviewDate, interviewStatus, employeeName } = interview;

  const getStatusChipColor = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return 'primary';
      case 'COMPLETED':
        return 'success';
      case 'CANCELLED':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ marginBottom: 2, boxShadow: 3 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="div">
              {candidateName} ({candidateType})
            </Typography>
            <Typography color="textSecondary">
              Application Date: {applicationDate}
            </Typography>
            <Typography color="textSecondary">
              Interview Date: {interviewDate}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} container direction="column" alignItems="flex-end">
            <Typography variant="body1">
              Interviewer: {employeeName}
            </Typography>
            <Chip
              label={interviewStatus}
              color={getStatusChipColor(interviewStatus)}
              sx={{ marginTop: 1, fontSize: '1rem', fontWeight: 'bold' }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CustomInterviewCard;
