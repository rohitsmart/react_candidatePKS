import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import ENDPOINTS from '../assests/Endpoints';
import CustomInterviewCard from './custom/CustomInterviewCard';
import InterviewModal from './custom/InterviewModal';
import { SnackbarContext } from '../App';

export const InterviewSection = () => {
  const showSnackbar = useContext(SnackbarContext);

  const [interviews, setInterviews] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = async (interview) => {
    // const interviewData = interview.interviewStatus;
    // if (interviewData === 'SCHEDULED') 
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


  const handleSubmit = async (formData) => {
    const transformedData = {
        candidateId: formData.candidateId,
        dsaRating: parseInt(formData.dsaRating, 10) || 0,
        reactRating: parseInt(formData.reactRating, 10) || 0,
        javascriptRating: parseInt(formData.javascriptRating, 10) || 0,
        oopsRating: parseInt(formData.oopsRating, 10) || 0,
        sqlRating: parseInt(formData.sqlRating, 10) || 0,
        javaRating: parseInt(formData.javaRating, 10) || 0,
        phpRating: parseInt(formData.phpRating, 10) || 0,
        pythonRating: parseInt(formData.pythonRating, 10) || 0,
        htmlRating: parseInt(formData.htmlRating, 10) || 0,
        cssRating: parseInt(formData.cssRating, 10) || 0,
        bootstrapRating: parseInt(formData.bootstrapRating, 10) || 0,
        materialUiRating: parseInt(formData.materialUiRating, 10) || 0,
        tailwindCssRating: parseInt(formData.tailwindCssRating, 10) || 0,
        flutterRating: parseInt(formData.flutterRating, 10) || 0,
        reactNativeRating: parseInt(formData.reactNativeRating, 10) || 0,
        machineLearning: parseInt(formData.machineLearning, 10) || 0,
        interviewId: formData.interviewId,
        interviewStatus: formData.interviewStatus,
        feedback: formData.feedback
    };

    try {
        await axios.post(ENDPOINTS.COMPLETE_INTERVIEW, transformedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        showSnackbar('Interview completed successfully', 'success');
        handleCloseModal();
    } catch (error) {
        console.error('Error completing interview:', error);
        showSnackbar('Error completing interview', 'error');
    }
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
        showSnackbar('Candidates fetched successfully:', 'success');

          setInterviews(response.data.scheduleResponseDTO);
        }
      } catch (error) {
        console.error('Error fetching interviews:', error);
        showSnackbar('Error fetching interviews:', 'error');

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
