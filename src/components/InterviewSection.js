import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import ENDPOINTS from '../assests/Endpoints';
import CustomInterviewCard from './custom/CustomInterviewCard';
import InterviewModal from './custom/InterviewModal';

export const InterviewSection = () => {
  const [interviews, setInterviews] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = async (interview) => {
    try {
      const response = await axios.get(`${ENDPOINTS.FETCH_CANDIDATE_DATA}?candidateID=${interview.candidateId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setSelectedInterview(response.data);
      setOpenModal(true);
    } catch (error) {
      console.error('Error fetching candidate data:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedInterview(null);
  };

  const handleSubmit = () => {
    console.log('Submitted:', selectedInterview); // Debugging
    handleCloseModal();
  };

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
            <CustomInterviewCard
              interview={interview}
              onClick={handleOpenModal}
            />
          </Grid>
        ))}
      </Grid>
      {selectedInterview && (
        <InterviewModal
          open={openModal}
          onClose={handleCloseModal}
          data={selectedInterview}
          onSubmit={handleSubmit}
          />
      )}
    </>
  );
};

export default InterviewSection;
