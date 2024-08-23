import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Grid, Container } from '@mui/material';
import CustomCard from './custom/CustomCard';
import CustomModal from './custom/CustomModal';
import ENDPOINTS from '../assests/Endpoints';
import { SnackbarContext } from '../App';
import { CubicalLoader } from './custom/CubicalLoader';
import { useNavigate } from 'react-router-dom';

export const ScheduleSection = ({ onCandidateMatch }) => {
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const showSnackbar = useContext(SnackbarContext);
    const [loading, setLoading] = useState(true);
    const loginUserEmpId = useSelector((state) => state.auth.user.empId);
    const token = useSelector((state) => state.auth.token);
    const handleScheduleClick = (candidate) => {
        setSelectedCandidate(candidate);
        if (candidate.scheduled) {
            console.log("Interviewer Name:", candidate.interviewerName);
            const candidateInterviewerId = candidate.interviewerName ? candidate.interviewerName.split(' ')[0] : '';
            console.log("Interviewer Id:", candidateInterviewerId);
            if (candidateInterviewerId === loginUserEmpId) {
                console.log("same id ")
                if (onCandidateMatch) {
                    onCandidateMatch(candidate.candidateId);
                }
            }


        } else {
            console.log("Candidate is not scheduled for an interview.");
        } setOpenModal(true);
    };


    const handleModalClose = () => {
        setOpenModal(false);
        setSelectedCandidate(null);
    };

    const handleScheduleSubmit = (formData) => {
        console.log("Scheduling for candidate:", formData);
    };

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get(ENDPOINTS.FETCH_ALL_CANDIDATES, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                showSnackbar('Candidates fetched successfully:', 'success');
                setCandidates(response.data.candidates);
            } catch (error) {
                showSnackbar('Error fetching candidates:', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchCandidates();
    }, [token]);

    return (
        <Container sx={{ mt: 4 }} maxWidth="xl">
            {loading && <CubicalLoader />}
            <Grid container spacing={3}>
                {candidates.length > 0 ? (
                    candidates.map((candidate) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={candidate.candidateId}>
                            <CustomCard
                                candidate={candidate}
                                handleScheduleClick={handleScheduleClick}
                            />
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <div>No candidates found.</div>
                    </Grid>
                )}
            </Grid>

            {selectedCandidate && (
                <CustomModal
                    open={openModal}
                    handleClose={handleModalClose}
                    candidateData={selectedCandidate}
                    handleSubmit={handleScheduleSubmit}
                />
            )}
        </Container>
    );
};
