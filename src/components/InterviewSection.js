import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import ENDPOINTS from '../assests/Endpoints';
import CustomInterviewCard from './custom/CustomInterviewCard';

export const InterviewSection = () => {
  const [interviews, setInterviews] = useState([]);
  const token = useSelector((state) => state.auth.token); // Adjust according to your Redux setup

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get(`${ENDPOINTS.FECTH_ALL_INTERVIEW_SCHEDULED}?page=0&size=50`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.scheduleResponseDTO) {
          setInterviews(response.data.scheduleResponseDTO);
        }
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };

    fetchInterviews();
  }, [token]);

  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Interview Schedule
      </Typography>
      <Grid container spacing={3}>
        {interviews.map((interview) => (
          <Grid item xs={12} sm={6} md={3} key={interview.interviewId}>
            <CustomInterviewCard interview={interview} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default InterviewSection;
