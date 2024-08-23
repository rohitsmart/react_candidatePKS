import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ENDPOINTS from '../assests/Endpoints';
import { Typography } from '@mui/material';
import CustomInterviewCard from './custom/CustomInterviewCard';
import { useSelector } from 'react-redux';

export const InterviewSection = () => {
  const [interviews, setInterviews] = useState([]);
  const token = useSelector((state) => state.auth.token);


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
  }, []);

  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Interview Schedule
      </Typography>
      {interviews.map((interview) => (
        <CustomInterviewCard key={interview.interviewId} interview={interview} />
      ))}
    </>
  );
};

export default InterviewSection;
