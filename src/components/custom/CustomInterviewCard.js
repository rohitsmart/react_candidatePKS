import React, { useState } from 'react';
import { Card, CardContent, Typography, Chip, Box, Slide } from '@mui/material';

const CustomInterviewCard = ({ interview, onClick }) => {
  const { 
    interviewId, 
    candidateId, 
    candidateName, 
    candidateType, 
    applicationDate, 
    interviewDate, 
    interviewStatus, 
    employeeName, 
    remarks 
  } = interview;

  const [hover, setHover] = useState(false);

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
    <Card 
      sx={{ 
        boxShadow: 3, 
        padding: 2, 
        position: 'relative', 
        overflow: 'hidden', 
        transition: 'transform 0.3s ease-in-out',
        ':hover': {
          transform: 'scale(1.02)',
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onClick(interview)}
    >
      <CardContent>
        <Typography variant="h6" component="div">
          {candidateName} ({candidateType})
        </Typography>
        <Typography variant="body2">
          Candidate Id: {candidateId}
        </Typography>
        <Typography color="textSecondary">
          Application Date: {applicationDate}
        </Typography>
        <Typography color="textSecondary">
          Interview Date: {interviewDate}
        </Typography>
        <Typography variant="body1">
          Interviewer: {employeeName}
        </Typography>
        <Typography variant="body1">
          Remark: {remarks}
        </Typography>
        <Chip
          label={interviewStatus}
          color={getStatusChipColor(interviewStatus)}
          sx={{ marginTop: 1, fontSize: '1rem', fontWeight: 'bold' }}
        />
      </CardContent>
      
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          right: hover ? 0 : '-100%',
          width: '35%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          textAlign: 'left',
          transition: 'right 0.5s ease',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Additional Info
        </Typography>
        <Typography variant="body2" gutterBottom>
          Candidate Type: {candidateType}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Interview ID: {interviewId}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Status: {interviewStatus}
        </Typography>
        {/* Add more fields as needed */}
      </Box>
    </Card>
  );
};

export default CustomInterviewCard;
