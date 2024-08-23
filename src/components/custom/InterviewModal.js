import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  Box,
} from '@mui/material';

const InterviewModal = ({ open, onClose, data, onSubmit }) => {
  const {
    candidateId,
    firstName,
    lastName,
    email,
    phone,
    highSchoolPassOut,
    intermediatePassOut,
    bachelorDegree,
    bachelorPassOut,
    masterDegree,
    masterPassOut,
    candidateType,
    district,
    state,
    address,
    dsaRating,
    reactRating,
    javascriptRating,
    oopsRating,
    sqlRating,
    javaRating,
    phpRating,
    pythonRating,
    htmlRating,
    cssRating,
    bootstrapRating,
    materialUiRating,
    tailwindCssRating,
    flutterRating,
    reactNativeRating,
    machineLearning,
    interviewId,
    interviewerName,
    interviewDate,
    interviewStatus,
    feedback
  } = data;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Interview Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Candidate Information */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Candidate Information
              </Typography>
              <Divider />
              <Typography variant="body1"><strong>Full Name:</strong> {firstName} {lastName}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {email}</Typography>
              <Typography variant="body1"><strong>Phone:</strong> {phone}</Typography>
              <Typography variant="body1"><strong>Candidate ID:</strong> {candidateId}</Typography>
              <Typography variant="body1"><strong>Type:</strong> {candidateType}</Typography>
              <Typography variant="body1"><strong>Address:</strong> {address}, {district}, {state}</Typography>
              <Typography variant="body1"><strong>High School Pass Out:</strong> {highSchoolPassOut}</Typography>
              <Typography variant="body1"><strong>Intermediate Pass Out:</strong> {intermediatePassOut}</Typography>
              <Typography variant="body1"><strong>Bachelor Degree:</strong> {bachelorDegree} (Graduated: {bachelorPassOut})</Typography>
              <Typography variant="body1"><strong>Master Degree:</strong> {masterDegree} (Graduated: {masterPassOut})</Typography>
            </Paper>
          </Grid>

          {/* Ratings & Skills */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Ratings & Skills
              </Typography>
              <Divider />
              <Box sx={{ display: 'grid', gap: 1 }}>
                <Typography variant="body1"><strong>DSA:</strong> {dsaRating}</Typography>
                <Typography variant="body1"><strong>React:</strong> {reactRating}</Typography>
                <Typography variant="body1"><strong>JavaScript:</strong> {javascriptRating}</Typography>
                <Typography variant="body1"><strong>OOPs:</strong> {oopsRating}</Typography>
                <Typography variant="body1"><strong>SQL:</strong> {sqlRating}</Typography>
                <Typography variant="body1"><strong>Java:</strong> {javaRating}</Typography>
                <Typography variant="body1"><strong>PHP:</strong> {phpRating}</Typography>
                <Typography variant="body1"><strong>Python:</strong> {pythonRating}</Typography>
                <Typography variant="body1"><strong>HTML:</strong> {htmlRating}</Typography>
                <Typography variant="body1"><strong>CSS:</strong> {cssRating}</Typography>
                <Typography variant="body1"><strong>Bootstrap:</strong> {bootstrapRating}</Typography>
                <Typography variant="body1"><strong>Material UI:</strong> {materialUiRating}</Typography>
                <Typography variant="body1"><strong>Tailwind CSS:</strong> {tailwindCssRating}</Typography>
                <Typography variant="body1"><strong>Flutter:</strong> {flutterRating}</Typography>
                <Typography variant="body1"><strong>React Native:</strong> {reactNativeRating}</Typography>
                <Typography variant="body1"><strong>Machine Learning:</strong> {machineLearning}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Interview Information */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Interview Information
              </Typography>
              <Divider />
              <Typography variant="body1"><strong>Interview ID:</strong> {interviewId}</Typography>
              <Typography variant="body1"><strong>Interviewer:</strong> {interviewerName}</Typography>
              <Typography variant="body1"><strong>Interview Date:</strong> {interviewDate}</Typography>
              <Typography variant="body1"><strong>Status:</strong> {interviewStatus}</Typography>
              <Typography variant="body1"><strong>Feedback:</strong> {feedback || 'No feedback provided'}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InterviewModal;
