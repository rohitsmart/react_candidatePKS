import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Grid, Container } from '@mui/material';
import CustomCard from './custom/CustomCard';
import ENDPOINTS from '../assests/Endpoints';
import { SnackbarContext } from '../App';
import { CubicalLoader } from './custom/CubicalLoader';

export const ScheduleSection = () => {
    const [candidates, setCandidates] = useState([]);
    const showSnackbar = useContext(SnackbarContext);
    const token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(true);

    const handleScheduleClick = (candidate) => {
        if (candidate.scheduled) {
            console.log("Update schedule for:", candidate);
        } else {
            console.log("Create schedule for:", candidate);
        }
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
        </Container>
    );
};
